import React from "react";
import Account from "../Screens/Account";
import Home from "../Screens/Home";
import News from "../Screens/News";
import Ticket from "../Screens/Ticket";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View, StyleSheet, Image } from "react-native";
const Bottom = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Bottom.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#FF3333",
          borderRadius: 25,
          marginBottom: 10,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused
              ? { uri: "http://cdn.onlinewebfonts.com/svg/img_379147.png" }
              : { uri: "http://cdn.onlinewebfonts.com/svg/img_379147.png" };
          } else if (route.name === "Ticket") {
            iconName = focused
              ? {
                  uri: "https://icon-library.com/images/ticket-icon-vector/ticket-icon-vector-24.jpg",
                }
              : {
                  uri: "https://icon-library.com/images/ticket-icon-vector/ticket-icon-vector-24.jpg",
                };
          } else if (route.name === "News") {
            iconName = focused
              ? {
                  uri: "https://cdn4.iconfinder.com/data/icons/academic-disciplines-color/64/current-events-512.png",
                }
              : {
                  uri: "https://cdn4.iconfinder.com/data/icons/academic-disciplines-color/64/current-events-512.png",
                };
          } else if (route.name === "Account") {
            iconName = focused
              ? {
                  uri: "https://icon-library.com/images/account-icon/account-icon-15.jpg",
                }
              : {
                  uri: "https://icon-library.com/images/account-icon/account-icon-15.jpg",
                };
          }
          iconStyle = focused ? styles.iconTabOnPress : styles.iconTab;
          return <Image source={iconName} style={iconStyle} />;
        },
      })}
    >
      <Bottom.Screen name="Home" component={Home} />
      <Bottom.Screen name="Ticket" component={Ticket} />
      <Bottom.Screen name="News" component={News} />
      <Bottom.Screen name="Account" component={Account} />
    </Bottom.Navigator>
  );
};
const styles = StyleSheet.create({
  iconTab: {
    width: 20,
    height: 20,
  },
  iconTabOnPress: {
    width: 35,
    height: 35,
  },
});
export default HomeStack;
