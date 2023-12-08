import { StyleSheet, View } from 'react-native';
import { PrimaryButton } from '../../components';
import { router } from 'expo-router';

export default function LeftMenu() {
  function onHostEventPress() {
    router.push('/host-event');
  }

  return (
    <View style={styles.container}>
      <PrimaryButton text='Your Tickets' />
      <PrimaryButton text='Preferences' onPress={() => router.push('/choose-interests')} />
      <PrimaryButton text='Host Event' onPress={onHostEventPress} />
      <PrimaryButton text='Settings' />
      <PrimaryButton text='About Us' />
      <PrimaryButton text='Report' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    gap: 20,
    paddingVertical: 95,
    paddingHorizontal: 20,
    position: 'absolute',
  },
});
