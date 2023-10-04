import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, Text } from "react-native";

export default function PrimaryButton({ onPress, text, fontSize = 23 }) {
  const paddingRatio = 60 / 23

  return (
    <Pressable onPress={onPress}>
      <LinearGradient
        colors={['#D7525A', '#EE8327', '#D7525A', '#F69515']}
        style={[styles.button, { paddingHorizontal: fontSize * paddingRatio }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={[styles.textStyle, {fontSize}]}>{text}</Text>
      </LinearGradient>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 20,
    justifyContent: 'center',
    paddingVertical: 10,
  },
  textStyle: {
    color: '#F3F3F3',
  },
})