import React, { useState,useContext } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {AuthContext} from './AuthContext'

const Signup = () => {

  const navigation = useNavigation();
  const {email , setEmail,password,setPassword,isAuthenticated,setisAuthenticated} = useContext(AuthContext);
  const [username, setUsername] = React.useState('');
  const [confirm, setConfirm] = React.useState('');
  const handleSignup = () => {
    if (username === '' || email === '' || password === '' || confirm === '') {
      Alert.alert('Warning', 'Please fill in all fields.');
    } else if (password !== confirm) {
      Alert.alert('Warning', 'Password and confirm password do not match.');
    } 
  };
  const handleOnPressLogin =() =>{
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.imageStyle}
        source={{ uri: 'https://internet-israel.com/wp-content/uploads/2018/07/React_Native_Logo-768x403.png' }}
      />
      <Text style={styles.text}>Create New Account</Text>
      <View style={styles.containerTextInput}>
        <Image style={styles.imageTextInput} source={{ uri: 'https://tse4.explicit.bing.net/th?id=OIP.5ylLzBNwByczTaKBCAi9IgHaHa&pid=Api&P=0&h=220' }} />
        <TextInput
          style={styles.textI}
          placeholder="Enter username"
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={styles.containerTextInput}>
        <Image style={styles.imageTextInput} source={{ uri: 'https://clipground.com/images/email-icon-clipart-transparent-1.png' }} />
        <TextInput
          style={styles.textI}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.containerTextInput}>
        <Image style={styles.imageTextInput} source={{ uri: 'https://tse1.mm.bing.net/th?id=OIP.PO4tSlis-6R6EjopPKu0xQHaEH&pid=Api&P=0&h=220' }} />
        <TextInput
          style={styles.textI}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.containerTextInput}>
        <Image style={styles.imageTextInput} source={{ uri: 'https://tse1.mm.bing.net/th.id=OIP.PO4tSlis-6R6EjopPKu0xQHaEH&pid=Api&P=0&h=220' }} />
        <TextInput
          style={styles.textI}
          placeholder="Confirm password"
          value={confirm}
          onChangeText={setConfirm}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.textLogin}>CREATE</Text>
      </TouchableOpacity>

      <View style={styles.signUpContainer}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={handleOnPressLogin}>
          <Text style={styles.signUpText}>Login now!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: 80,
    height: 80,
    borderRadius: 100,
    alignSelf: 'center',
    marginTop: 120,
  },
  text: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 25,
    fontWeight: 'bold',
  },
  textI: {
    flex: 1,
    marginLeft: 10,
  },
  containerTextInput: {
    height: 50,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    alignSelf: 'center',
    borderRadius: 8,
    marginTop: 25,
    flexDirection: 'row',
  },
  imageTextInput: {
    width: 27,
    height: 27,
    marginTop: 11,
    marginLeft: 12,
  },
  button: {
    backgroundColor: '#FF8C00',
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
    width: 300,
    alignSelf: 'center',
    height: 45,
  },
  textLogin: {
    fontSize: 15,
    color: 'white',
    alignSelf: 'center',
  },
  signUpContainer: {
    flexDirection: 'row',
    marginTop: 15,
    alignSelf: 'center',
  },
  signUpText: {
    color: 'blue',
  },
});

export default Signup;
