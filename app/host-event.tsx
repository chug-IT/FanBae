import { router } from "expo-router";
import { Bottom, LogoBanner, PrimaryButton, Screen, SelectableIcon, Table, TextInput } from "../components";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function HostEvent() {
  function onHostEventPress() {
    router.push('/map')
  }

  return (
    <Screen>
      <LogoBanner />
      <ScrollView>
        <Bottom>
          <Text style={styles.header}>Host Event</Text>
          <View style={styles.formContainer}>
            <TextInput placeholder='Event Name' />
            <TextInput placeholder='Description' />
            <TextInput placeholder='Location' />
            <TextInput placeholder='Date' />
          </View>
          <Text style={styles.header}>Choose Amenities</Text>
          <Table Component={SelectableIcon} columns={3} componentProps={[{ key: 1 }, { key: 2 }, { key: 3 }, { key: 4 }, { key: 5 }, { key: 6 }]} />
          <PrimaryButton text='Host Event' onPress={onHostEventPress} />
        </Bottom>
      </ScrollView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    gap: 27,
    marginTop: 55,
    marginBottom: 30,
    paddingHorizontal: 55,
    width: '100%',
  },
  header: {
    fontSize: 30,
    marginTop: 15,
    textAlign: 'center',
  }
})