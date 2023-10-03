import { Text, StyleSheet } from "react-native";
import { Screen, Bottom, LogoBanner, PrimaryButton } from "../components";
import { router } from "expo-router";

export default function Welcome() {
  function onExploreMorePressed() {
    router.push('/login')
  }

  return (
    <Screen>
      <LogoBanner />
      <Bottom>
        <Text style={styles.descriptionText}>Find sports watch parties near you, expand your circle, and connect.</Text>
        <PrimaryButton onPress={onExploreMorePressed} text='Explore More'/>
      </Bottom>
    </Screen>
  )
}

const styles = StyleSheet.create({
  descriptionText: {
    alignSelf: 'center',
    fontSize: 23,
    margin: 40
  },
  fanBae: {
    alignSelf: 'center',
    fontSize: 50,
  }
})