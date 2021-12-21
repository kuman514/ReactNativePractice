import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Can't use <div> -> Use <View>
// Import components from 'react-native'
// All text content should be in <Text></Text>
export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
      </View>
      <View style={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </View>
    </View>
  );
}

// Why StyleSheet.create?
// Mostly, due to auto completion.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green'
  },
  city: {
    flex: 1,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cityName: {
    fontSize: 68,
    fontWeight: '600'
  },
  weather: {
    flex: 3
  },
  day: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'teal'
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
