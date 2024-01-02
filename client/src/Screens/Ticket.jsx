import React from 'react';

import { Text, View, StyleSheet, Linking, Button,Image } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Review from './NewDetails/Review';
import NewMovie from './NewDetails/ArticleDetail';
import Character from './NewDetails/Character';
import TicketPending from './TicketDetails/TicketPending';
import TicketConfirmed from './TicketDetails/TicketConfirmed';
const Tab = createMaterialTopTabNavigator();

const TicketStack = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'TicketPending') {
                        iconName = focused
                            ? require('../assets/image/clock.png')
                            : require('../assets/image/clock.png');
          
                    }
                     if (route.name === 'TicketConfirmed') {
                        iconName = focused
                            ? require('../assets/image/checklist.png')
                            : require('../assets/image/checklist.png');
                    }
        
                    return <Image source={iconName} style={{ width: 30, height: 30 }} />;

                },
            })}
        >
            <Tab.Screen name="TicketPending" component={TicketPending} options={{
                tabBarLabel: 'Pending Ticket',
                tabBarLabelStyle: { fontSize: 15},
            }} />
            <Tab.Screen name="TicketConfirmed" component={TicketConfirmed} options={{
                tabBarLabel: 'Confirmed Ticket',
                tabBarLabelStyle: { fontSize: 15 },
            }} />
            
            
        </Tab.Navigator>

    );
};
const styles = StyleSheet.create({
    container: {},
});

export default TicketStack;
