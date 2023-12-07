import { LinearGradient } from "expo-linear-gradient";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

type PrimaryButtonProps = PressableProps & {
  text: string;
  fontSize?: number;
};

export default function PrimaryButton({
  text,
  fontSize = 23,
  ...pressableProps
}: PrimaryButtonProps) {
  const paddingRatio = 60 / 23;

  const defaultColors = ["#D7525A", "#EE8327", "#D7525A", "#F69515"];
  const colors = pressableProps.disabled
    ? defaultColors.map((color) => color + "80")
    : defaultColors;

  return (
    <Pressable {...pressableProps}>
      <LinearGradient
        colors={colors}
        style={[styles.button, { paddingHorizontal: fontSize * paddingRatio }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={[styles.textStyle, { fontSize }]}>{text}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 20,
    justifyContent: "center",
    paddingVertical: 10,
  },
  textStyle: {
    color: "#F3F3F3",
  },
});
