import { Slot } from 'expo-router';
import { UserProvider } from '../hooks';

export default () => {
  return (
    <UserProvider>
      <Slot />
    </UserProvider>
  );
};
