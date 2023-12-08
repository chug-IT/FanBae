import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';

import { WatchParty, getEvents } from '../../api';
import Filter from '../../assets/filter.png';
import Menu from '../../assets/menu.png';
import { PrimaryButton, TextInput } from '../../components';
import { FilterMenu, LeftMenu } from '../../compositions/map';
import { useUserContext } from '../../hooks';

export default function Map() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [overlay, setOverlay] = useState('');
  const [watchParties, setWatchParties] = useState<WatchParty[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentWatchPartyIndex, setCurrentWatchPartyIndex] = useState(0);

  const { user } = useUserContext();

  useEffect(() => {
    async function initialize() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      console.log(status);
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      const newLocation = await Location.getCurrentPositionAsync();
      setLocation(newLocation);
    }

    initialize();
  }, []);

  function onOutsidePress() {
    setOverlay('');
  }

  function onLeftMenuPress() {
    setOverlay('left menu');
  }

  function onFilterMenuPress() {
    setOverlay('filter menu');
  }

  const getWatchParties = async () => {
    if (!location) {
      throw new Error('Location not found');
    } else if (!user) {
      throw new Error('User not found');
    }
    const { latitude, longitude } = location.coords;
    setLoading(true);
    const { error, watchParties: newWatchParties } = await getEvents(
      latitude,
      longitude,
      user.authToken
    );
    setLoading(false);
    if (error !== undefined) {
      alert(error);
      return;
    }
    setWatchParties(newWatchParties);
  };

  const onMatchMePressed = async () => {
    if (watchParties.length > 0) {
      setOverlay('event');
      return;
    }
    getWatchParties();
    setOverlay('event');
  };

  const currentWatchParty = watchParties[currentWatchPartyIndex];

  if (errorMsg) {
    return <Text>{errorMsg}</Text>;
  }

  if (!location) {
    return <ActivityIndicator size='large' />;
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={onOutsidePress} style={styles.outsidePress}>
        <MapView
          style={styles.map}
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </Pressable>
      <Pressable style={[styles.menuToggle, { left: 12 }]} onPress={onLeftMenuPress}>
        <Image source={Menu} style={styles.icon} />
      </Pressable>
      <Pressable style={[styles.menuToggle, { right: 12 }]} onPress={onFilterMenuPress}>
        <Image source={Filter} style={styles.icon} />
      </Pressable>
      <View style={styles.searchContainer}>
        <TextInput placeholder='Search' />
      </View>
      <View style={styles.matchMe}>
        {overlay === 'event' && watchParties.length > 0 ? (
          <View style={styles.eventWrapper}>
            <Pressable
              style={[styles.symbolWrapper, { opacity: Number(currentWatchPartyIndex > 0) }]}
              onPress={() => setCurrentWatchPartyIndex(currentWatchPartyIndex - 1)}
            >
              <Text>{'<'}</Text>
            </Pressable>
            <View style={styles.currentEvent}>
              <Text style={{ fontSize: 30 }}>{currentWatchParty.name}</Text>
              <Text>{new Date(currentWatchParty.startDateTime).toLocaleDateString()}</Text>
              <Text>Host is providing:</Text>
              {currentWatchParty.amenities.map((amenity) => (
                <Text key={amenity}>{amenity}</Text>
              ))}
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  gap: 10,
                  marginTop: 15,
                }}
              >
                <PrimaryButton text='Join' fontSize={16} disabled={loading} />
                <PrimaryButton
                  text='Refresh'
                  fontSize={16}
                  onPress={getWatchParties}
                  disabled={loading}
                />
              </View>
            </View>
            <Pressable
              style={[
                styles.symbolWrapper,
                { opacity: Number(currentWatchPartyIndex < watchParties.length - 1) },
              ]}
              onPress={() => setCurrentWatchPartyIndex(currentWatchPartyIndex + 1)}
            >
              <Text>{'>'}</Text>
            </Pressable>
          </View>
        ) : (
          <PrimaryButton
            text={loading ? 'Matching...' : 'Match Me'}
            onPress={onMatchMePressed}
            disabled={loading}
          />
        )}
      </View>
      {overlay === 'left menu' && <LeftMenu />}
      {overlay === 'filter menu' && <FilterMenu />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  menuToggle: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 40,
    position: 'absolute',
    width: 40,
    top: 12,
  },
  icon: {
    height: '100%',
    width: '100%',
  },
  searchContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 75,
    marginTop: 35,
  },
  outsidePress: {
    height: '100%',
    width: '100%',
  },
  matchMe: {
    bottom: 35,
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
  },
  currentEvent: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginHorizontal: 10,
    paddingVertical: 35,
    paddingHorizontal: 15,
  },
  eventWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  symbolWrapper: {
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
