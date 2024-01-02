import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Account from '../Screens/Account';
import EditAccount from '../Screens/EditAccount';

import TicketConfirmed from "../Screens/TicketDetails/TicketConfirmed";
import TicketPending from "../Screens/TicketDetails/TicketPending";
import Theater from '../Screens/Theater/Theater';
const Stack = createStackNavigator();

const AccountStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Accounts"
        component={Account}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditAccount"
        component={EditAccount}
        options={{
          title: 'User Information', animation: "slide_from_right", headerStyle: {
            backgroundColor: '#FF3333',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            height: 80,
          },
          headerTitleStyle: {
            color: 'white',
          },
          tabBarVisible: false,
        }}
      />
      <Stack.Screen name="Pending Confirmation Ticket" component={TicketConfirmed} options={{
        headerShown: true, animation: "slide_from_right", headerStyle: {
          backgroundColor: '#FF3333',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          height: 70,
        },
        headerTitleStyle: {
          color: 'white',
        },
        tabBarVisible: false,
      }} />
      <Stack.Screen name="Booked Ticket" component={TicketPending} options={{
        headerShown: true, animation: "slide_from_right", headerStyle: {
          backgroundColor: '#FF3333',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          height: 70,
        },
        headerTitleStyle: {
          color: 'white',
        },
        tabBarVisible: false,
      }} />
      <Stack.Screen name="Movie Theater Information" component={Theater} options={{
        headerShown: true, animation: "slide_from_right", headerStyle: {
          backgroundColor: '#FF3333',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          height: 70,
        },
        headerTitleStyle: {
          color: 'white',
        },
        tabBarVisible: false,
      }} />
    </Stack.Navigator>
  );
};

export default AccountStack;
