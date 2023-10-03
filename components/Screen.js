import { StyleSheet, View } from "react-native";

/**
 * Default screen with red background
 */
export default function Screen({ children }) {
  return (
    <View style={styles.container}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D7525A',
    justifyContent: 'space-between'
  },
});