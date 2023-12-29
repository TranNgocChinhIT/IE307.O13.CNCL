import React from "react";
import Home from "../Screens/Home";
import Ticket from "../Screens/Ticket";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View, StyleSheet, Image, ImageBackground } from "react-native";
import AccountStack from "./AccountStack";
import NewStack from "../Screens/News";
const Bottom = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <ImageBackground
      source={require('../assets/image/aquaman.jpg')}
      style={styles.backgroundImage}

    >
      <Bottom.Navigator
        screenOptions={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: 'black',
            borderTopWidth: 0,
            borderRadius:100,
            height: 70,
          },
        }

        }>
        <Bottom.Screen name="Movie" component={Home} options={{
          tabBarShowLabel: true,
          tabBarIcon: ({ focused, color, size }) => {
            const iconImage = focused
              ? require('../assets/image/movie.png') // Đường dẫn đến hình ảnh icon khi được chọn
              : require('../assets/image/movie.png');
            return (
              <View
                style={[
                  styles.activeTabBackground,
                  focused ? { backgroundColor: '#7f0d00' } : {},
                ]}>
                <Image source={iconImage} style={{ width: 25, height: 25,tintColor:'white' }} />
              </View>
            );
          },
          tabBarLabelStyle: {
            color:'white',
          },
        }} />
        <Bottom.Screen name="Schedule" component={Ticket} options={{
          tabBarShowLabel: true,
          tabBarIcon: ({ focused, color, size }) => {
            const iconImage = focused
              ? require('../assets/image/tickets.png') // Đường dẫn đến hình ảnh icon khi được chọn
              : require('../assets/image/tickets.png');
            return (
              <View
                style={[
                  styles.activeTabBackground,
                  focused ? { backgroundColor: '#7f0d00' } : {},
                ]}>
                <Image source={iconImage} style={{ width: 25, height: 25,tintColor:'white' }} />
              </View>
            );
          },
          tabBarLabelStyle: {
            color:'white',
          },
        }}/>
        <Bottom.Screen name="Book" component={NewStack} options={{
          tabBarShowLabel: true,
          tabBarIcon: ({ focused, color, size }) => {
            const iconImage = focused
              ? require('../assets/image/news.png') // Đường dẫn đến hình ảnh icon khi được chọn
              : require('../assets/image/news.png');
            return (
              <View
                style={[
                  styles.activeTabBackground,
                  focused ? { backgroundColor: '#7f0d00' } : {},
                ]}>
                <Image source={iconImage} style={{ width: 25, height: 25,tintColor:'white' }} />
              </View>
            );
          },
          tabBarLabelStyle: {
            color:'white',
          },
        }}/>
        <Bottom.Screen name="Account" component={AccountStack} options={{
          tabBarShowLabel: true,
          tabBarShowLabelColor: 'black',
          tabBarIcon: ({ focused, color, size }) => {
            const iconImage = focused
              ? require('../assets/image/user.png') // Đường dẫn đến hình ảnh icon khi được chọn
              : require('../assets/image/user.png');
            return (
              <View
                style={[
                  styles.activeTabBackground,
                  focused ? { backgroundColor: '#7f0d00' } : {},
                ]}>
               <Image source={iconImage} style={{ width: 30, height: 30,tintColor:'white' }} />
             
              </View>
            );
          },
          tabBarLabelStyle: {
            color:'white',
          },
        }}/>
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
  activeTabBackground: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 100,
  },
});
export default HomeStack;