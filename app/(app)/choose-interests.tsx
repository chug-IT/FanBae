import { StyleSheet, Text } from 'react-native';
import { Bottom, LogoBanner, PrimaryButton, Screen, SelectableIcon, Table } from '../../components';
import { useEffect, useState } from 'react';

import Baseball from '../../assets/sports/Baseball.png';
import Basketball from '../../assets/sports/Basketball.png';
import Boxing from '../../assets/sports/Boxing.png';
import Cricket from '../../assets/sports/Cricket.png';
import Esports from '../../assets/sports/Esports.png';
import Football from '../../assets/sports/Football.png';
import Golf from '../../assets/sports/Golf.png';
import IceHockey from '../../assets/sports/IceHockey.png';
import Misc from '../../assets/sports/Misc.png';
import Racing from '../../assets/sports/Racing.png';
import Rugby from '../../assets/sports/Rugby.png';
import Tennis from '../../assets/sports/Tennis.png';

import { router } from 'expo-router';
import { chooseInterests } from '../../api/choose-interests';
import { useUserContext } from '../../hooks';

const images = [
  Baseball,
  Basketball,
  Boxing,
  Cricket,
  Esports,
  Football,
  Golf,
  IceHockey,
  Misc,
  Racing,
  Rugby,
  Tennis,
] as const;

const imageNames = [
  'Baseball',
  'Basketball',
  'Boxing',
  'Cricket',
  'Esports',
  'Football',
  'Golf',
  'IceHockey',
  'Misc',
  'Racing',
  'Rugby',
  'Tennis',
] as const;

export default function ChooseInterests() {
  const [sports, setSports] = useState(
    imageNames.reduce((acc, name) => ({ ...acc, [name]: false }), {}) as Record<
      (typeof imageNames)[number],
      boolean
    >
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { user } = useUserContext();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, []);

  const onNextPress = async () => {
    if (!user) {
      throw new Error('User should be defined');
    }
    const selectedSports = imageNames.filter((sport) => sports[sport]);
    setLoading(true);
    const response = await chooseInterests({
      interests: selectedSports,
      authToken: user.authToken,
    });
    setLoading(false);

    if (response) {
      setError(response);
      return;
    }

    router.push('/map');
  };

  const selectableIconProps = images.map((image, index) => ({
    imageSource: image,
    name: imageNames[index],
    onSelectedChanged: (selected: boolean, name: string) => {
      if (selected) {
        setSports({ ...sports, [name]: selected });
      } else {
        setSports({ ...sports, [name]: selected });
      }
    },
  }));

  return (
    <Screen>
      <LogoBanner />
      <Bottom>
        <Text style={styles.chooseInterests}>Choose your sports interests</Text>
        <Text>{error}</Text>
        <Table Component={SelectableIcon} componentProps={selectableIconProps} columns={3} />
        <PrimaryButton
          text={loading ? 'Updating...' : 'Next'}
          onPress={onNextPress}
          disabled={loading}
        />
      </Bottom>
    </Screen>
  );
}

const styles = StyleSheet.create({
  chooseInterests: {
    fontSize: 30,
    marginTop: 15,
    textAlign: 'center',
  },
});
