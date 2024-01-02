import React from "react";
import { Text, View, StyleSheet,ImageBackground } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeStack from "./HomeStack";
import Movie from "../Screens/Movie";
import Seats from "../Screens/Seats";
import LocationAndTime from "../Screens/LocationAndTime";
import PayScreens from "../Screens/PayScreens";
import Review from "../Screens/NewDetails/Review";
import ReviewMovie from "../Screens/TicketDetails/ReviewMovie";
import ReviewDetails from "../Screens/NewDetails/ReviewDetails";
import ArticleDetail from "../Screens/NewDetails/ArticleDetail";
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
      <Stack.Screen
        name="Reviews"
        component={ReviewMovie}
        options={{ title: 'User Information',animation: "slide_from_right", headerShown: true,headerStyle: {
          backgroundColor: '#7f0d00',
          borderBottomLeftRadius: 90,
          borderBottomRightRadius: 90,
        
        },
        headerTitleStyle: {
          color: 'white',
        }, }}
      />
      <Stack.Screen
        name="ReviewDetails"
        component={ReviewDetails}
        options={{
          title: 'See Reviews',
          animation: "slide_from_right",  // Ensure this animation is supported
          headerShown: true,
          headerStyle: {
            backgroundColor: '#7f0d00',
            borderBottomLeftRadius: 90,
            borderBottomRightRadius: 90,
          },
          headerTitleStyle: {
            color: 'white',
          },
        }}
      />
      <Stack.Screen
        name="ArticleDetail"
        component={ArticleDetail}
        options={{ animation: "slide_from_right" }}
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
