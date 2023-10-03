import { StyleSheet, Text, TextInput, View } from "react-native";
import { Bottom, LogoBanner, PrimaryButton, Screen } from "../components";

export default function chooseYourLocation() { 
  return (
    <Screen>
      <LogoBanner />
      <Bottom>
        <Text style={styles.chooseYourLocation}>Choose Your Location</Text>
        <View style={styles.formContainer}>
          <TextInput placeholder="Enter State" style={styles.region} />
          <TextInput placeholder="Enter City" style={styles.region} />
        </View>
        <PrimaryButton text='Finish'/>
      </Bottom>
    </Screen>
  )
}

const styles = StyleSheet.create({
  chooseYourLocation: {
    fontSize: 30,
    marginTop: 15,
  },
  loginText: {
    fontSize: 18,
    marginTop: 15,
  },
  region: {
    borderColor: '#8B8B8B',
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 12,
    paddingLeft: 45,
    width: '100%',
  },
  formContainer: {
    gap: 27,
    marginTop: 55,
    marginBottom: 30,
    paddingHorizontal: 55,
    width: '100%',
  }
})