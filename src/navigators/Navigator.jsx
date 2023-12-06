
import React from 'react';
import Account from '../Screens/Account';
import Home from '../Screens/Home';
import News from '../Screens/News';
import Ticket from '../Screens/Ticket';

import { Text, View, StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
const Navigator = () => {

    return <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarHideOnKeyboard: true,
            headerShown: false,
            tabBarStyle: {
                backgroundColor:"#FF3333",
                borderRadius:25,
                marginBottom:10,

            },
            tabBarIcon: ({ focused, color, size }) => {
                
                let iconName;
                if (route.name === 'Home') {
                    iconName = focused
                        ? { uri: 'http://cdn.onlinewebfonts.com/svg/img_379147.png' }
                        : { uri: 'http://cdn.onlinewebfonts.com/svg/img_379147.png' };
                }
                else if (route.name === 'Ticket') {
                    iconName = focused
                        ? { uri: 'https://icon-library.com/images/ticket-icon-vector/ticket-icon-vector-24.jpg' }
                        : { uri: 'https://icon-library.com/images/ticket-icon-vector/ticket-icon-vector-24.jpg' };

                }
                else if (route.name === 'News') {
                    iconName = focused
                        ? { uri: 'https://cdn4.iconfinder.com/data/icons/academic-disciplines-color/64/current-events-512.png' }
                        : { uri: 'https://cdn4.iconfinder.com/data/icons/academic-disciplines-color/64/current-events-512.png' };
                }
                else if (route.name === 'Account') {
                    iconName = focused
                        ? { uri: 'https://icon-library.com/images/account-icon/account-icon-15.jpg' }
                        : { uri: 'https://icon-library.com/images/account-icon/account-icon-15.jpg' };
                }
                iconStyle = focused ? styles.iconTabOnPress : styles.iconTab;
                return <Image source={iconName} style={iconStyle} />;
            },
        })}
    >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Ticket" component={Ticket} />
        <Tab.Screen name="News" component={News} />
        <Tab.Screen name="Account" component={Account} />
        
    </Tab.Navigator>

};
const styles = StyleSheet.create({
    iconTab:{
        width: 20, 
        height: 20,
    },
    iconTabOnPress:{
        width: 35, 
        height: 35,
    },



});
export default Navigator;