import MapView from 'react-native-maps';
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

import Menu from '../../assets/menu.png';
import Filter from '../../assets/filter.png';
import { PrimaryButton, TextInput } from '../../components';
import { LeftMenu, FilterMenu } from '../../compositions/map';

export default function Map() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [overlay, setOverlay] = useState('');
  const [showEvent, setShowEvent] = useState(false);

  useEffect(() => {
    async function initialize() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      const newLocation = await Location.getCurrentPositionAsync();
      setLocation(newLocation);
    }

    initialize();
  }, []);

  if (errorMsg) {
    return <Text>{errorMsg}</Text>;
  }

  if (!location) {
    return <ActivityIndicator size='large' />;
  }

  function onOutsidePress() {
    setOverlay('');
  }

  function onLeftMenuPress() {
    setOverlay('left menu');
  }

  function onFilterMenuPress() {
    setOverlay('filter menu');
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
        {showEvent ? (
          <View style={styles.currentEvent}>
            <Text style={{ fontSize: 30 }}>Team1 vs. Team2</Text>
            <Text>Date: Tomorrow, at 3</Text>
            <Text>Host is providing:</Text>
            <Text>Ping Pong Table</Text>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                gap: 10,
                marginTop: 15,
              }}
            >
              <PrimaryButton text='Join' fontSize={16} />
              <PrimaryButton text='Ignore' fontSize={16} onPress={() => setShowEvent(false)} />
            </View>
          </View>
        ) : (
          <PrimaryButton text='Match Me' onPress={() => setShowEvent(true)} />
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
    paddingHorizontal: 35,
    width: '100%',
  },
  currentEvent: {
    backgroundColor: 'white',
    borderRadius: 16,
    paddingVertical: 35,
    paddingHorizontal: 15,
    width: '100%',
  },
});
