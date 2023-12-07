import { StyleSheet, Text, View } from "react-native";
import { Bottom, LogoBanner, PrimaryButton, Screen, SelectableIcon, Table } from "../components";

import { router } from "expo-router";

export default function ChooseInterests() {
  function onNextPress() {
    router.push('/map')
  }

  return (
    <Screen>
      <LogoBanner />
      <Bottom>
        <Text style={styles.chooseInterests}>Choose your sports interests</Text>
        <Table Component={SelectableIcon} componentProps={[{key: 0}, {key: 1}, {key: 2}, {key: 3}, {key: 4}, {key: 5}]} columns={3} />
        <PrimaryButton text='Next' onPress={onNextPress} />
      </Bottom>
    </Screen>
  )
}

const styles = StyleSheet.create({
  chooseInterests: {
    fontSize: 30,
    marginTop: 15,
    textAlign: 'center',
  }
})