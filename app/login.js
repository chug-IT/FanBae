import { StyleSheet, Text, TextInput, View } from "react-native";
import { Bottom, LogoBanner, PrimaryButton, Screen } from "../components";

export default function Login() { 
  return (
    <Screen>
      <LogoBanner />
      <Bottom>
        <Text style={styles.welcomeBack}>Welcome Back</Text>
        <Text style={styles.loginText}>Login to your account</Text>
        <View style={styles.formContainer}>
          <TextInput placeholder="Enter email or phone" style={styles.email} />
          <TextInput placeholder="Enter password" style={styles.email} />
        </View>
        <PrimaryButton text='Log In'/>
      </Bottom>
    </Screen>
  )
}

const styles = StyleSheet.create({
  welcomeBack: {
    fontSize: 30,
    marginTop: 15,
  },
  loginText: {
    fontSize: 18,
    marginTop: 15,
  },
  email: {
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