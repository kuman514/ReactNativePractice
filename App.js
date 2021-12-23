import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import * as Location from 'expo-location';

// Can't use <div> -> Use <View>
// Import components from 'react-native'
// All text content should be in <Text></Text>

// Web browser -> Scroll Available
// View -> Scroll Not Available
// ScrollView -> Scroll Available

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ScrollView horizontal pagingEnabled

export default function App() {
  const [city, setCity] = useState();
  const [ok, setOk] = useState(true);

  const ask = async () => {
    // Get Permission of geolocation
    const permission = await Location.requestForegroundPermissionsAsync();
    //console.log(permission);
    if (!permission.granted) {
      setOk(false);
    }

    const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({
      accuracy: 5
    });
    //console.log(latitude, longitude);

    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    setCity(location[0].city);
  };
  useEffect(() => {
    ask();
  });

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>
          { city }
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.weather}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </ScrollView>
    </View>
  );
}

// Why StyleSheet.create?
// Mostly, due to auto completion.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellowgreen'
  },
  city: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cityName: {
    fontSize: 68,
    fontWeight: '600'
  },
  weather: {
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: 'center'
  },
  temp: {
    marginTop: 50,
    fontSize: 178
  },
  description: {
    marginTop: -30,
    fontSize: 60
  }
});

// No width and height -> Use flex
