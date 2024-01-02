import React from 'react';

import { Text, View, StyleSheet, Linking, Button, Image } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Review from './NewDetails/Review';
import NewMovie from './NewDetails/ArticleDetail';
import Character from './NewDetails/Character';
const Tab = createMaterialTopTabNavigator();

const NewStack = () => {
    return (

        <Tab.Navigator

            screenOptions={({ route }) => ({
                tabBarLabelStyle: { fontSize: 10 },
                tabBarStyle: {
                    backgroundColor: '#FFFFFF',
                    borderRadius: 5,
                },
                tabBarIndicatorStyle: {
                    backgroundColor: 'blue',
                   // height: 3,
                   // borderRadius: 2,
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Review') {
                        iconName = focused
                            ? require('../assets/image/feedback.png')
                            : require('../assets/image/feedback.png');
                    } 
                    // else if (route.name === 'NewsMovie') {
                    //     iconName = focused
                    //         ? require('../assets/image/newspaper.png')
                    //         : require('../assets/image/newspaper.png');
                    // } 
                    else if (route.name === 'Character') {
                        iconName = focused
                            ? require('../assets/image/character.png')
                            : require('../assets/image/character.png');
                    }

                    return <Image source={iconName} style={{ width: 25, height: 25,tintColor:'#7f0d00' }} />;
                },
            })}
        >
            <Tab.Screen name="Review" component={Review} options={{
                tabBarLabel: 'Review',
                tabBarLabelStyle: { fontSize: 12 , color:"#7f0d00" , fontWeight: "bold"},
            }} />
            {/* <Tab.Screen name="NewsMovie" component={NewMovie} options={{
                tabBarLabel: 'News',
                tabBarLabelStyle: { fontSize: 10 },
            }} /> */}
            <Tab.Screen name="Character" component={Character} options={{
                tabBarLabel: 'Character',
                tabBarLabelStyle: { fontSize: 12,  color:"#7f0d00" , fontWeight: "bold"},
            }} />

        </Tab.Navigator>

    );
};
const styles = StyleSheet.create({
    container: {},
});

export default NewStack;
