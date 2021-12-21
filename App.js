import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Can't use <div> -> Use <View>
// Import components from 'react-native'
// All text content should be in <Text></Text>
export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.subView1} />
      <View style={styles.subView2} />
      <View style={styles.subView3} />
    </View>
  );
}

// Why StyleSheet.create?
// Mostly, due to auto completion.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  subView1: {
    flex: 1,
    fontSize: 36,
    backgroundColor: 'red'
  },
  subView2: {
    flex: 2,
    fontSize: 36,
    backgroundColor: 'green'
  },
  subView3: {
    flex: 3,
    fontSize: 36,
    backgroundColor: 'blue'
  }
});

// No width and height -> Use flex
