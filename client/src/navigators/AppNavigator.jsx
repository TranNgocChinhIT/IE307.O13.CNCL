// AppNavigator.js
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "../context/AuthContext";
import AllStack from "./AllStack";
import HomeStack from "./HomeStack";
import AuthStack from "./AuthStack";
const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return <NavigationContainer>
      <Stack.Navigator>
       
          <Stack.Screen
            name="AllStack"
            component={AllStack}
            options={{headerShown:false}}
          />
       
      </Stack.Navigator>
    </NavigationContainer>
};

export default AppNavigator;
