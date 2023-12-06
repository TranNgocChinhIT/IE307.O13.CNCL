import React from 'react';
import { Text, View,StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navigator from './src/navigators/Navigator';
import Movie from './src/Screens/Movie';
import Seats from './src/Screens/Seats';
const Stack =createNativeStackNavigator();
const App = ()=>{
        return <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name ="Tab "component={Navigator} options={{animation:'default'}}/>
            <Stack.Screen name ="Movie "component={Movie} options={{animation:'slide_from_right'}}/>
            <Stack.Screen name ="Seats "component={Seats} options={{animation:'slide_from_bottom'}}/>
          </Stack.Navigator>


        </NavigationContainer>
  
};
const style= StyleSheet.create({
    container:{},
});

export default App;
