import { Image, StyleSheet, Text, View } from "react-native";
import { Bottom, LogoBanner, PrimaryButton, Screen } from "../components";

import GreyGoose from '../assets/greygoose.png'

export default function ChooseInterests() {
  function onExploreMorePressed() {
    router.push('/locationChoice')
  }
  return (
    <Screen>
      <LogoBanner />
      <Bottom>
        <Text style={styles.chooseInterests}>Choose your sports interests</Text>
        <InterestTable />
        <PrimaryButton  onPress={onNextPressed} text='Next' />
      </Bottom>
    </Screen>
  )
}

function InterestTable() {
  // TODO: actually fill in the table
  const rows = []
  for (let i = 0; i < 12; i += 3) {
    const row = [i, i + 1, i + 2]
    rows.push(row)
  }

  return (
    <View style={styles.interestTable}>
      {rows.map(row => (
        <View style={styles.row} key={`Row start: ${row[0]}`}>
          {row.map(i => (
            <InterestIcon key={i}/>
          ))}
        </View>
      ))}
    </View>
  )
}

function InterestIcon() {
  return (
    <View style={styles.iconContainer}>
      <Image source={GreyGoose} style={styles.icon} />
    </View>
  )
}

const styles = StyleSheet.create({
  interestTable: {
    gap: 15,
    margin: 30,
  },  
  iconContainer: {
    borderColor: '$D7525A',
    borderRadius: 10,
    borderStyle: 'dashed',
    borderWidth: 2,
    height: 85,
    width: 85,
  },
  icon: {
    height: '100%',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    gap: 14,
  },
  chooseInterests: {
    fontSize: 30,
    marginTop: 15,
    textAlign: 'center',
  }
})