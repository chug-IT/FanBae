import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps,
} from "react-native";

export default function TextInput(props: TextInputProps) {
  return <RNTextInput {...props} style={styles.email} />;
}

const styles = StyleSheet.create({
  email: {
    borderColor: "#8B8B8B",
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 12,
    paddingLeft: 45,
    width: "100%",
    color: "black",
  },
});
