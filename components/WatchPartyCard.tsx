import { StyleSheet, Text, View } from 'react-native';
import { WatchParty } from '../api';
import PrimaryButton from './PrimaryButton';

export default ({ event }: { event: WatchParty }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{event.name}</Text>
      <Text>Host: {event.hostEmail}</Text>
      <Text>Price: ${event.price}</Text>
      <Text>Start Time: {new Date(event.startDateTime).toLocaleString()}</Text>
      <Text>Amenities:</Text>
      {event.amenities.map((amenity, index) => (
        <Text key={index}>- {amenity}</Text>
      ))}
      <PrimaryButton text='Cancel' />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
