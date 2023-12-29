import React from "react";
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../Screens/Login';
import Signup from '../Screens/Signup';


const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{headerShown:false,animation: "slide_from_right"}}/>
            <Stack.Screen name="Signup" component={Signup} options={{headerShown:false,animation: "slide_from_right"}} />
            
        </Stack.Navigator>
    );
};

export default AuthStack;