import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Can't use <div> -> Use <View>
// Import components from 'react-native'
// All text content should be in <Text></Text>
export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, React-Native!</Text>
      <Text style={styles.text}>Now, what we gonna do?</Text>
      <StatusBar style="auto" />
    </View>
  );
}

// Why StyleSheet.create?
// Mostly, due to auto completion.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 36,
    color: 'red'
  },
});
