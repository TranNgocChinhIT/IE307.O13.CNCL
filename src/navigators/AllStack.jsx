import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeStack from "./HomeStack";
import Movie from "../Screens/Movie";
import Seats from "../Screens/Seats";
import LocationAndTime from "../Screens/LocationAndTime";
import PayScreens from "../Screens/PayScreens";
const Stack = createNativeStackNavigator();


const AllStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="HomeStack"
        component={HomeStack}
        options={{ animation: "default" }}
      />
      <Stack.Screen
        name="Movie"
        component={Movie}
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="LocationAndTime"
        component={LocationAndTime}
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="Seats"
        component={Seats}
        options={{ animation: "slide_from_bottom" }}
      />
      <Stack.Screen
        name="PayScreens"
        component={PayScreens}
        options={{ animation: "slide_from_right" }}
      />
    </Stack.Navigator>
    );
};
const style = StyleSheet.create({
  container: {},
});

export default AllStack;
