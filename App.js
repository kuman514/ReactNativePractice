import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import API_KEY from './apikey';

// Can't use <div> -> Use <View>
// Import components from 'react-native'
// All text content should be in <Text></Text>

// Web browser -> Scroll Available
// View -> Scroll Not Available
// ScrollView -> Scroll Available

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ScrollView horizontal pagingEnabled

export default function App() {
  const [status, setStatus] = useState({
    city: 'Loading...',
    days: [],
    ok: true,
    brought: false
  });

  const ask = async () => {
    // Get permission of geolocation
    const permission = await Location.requestForegroundPermissionsAsync();
    //console.log(permission);
    if (!permission.granted) {
      setStatus({
        ...status,
        ok: false
      });
    }

    // Get current position
    const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({
      accuracy: 5
    });
    console.log(latitude, longitude);

    // Get location via latitude and longitude
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );

    // Fetch weather
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts,minutely,hourly&appid=${API_KEY}&units=metric`);
    console.log(response.status);
    if (response.ok) {
      const weatherData = await response.json();
      //console.log(weatherData.daily);
      setStatus({
        ...status,
        city: location[0].city,
        days: weatherData.daily,
        brought: true
      });
    } else {
      // If failed to fetch weather, set city, but it's not OK.
      setStatus({
        ...status,
        city: location[0].city,
        ok: false
      });
    }
  };

  useEffect(() => {
    if (status.ok && !status.brought) {
      ask();
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>
          { status.city }
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.weather}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {
          status.days.length === 0 ? (
            <View style={styles.day}>
              <ActivityIndicator color="white" size="large" style={{
                marginTop: 11
              }} />
            </View>
          ) : (
            status.days.map((day, index) => {
              return (
                <View key={index} style={styles.day}>
                  <Text style={styles.temp}>
                    { parseFloat(day.temp.day).toFixed(1) }
                  </Text>
                  <Text style={styles.description}>
                    { day.weather[0].main }
                  </Text>
                  <Text style={styles.tinyText}>
                    { day.weather[0].description }
                  </Text>
                </View>
              );
            })
          )
        }
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
  },
  tinyText: {
    fontSize: 20
  }
});

// No width and height -> Use flex
