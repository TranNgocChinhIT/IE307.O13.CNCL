import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";

const Signup = () => {
  const navigation = useNavigation();

  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [region, setRegion] = useState("");
  const [isSignUpSuccess, setSignUpSuccess] = useState(false);

  const handleSignup = async () => {
    try {
      const response = await axios.post("/auth/signup", {
        userName,
        phone,
        email,
        password,
        confirmPassword,
        region,
      });

      if (response.status === 200) {
        setSignUpSuccess(true);
        Alert.alert("Success", "Registration successful");
      } else {
        Alert.alert("Error", response.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    }
  };

  const handleOnPressLogin = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.imageStyle}
        source={require("../assets/image/login.jpg")}
      />
      <Text style={styles.text}>Account Signup</Text>

      <View style={styles.inputContainer}>
        <Ionicons
          name="person-outline"
          size={20}
          color="#666"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter username"
          value={userName}
          onChangeText={setUserName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons
          name="call-outline"
          size={20}
          color="#666"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons
          name="mail-outline"
          size={20}
          color="#666"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons
          name="lock-closed-outline"
          size={20}
          color="#666"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons
          name="lock-closed-outline"
          size={20}
          color="#666"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons
          name="location-outline"
          size={20}
          color="#666"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Region"
          value={region}
          onChangeText={setRegion}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>CREATE</Text>
      </TouchableOpacity>

      <View style={styles.signInContainer}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={handleOnPressLogin}>
          <Text style={styles.signInText}>Login now!</Text>
        </TouchableOpacity>
      </View>

      {isSignUpSuccess && (
        <View style={styles.successMessage}>
          <Text style={{ color: "green" }}>Registration successful!</Text>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    width: 80,
    height: 80,
    borderRadius: 100,
    alignSelf: "center",
    marginTop: 120,
  },
  text: {
    alignSelf: "center",
    marginTop: 20,
    fontSize: 25,
    fontWeight: "bold",
    color:"#7f0d00",
  },
  inputContainer: {
    height: 50,
    width: 300,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    alignSelf: "center",
    borderRadius: 8,
    marginTop: 20,
    flexDirection: "row",
  },
  inputIcon: {
    width: 27,
    height: 27,
    marginTop: 11,
    marginLeft: 12,
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#7f0d00",
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
    width: 300,
    alignSelf: "center",
    height: 45,
  },
  buttonText: {
    fontSize: 15,
    color: "white",
    alignSelf: "center",
  },
  signInContainer: {
    flexDirection: "row",
    marginTop: 15,
    alignSelf: "center",
  },
  signInText: {
    color: "#7f0d00",
  },
  successMessage: {
    marginTop: 15,
    alignSelf: "center",
  },
});

export default Signup;
