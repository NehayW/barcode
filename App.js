import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/screens/Home';
import QrScanner from './src/screens/QrScanner';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="QrScanner" component={QrScanner} />
        </Stack.Navigator>
      </NavigationContainer>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
