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
        options={{ title: 'Edit Account' }}
      />
    </Stack.Navigator>
  );
};

export default AccountStack;
