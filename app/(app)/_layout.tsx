import { Slot, router } from 'expo-router';
import { useUserContext } from '../../hooks';
import { Bottom, LogoBanner, PrimaryButton, Screen } from '../../components';
import { ActivityIndicator } from 'react-native';

export default (): JSX.Element => {
  const { user } = useUserContext();

  if (!user) {
    return (
      <Screen>
        <LogoBanner />
        <Bottom>
          <ActivityIndicator size='large' color='#0000ff' />
          <PrimaryButton text='Log In' onPress={() => router.push('/login')} />
        </Bottom>
      </Screen>
    );
  }

  return <Slot />;
};
