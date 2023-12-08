import { ActivityIndicator, Text } from 'react-native';
import { Bottom, LogoBanner, Screen } from '../../components';
import { useEffect, useState } from 'react';
import { WatchParty, getEventsHosting } from '../../api';
import { useUserContext } from '../../hooks';
import WatchPartyCard from '../../components/WatchPartyCard';

export default () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [watchParties, setWatchParties] = useState<WatchParty[]>([]);

  const { user } = useUserContext();

  useEffect(() => {
    (async () => {
      if (!user) {
        throw new Error('User not found');
      }
      setLoading(true);
      const { error, watchParties } = await getEventsHosting(user.authToken);
      setLoading(false);
      if (error !== undefined) {
        setError(error);
        return;
      }
      setWatchParties(watchParties);
    })();
  }, []);
  return (
    <Screen>
      <LogoBanner />
      <Bottom>
        <Text>Your Events</Text>
        {loading && <ActivityIndicator size='large' />}
        <Text style={{ color: 'red' }}>{error}</Text>
        {watchParties.map((watchParty, index) => (
          <WatchPartyCard key={index} event={watchParty} />
        ))}
      </Bottom>
    </Screen>
  );
};
