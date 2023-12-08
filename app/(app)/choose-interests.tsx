import { StyleSheet, Text } from 'react-native';
import { Bottom, LogoBanner, PrimaryButton, Screen, SelectableIcon, Table } from '../../components';
import { useState } from 'react';

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
];

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
];

export default function ChooseInterests() {
  const [sports, setSports] = useState(imageNames.map((name) => ({ [name]: false })));
  function onNextPress() {
    router.push('/map');
  }

  const selectableIconProps = images.map((image, index) => ({
    imageSource: image,
    name: imageNames[index],
    onSelectedChanged: (selected: boolean, name: string) => {
      if (selected) {
        setSports({ ...sports, ...{ [name]: selected } });
      } else {
        setSports({ ...sports, ...{ [name]: selected } });
      }
    },
  }));

  return (
    <Screen>
      <LogoBanner />
      <Bottom>
        <Text style={styles.chooseInterests}>Choose your sports interests</Text>
        <Table Component={SelectableIcon} componentProps={selectableIconProps} columns={3} />
        <PrimaryButton text='Next' onPress={onNextPress} />
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
