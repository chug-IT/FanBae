import { StyleSheet, Text, View } from "react-native";
import { Bottom, LogoBanner, PrimaryButton, Screen, TextInput } from "../components";
import { Link } from "expo-router";

export default function Login() { 
  return (
    <Screen>
      <LogoBanner />
      <Bottom>
        <Text style={styles.welcomeBack}>Welcome Back</Text>
        <Text style={styles.loginText}>Login to your account</Text>
        <View style={styles.formContainer}>
          <TextInput placeholder='Email' />
          <TextInput placeholder='Password' />
        </View>
        <PrimaryButton text='Log In' />
        <View style={styles.toRegister}>
          <Text>Don't have an account? </Text>
          <Link href='/register' style={{color: '#E06547'}}>Create Account</Link>
        </View>
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
  formContainer: {
    gap: 27,
    marginTop: 55,
    marginBottom: 30,
    paddingHorizontal: 55,
    width: '100%',
  },
  toRegister: {
    flexDirection: 'row',
    marginBottom: 45
  }
})