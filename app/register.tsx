import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Link, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { register } from '../api';
import { Bottom, DatePicker, LogoBanner, PrimaryButton, Screen, TextInput } from '../components';
import { useUserContext } from '../hooks';

export default function Register() {
  // state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // context
  const { user, signIn: setUser } = useUserContext();

  useEffect(() => {
    if (user) {
      router.push('/map');
    }
  }, [user]);

  // component functions
  const onDateChanged = (event?: DateTimePickerEvent, date?: Date) => {
    setShowDatePicker(false);
    if (!date) return;
    setBirthday(date.valueOf());
  };

  const onRegisterPress = async () => {
    if (!email || !password || !name || !phone || !birthday) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    const { response, error } = await register({
      email,
      password,
      name,
      phone,
      birthday,
    });

    if (error !== undefined) {
      setError(error);
      setLoading(false);
      return;
    }

    setUser({ ...response.user, authToken: response.authToken });
    setLoading(false);
    router.push('/choose-interests');
  };

  return (
    <Screen>
      <LogoBanner />
      <ScrollView>
        <Bottom>
          <Text style={styles.register}>Register</Text>
          <Text style={styles.createAccount}>Create your new account</Text>
          <Text style={{ color: 'red' }}>{error}</Text>
          <View style={styles.formContainer}>
            <TextInput placeholder='Name' onChangeText={setName} autoCapitalize='words' />
            <TextInput placeholder='Email' onChangeText={setEmail} autoCapitalize='none' />
            <TextInput
              placeholder='Password'
              onChangeText={setPassword}
              passwordRules='required: upper; required: lower; required: digit; minlength: 8'
              secureTextEntry
              autoCapitalize='none'
            />
            <TextInput placeholder='Phone' onChangeText={setPhone} />
            <DatePicker
              date={birthday}
              onDateChanged={onDateChanged}
              placeHolder='Birthday'
              setShowDatePicker={setShowDatePicker}
              showDatePicker={showDatePicker}
            />
          </View>
          <PrimaryButton
            text={loading ? 'Registering...' : 'Register'}
            onPress={onRegisterPress}
            disabled={loading}
          />
          <View style={styles.toLogin}>
            <Text>Already have an account? </Text>
            <Link href='/login' style={{ color: '#E06547' }}>
              Login
            </Link>
          </View>
        </Bottom>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  register: {
    fontSize: 30,
    marginTop: 15,
  },
  createAccount: {
    fontSize: 18,
    marginTop: 15,
  },
  formContainer: {
    gap: 27,
    marginTop: 55,
    marginBottom: 30,
    paddingHorizontal: 55,
    width: '100%',
  },
  toLogin: {
    flexDirection: 'row',
    marginBottom: 45,
  },
});
