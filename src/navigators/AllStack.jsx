import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../Screens/Home";
import Movie from "../Screens/Movie";
import Seats from "../Screens/Seats";
const Stack = createNativeStackNavigator();
const AllStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ animation: "default"}}
      />
      <Stack.Screen
        name="Movie"
        component={Movie}
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="Seats"
        component={Seats}
        options={{ animation: "slide_from_bottom" }}
      />
    </Stack.Navigator>
  );
};
const style = StyleSheet.create({
  container: {},
});

export default AllStack;
