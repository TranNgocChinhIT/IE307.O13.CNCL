import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeStack from "../navigators/HomeStack";
import MovieScreen from "../Screens/Movie";
import Seats from "../Screens/Seats";
const Stack = createNativeStackNavigator();
//adsdasdadsdasd
const AllStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="HomeStack"
        component={HomeStack}
        options={{ animation: "default" }}
      />
      <Stack.Screen
        name="MovieScreen"
        component={MovieScreen}
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="SeatsScreen"
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
