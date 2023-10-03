import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import LogoBanner from "../components/LogoBanner";

export default function Welcome() {
  function onExploreMorePressed() {
    console.log('Explore More pressed')
  }

  return (
    <View style={styles.container}>
      <LogoBanner />
      <View style={styles.bottom}>
        <Text style={styles.descriptionText}>Find sports watch parties near you, expand your circle, and connect.</Text>
        <Pressable onPress={onExploreMorePressed}>
          <LinearGradient
            colors={['#D7525A', '#EE8327', '#D7525A', '#F69515']}
            style={styles.exploreMoreButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.exploreMoreText}>Explore More</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D7525A',
    justifyContent: 'space-between'
  },
  bottom: {
    backgroundColor: '#F3F3F3',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  exploreMoreButton: {
    alignItems: 'center',
    borderRadius: 20,
    justifyContent: 'center',
    marginBottom: 150,
    marginHorizontal: 55,
    paddingVertical: 10,
    paddingHorizontal: 65,
  },
  exploreMoreText: {
    color: '#F3F3F3',
    fontSize: 23,
  },
  descriptionText: {
    alignSelf: 'center',
    fontSize: 23,
    margin: 50
  },
  fanBae: {
    alignSelf: 'center',
    fontSize: 50,
  }
})