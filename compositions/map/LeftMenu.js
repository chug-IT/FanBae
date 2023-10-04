import { StyleSheet, View } from "react-native";
import { PrimaryButton } from "../../components";

export default function LeftMenu() { 
  return (
    <View style={styles.container}>
      <PrimaryButton text='Your Tickets' />
      <PrimaryButton text='Preferences' />
      <PrimaryButton text='Host Event' />
      <PrimaryButton text='Settings' />
      <PrimaryButton text='About Us' />
      <PrimaryButton text='Report' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    gap: 20,
    paddingVertical: 95,
    paddingHorizontal: 20,
    position: 'absolute',
  }
})