import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Places from './Places';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Map from './Map';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Main = ({ navigation }) => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Places') {
              iconName = focused
                ? require('../assets/location.png')
                : require('../assets/location.png');
            } else if (route.name === 'Map') {
              iconName = focused
                ? require('../assets/map.png')
                : require('../assets/map.png');
            }
            return (
              <Image
                source={iconName}
                style={{ width: 30, height: 30, tintColor: focused ? '#00BFFF' : 'black' }}
              />
            );
          },
        })}
      >
        <Tab.Screen name="Places"component={Places} options={{ headerShown: false }} />
        <Tab.Screen name="Map" component={Map} options={{ headerShown: false }}/>
       
      </Tab.Navigator>

    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonAdd: {
    backgroundColor: 'orange',
    borderRadius: 25,
    width: 31,
    height: 31,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
  },
});

export default Main;
