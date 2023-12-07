import { StyleSheet, View } from "react-native";

/**
 * Bottom component with rounded top corners
 */
export default function Bottom({children}) {
  return (
    <View style={styles.bottom}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  bottom: {
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
});