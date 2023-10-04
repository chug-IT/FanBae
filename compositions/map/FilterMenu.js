import { Image, StyleSheet, Text, View } from "react-native";
import Slider from '@react-native-community/slider';

import { PrimaryButton } from "../../components";

import Star from '../../assets/star.png'
import { useState } from "react";

export default function Filter() {
  const [distance, setDistance] = useState(1)

  const sports = ['Basketball', 'Football', 'Ice Hockey', 'Boxing', 'MMA (UFC)',
    'Soccer', 'Motorsports', 'Cricket', 'Baseball', 'Tennis', 'Golf']

  return (
    <View style={styles.container}>
      <PrimaryButton text='Filter' />
      <Text style={styles.mainText}>Filter by Sports</Text>
      {sports.map((sport, index) => (
        <Text style={styles.subText} key={index}>{sport}</Text>
      ))}
      <Text style={styles.mainText}>{`Distance: ${distance} miles`}</Text>
      <Slider
        minimumValue={1}
        maximumValue={100}
        onValueChange={setDistance}
        step={1}
      />
      <View style={styles.sort}>
        <Image source={Star} style={styles.star} />
        <Text style={styles.mainText}>Sort by Host Ratings</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    right: 0,
    paddingVertical: 95,
    paddingHorizontal: 20,
    position: 'absolute',
  },
  mainText: {
    fontSize: 20,
    marginVertical: 5,
  },
  subText: {
    fontSize: 16,
    marginVertical: 10,
  },
  sort: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  star: {
    width: 30,
    height: 30,
    marginRight: 10
  }
})