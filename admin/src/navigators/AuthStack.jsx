import React from "react";
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../Screens/Login';

const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
        </Stack.Navigator>
    );
};

export default AuthStack;