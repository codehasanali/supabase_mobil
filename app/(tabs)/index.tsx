import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useSupabase } from "@/context/useSupabase";
import { StatusBar } from 'expo-status-bar';

import { useFonts, Inter_900Black, Inter_700Bold } from '@expo-google-fonts/inter';


export default function TabOneScreen() {

  const { signOut,session} = useSupabase();


  


  // Kullanıcı adını burada alın veya istediğiniz şekilde ayarlayın
  const username = "John Doe"; 

  // Saat bilgisini alın
  const currentTime = new Date();
  let greeting = "Good morning,";

  if (currentTime.getHours() >= 12 && currentTime.getHours() < 18) {
    greeting = "Good afternoon,";
  } else if (currentTime.getHours() >= 18) {
    greeting = "Good evening,";
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}></Text>
        <Text style={styles.usernameText}></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    marginBottom: 40,
    marginLeft: 20,
    marginTop: 50,  
    backgroundColor:"FFFFFF"
  },
  greetingContainer: {
    alignItems: 'flex-start',   
  },
  greetingText: {
    color: '#090A0A',
    fontSize: 32,
    marginBottom: -10,  // John yazısını biraz daha üste çekmek için
  },
  usernameText: {
    fontSize: 32,
    color: '#FF2D55',
  },
  tabHeaderText: {
    fontSize: 24,
    marginTop: 20,
    marginBottom: 10,
  },
  signOutText: {
    marginTop: 20,
  },
});
