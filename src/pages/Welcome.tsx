import React, { useState } from 'react';
import { Text, StyleSheet, Image, SafeAreaView } from 'react-native';

import wateringImg from '../assets/watering.png';
import { Button } from '../components/Button';
import colors from '../styles/colors';



export function Welcome() {
    const [visible, setVisible] = useState(true);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
            Gerencie {'\n'}
            suas plantas {'\n'}
            de forma fácil
      </Text>

      {visible && <Image source={wateringImg} style={styles.image}/> }

      <Text style={styles.subtitle}>Nao esqueça mais de regar suas plantas. Nós cuidamos de lembrar você sempre que precisar.</Text>

      <Button title='>' onPress={() => setVisible(!visible)} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.heading,
    marginTop: 38
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 20,
    color: colors.heading,
    marginTop: 38
  },
  image: {
      width: 292,
      height: 284
  }
});