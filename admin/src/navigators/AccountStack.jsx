import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Account from '../Screens/Account';
import EditAccount from '../Screens/EditAccount';


const Stack = createStackNavigator();

const AccountStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Account"
        component={Account}
        options={{headerShown:false}}
      />
      <Stack.Screen
        name="EditAccount"
        component={EditAccount}
        options={{ title: 'User Information',animation: "slide_from_right",headerStyle: {
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
    </Stack.Navigator>
  );
};

export default AccountStack;
