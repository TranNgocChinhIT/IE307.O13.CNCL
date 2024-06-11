import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import HomeScreen from "./Home";
import Screen1 from "./Screen1";
import Locate from "./Locate";

export default function Map({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Screen1"
        component={Screen1}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Locate"
        options={{ headerShown: false }}
        component={Locate}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonAdd: {
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  add: {
    height: 30,
    width: 30,
  },
});
