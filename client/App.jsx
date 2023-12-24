import React from "react";
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, AuthContext } from './src/navigators/AuthContext'
import AppNavigator from './src/navigators/AppNavigator'
import { TicketProvider } from "./src/navigators/DataContext";
import { MovieProvider } from "./src/context/movieContext";
const App = () => {
  return (
    <TicketProvider>
      <AuthProvider>
      
        <AppNavigator />
     
      </AuthProvider>
    </TicketProvider>
  )
};
const style = StyleSheet.create({
  container: {},
});

export default App;
