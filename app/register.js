import { ScrollView, StyleSheet, Text, View } from "react-native"
import { Bottom, LogoBanner, PrimaryButton, Screen, TextInput } from "../components"
import { Link, router } from "expo-router"

export default function Register() {
  function onRegisterPress() {
    router.push('/choose-interests')
  } 

  return (
    <Screen>
      <LogoBanner />
      <ScrollView>
        <Bottom>
          <Text style={styles.register}>Register</Text>
          <Text style={styles.createAccount}>Create your new account</Text>
          <View style={styles.formContainer}>
            <TextInput placeholder='Email' />
            <TextInput placeholder='Password' />
            <TextInput placeholder='Name' />
            <TextInput placeholder='Phone' />
            <TextInput placeholder='Age' />
          </View>
          <PrimaryButton text='Register' onPress={onRegisterPress}/>
          <View style={styles.toLogin}>
            <Text>Already have an account? </Text>
            <Link href='/login' style={{color: '#E06547'}}>Login</Link>
          </View>
        </Bottom>
      </ScrollView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  register: {
    fontSize: 30,
    marginTop: 15,
  },
  createAccount: {
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
  toLogin: {
    flexDirection: 'row',
    marginBottom: 45
  }
})