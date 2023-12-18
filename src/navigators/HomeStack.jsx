import React from "react";
import Account from "../Screens/Account";
import Home from "../Screens/Home";
import News from "../Screens/News";
import Ticket from "../Screens/Ticket";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View, StyleSheet, Image, ImageBackground } from "react-native";
const Bottom = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <ImageBackground
      source={require('../assets/image/aquaman.jpg')}
      style={styles.backgroundImage}

    >
      <Bottom.Navigator
        screenOptions={({ route }) => ({
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#FF3333",
            borderRadius: 25,
            marginBottom: 10,
          },
          tabBarLabelStyle: {
            color: 'white', 
            fontSize: 12, 
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused
                ? require('../assets/image/movie.png')
                : require('../assets/image/movie.png');
            } else if (route.name === "Ticket") {
              iconName = focused
              ? require('../assets/image/tickets.png')
              : require('../assets/image/tickets.png');
            } else if (route.name === "News") {
              iconName = focused
              ? require('../assets/image/news.png')
              : require('../assets/image/news.png');
            } else if (route.name === "Account") {
              iconName = focused
              ? require('../assets/image/user.png')
              : require('../assets/image/user.png');
            }

            iconStyle = focused ? styles.iconTabOnPress : styles.iconTab;
            return <Image source={iconName} style={[iconStyle, { tintColor: '#FFFFFF' }]} />;
          },
        })}
      >
        <Bottom.Screen name="Home" component={Home} />
        <Bottom.Screen name="Ticket" component={Ticket} />
        <Bottom.Screen name="News" component={News} />
        <Bottom.Screen name="Account" component={Account} />
      </Bottom.Navigator>
    </ImageBackground>

  );
};
const styles = StyleSheet.create({
  iconTab: {
    width: 27,
    height: 27,
  },
  iconTabOnPress: {
    width: 40,
    height: 40,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    marginTop: 20,

  },
});
export default HomeStack;
