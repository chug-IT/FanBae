import Logo from '../assets/logo.png';
import { Image, StyleSheet, View } from 'react-native';

export default function LogoBanner() {
  return (
    <View style={styles.banner}>
      <Image source={Logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#F3F3F3',
    marginTop: 125,
  },
});
