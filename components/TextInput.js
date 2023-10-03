import { StyleSheet, TextInput as RNTextInput } from "react-native"

export default function TextInput({ placeholder}) {
  return (
    <RNTextInput placeholder={placeholder} style={styles.email} />
  )
}

const styles = StyleSheet.create({
  email: {
    borderColor: '#8B8B8B',
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 12,
    paddingLeft: 45,
    width: '100%',
  },
})