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
        screenOptions={{
            tabBarLabelStyle: { fontSize: 15,color: 'white' },
            tabBarIndicatorStyle: {
              backgroundColor: 'yellow',
              height: 2,
              borderRadius: 25,
            },
            tabBarStyle: { backgroundColor: '#FF3333', height: 60 },
          }}
   
        >
            
            <Tab.Screen name="TicketPending" component={TicketPending} options={{
                tabBarLabel: 'Pending Ticket',
                tabBarLabelStyle: { fontSize: 17,color: 'white',fontWeight:'bold'},
            }} />
            <Tab.Screen name="TicketConfirmed" component={TicketConfirmed} options={{
                tabBarLabel: 'Confirmed Ticket',
                tabBarLabelStyle: { fontSize: 17,color: 'white',fontWeight:'bold' },
            }} />
            
            
        </Tab.Navigator>
      
    );
};
const styles = StyleSheet.create({
    container: {
       
    },
});

export default TicketStack;
