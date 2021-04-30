import React, { useEffect } from 'react';
import { StyleSheet,  } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Notifications from 'expo-notifications';

import Routes from './src/routes';

import { useFonts, Jost_400Regular, Jost_600SemiBold } from '@expo-google-fonts/jost';

export default function App() {
  const [isLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  useEffect(() => {
    // const subscription = Notifications.addNotificationReceivedListener(
    //   async notification => {
    //     const data = notification.request.content.data.plant as PlantProps;

    //     console.log(data);
    //   }
    // );

    // return () => subscription.remove();
    async function notifications() {
      const data = await Notifications.getAllScheduledNotificationsAsync();

      console.log('NOTI');
      console.log(data);
    }
    
    notifications();
  })

  if(!isLoaded) {
    return <AppLoading />
  }

  return (
    <Routes />
  )
}

const styles = StyleSheet.create({
  
});