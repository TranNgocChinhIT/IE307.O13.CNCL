import React from "react";
import { Text, View, StyleSheet } from 'react-native';

import { AuthProvider, AuthContext } from './src/context/AuthContext'
import AppNavigator from './src/navigators/AppNavigator'
import { TicketProvider } from "./src/context/DataContext";

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
