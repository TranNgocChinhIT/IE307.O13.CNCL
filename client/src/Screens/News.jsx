import React from 'react';

import { Text, View, StyleSheet, Linking, Button,Image } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Review from './NewDetails/Review';
import NewMovie from './NewDetails/NewMovie';
import Character from './NewDetails/Character';
const Tab = createMaterialTopTabNavigator();

const NewStack = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Review') {
                        iconName = focused
                            ? require('../assets/image/feedback.png')
                            : require('../assets/image/feedback.png');
          
                    }
<<<<<<< HEAD
                    else if (route.name === 'NewMovie') {
=======
                    else if (route.name === 'NewsMovie') {
>>>>>>> 18b61c0949dd8fe2a957d1769d231ab6dc07b845
                        iconName = focused
                            ? require('../assets/image/newspaper.png')
                            : require('../assets/image/newspaper.png');
                    }
                    else if (route.name === 'Character') {
                        iconName = focused
                            ? require('../assets/image/character.png')
                            : require('../assets/image/character.png');
                    }
                  
                    return <Image source={iconName} style={{ width: 20, height: 20 }} />;

                },
            })}
        >
            <Tab.Screen name="Review" component={Review} options={{
                tabBarLabel: 'Review',
                tabBarLabelStyle: { fontSize: 10 },
            }} />
<<<<<<< HEAD
            <Tab.Screen name="NewMovie" component={NewMovie} options={{
=======
            <Tab.Screen name="NewsMovie" component={NewMovie} options={{
>>>>>>> 18b61c0949dd8fe2a957d1769d231ab6dc07b845
                tabBarLabel: 'News',
                tabBarLabelStyle: { fontSize: 10 },
            }} /> 
            <Tab.Screen name="Character" component={Character} options={{
                tabBarLabel: 'Character',
                tabBarLabelStyle: { fontSize: 10 },
            }} />
            
        </Tab.Navigator>

    );
};
const styles = StyleSheet.create({
    container: {},
});

export default NewStack;
