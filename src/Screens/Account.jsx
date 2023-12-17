import { View, Text, StyleSheet, Button } from 'react-native';
import React, { useContext } from 'react';
import {AuthContext} from '../navigators/AuthContext';

const Account = () => {
  const {setisAuthenticated} = useContext(AuthContext);
  const handleLogout = () => {
    setisAuthenticated(false);
    console.log('Login!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.screenText}>Profile Screen</Text>
      <Button
        title="Đăng Nhập"
        onPress={handleLogout}
        containerStyle={styles.buttonContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenText: {
    color: '#000',
  },
  buttonContainer: {
    // Your button container styles here
  },
});

export default Account;
