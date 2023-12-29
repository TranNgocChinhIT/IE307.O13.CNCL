import React from "react";
import { Text, View, StyleSheet,ImageBackground } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeStack from "./HomeStack";

const Stack = createNativeStackNavigator();


const AllStack = () => {
  return (
    
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="HomeStack"
        component={HomeStack}
        options={{ animation: "default" }}
      />
    
    </Stack.Navigator>
  
    );
};
const styles = StyleSheet.create({
  container: {},
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    marginTop: 20,

},
});

export default AllStack;
