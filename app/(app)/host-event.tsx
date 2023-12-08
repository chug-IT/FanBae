import { router } from 'expo-router';
import {
  Bottom,
  DatePicker,
  LogoBanner,
  PrimaryButton,
  Screen,
  SelectableIcon,
  Table,
  TextInput,
} from '../../components';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { hostEvent, placeAutocomplete } from '../../api';
import { useUserContext } from '../../hooks';

const debounce = (func: (...args: any[]) => any, wait: number) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export default function HostEvent() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [amenities, setAmenities] = useState('');
  const [date, setDate] = useState(0);
  const [time, setTime] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [predictions, setPredictions] = useState<{ description: string; place_id: string }[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useUserContext();

  const onLocationChanged = async (location: string) => {
    const debouncedAutocomplete = debounce(async (location: string) => {
      if (!user) {
        throw new Error('User not logged in');
      }
      const { error, predictions } = await placeAutocomplete(location, user.authToken);
      if (error !== undefined) {
        setError(error);
        return;
      }
      setPredictions(predictions);
    }, 500);

    setLocation(location);
    debouncedAutocomplete(location);
  };

  const onDateChanged = (event?: DateTimePickerEvent, date?: Date) => {
    setShowDatePicker(false);
    if (!date) return;
    setDate(date.valueOf());
  };

  const onTimeChanged = (event?: DateTimePickerEvent, date?: Date) => {
    setShowTimePicker(false);
    if (!date) return;
    setTime(date.valueOf());
  };

  const onHostEventPress = async () => {
    if (!user) {
      throw new Error('User not logged in');
    }

    const startDateTime = new Date(date);
    startDateTime.setHours(new Date(time).getHours());
    startDateTime.setMinutes(new Date(time).getMinutes());
    setLoading(true);
    const error = await hostEvent(
      {
        name,
        amenities: amenities.split(',').map((amenity) => amenity.trim()),
        placeId: location,
        price: 1,
        startDateTime: startDateTime.valueOf(),
      },
      user.authToken
    );
    setLoading(false);

    if (error) {
      setError(error);
      return;
    }

    router.push('/map');
  };

  return (
    <Screen>
      <LogoBanner />
      <ScrollView>
        <Bottom>
          <Text style={styles.header}>Host Event</Text>
          <Text>{error}</Text>
          <View style={styles.formContainer}>
            <TextInput placeholder='Event Name' onChangeText={setName} />
            <TextInput placeholder='Description' onChangeText={setDescription} />
            <View>
              <TextInput placeholder='Location' value={location} onChangeText={onLocationChanged} />
              <View>
                <View style={styles.predictions}>
                  {predictions.map((prediction) => (
                    <Pressable
                      onPress={() => {
                        setLocation(prediction.description);
                        setPredictions([]);
                      }}
                      key={prediction.description}
                      style={styles.prediction}
                    >
                      <Text>{prediction.description}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            </View>
            <TextInput placeholder='Amenities (Foosball table, Bar)' onChangeText={setAmenities} />
            <DatePicker
              date={date}
              placeHolder='Date of Event'
              onDateChanged={onDateChanged}
              setShowDatePicker={setShowDatePicker}
              showDatePicker={showDatePicker}
            />
            <Pressable onPress={() => setShowTimePicker(true)}>
              <TextInput
                placeholder='Time of Event'
                editable={false}
                value={
                  time
                    ? new Date(time).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                      })
                    : ''
                }
              />
            </Pressable>
            {showTimePicker && (
              <DateTimePicker value={new Date()} onChange={onTimeChanged} mode='time' />
            )}
          </View>
          <View style={styles.button}>
            <PrimaryButton
              text={loading ? 'Creating Event...' : 'Host Event'}
              onPress={onHostEventPress}
              disabled={loading}
            />
          </View>
        </Bottom>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    gap: 27,
    marginTop: 55,
    marginBottom: 30,
    paddingHorizontal: 55,
    width: '100%',
  },
  header: {
    fontSize: 30,
    marginTop: 15,
    textAlign: 'center',
  },
  button: {
    margin: 10,
  },
  predictions: {
    backgroundColor: 'white',
    opacity: 1,
    position: 'absolute',
    zIndex: 1,
  },
  prediction: {
    margin: 5,
  },
});
