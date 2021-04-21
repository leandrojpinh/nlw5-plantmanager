import React from 'react';
import { Text, View, StyleSheet,  } from 'react-native';
import AppLoading from 'expo-app-loading';

import Routes from './src/routes';

import { useFonts, Jost_400Regular, Jost_600SemiBold } from '@expo-google-fonts/jost';

export default function App() {
  const [isLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  if(!isLoaded) {
    return <AppLoading />
  }

  return (
    // <Welcome />
    <Routes />
  )
}

const styles = StyleSheet.create({
  
});