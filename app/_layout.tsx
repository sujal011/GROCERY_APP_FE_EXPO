import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";
import * as Location from 'expo-location'
import { Alert } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    'Okra-Bold': require('../assets/fonts/Okra-Bold.ttf'),
    'Okra-Medium': require('../assets/fonts/Okra-Medium.ttf'),
    'Okra-MediumLight': require('../assets/fonts/Okra-MediumLight.ttf'),
    'Okra-Regular': require('../assets/fonts/Okra-Regular.ttf'),
    'Okra-ExtraBold': require('../assets/fonts/Okra-ExtraBold.ttf'),
  });

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }
    }

    getCurrentLocation();
  }, []);
  
  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error])

  if (!fontsLoaded && !error) return null;

  return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
            navigationBarHidden: false,

          }}
        />
        <Stack.Screen
          name="(protected)"
          options={{
            headerShown: false,
            navigationBarHidden: false,
          }}
        />
      </Stack>
  );
}
