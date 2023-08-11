import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useSupabase } from "@/context/useSupabase";
import { StatusBar } from 'expo-status-bar';

import { useFonts,  Inter_700Bold } from '@expo-google-fonts/inter';


export default function TabOneScreen() {

  const { signOut,session,username} = useSupabase();


  let [fontsLoaded] = useFonts({
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }


  // Kullanıcı adını burada alın veya istediğiniz şekilde ayarlayın

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
        <Text style={styles.greetingText}>{greeting}</Text>
        <Text style={styles.usernameText}>{username?.toUpperCase()}</Text>
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
    marginBottom: -10, 
    fontFamily:"Inter_700Bold" 
  },
  usernameText: {
    fontSize: 32,
    color: '#FF2D55',
    fontFamily:"Inter_700Bold" 
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
