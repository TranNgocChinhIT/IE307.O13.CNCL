import React from "react";
import { StyleSheet } from "react-native";
import {AuthProvider} from './src/Screens/AuthContext'
import AppNavigator from './src/Screens/AppNavigator'
const App = () => {
  return (
    <AuthProvider>
      <AppNavigator/>
    </AuthProvider>
  );
};
const style = StyleSheet.create({
  container: {},
});

export default App;
