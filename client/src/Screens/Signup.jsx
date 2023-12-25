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
        source={{
          uri: "https://internet-israel.com/wp-content/uploads/2018/07/React_Native_Logo-768x403.png",
        }}
      />
      <Text style={styles.text}>Create New Account</Text>

      <View style={styles.inputContainer}>
        <Image
          style={styles.inputIcon}
          source={{
            uri: "https://tse4.explicit.bing.net/th?id=OIP.5ylLzBNwByczTaKBCAi9IgHaHa&pid=Api&P=0&h=220",
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter username"
          value={userName}
          onChangeText={setUserName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Image
          style={styles.inputIcon}
          source={{ uri: "https://your-phone-icon-url" }}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
        />
      </View>

      <View style={styles.inputContainer}>
        <Image
          style={styles.inputIcon}
          source={{
            uri: "https://clipground.com/images/email-icon-clipart-transparent-1.png",
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Image
          style={styles.inputIcon}
          source={{
            uri: "https://tse1.mm.bing.net/th?id=OIP.PO4tSlis-6R6EjopPKu0xQHaEH&pid=Api&P=0&h=220",
          }}
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
        <Image
          style={styles.inputIcon}
          source={{
            uri: "https://tse1.mm.bing.net/th.id=OIP.PO4tSlis-6R6EjopPKu0xQHaEH&pid=Api&P=0&h=220",
          }}
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
        <Image
          style={styles.inputIcon}
          source={{ uri: "https://your-region-icon-url" }}
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
  },
  inputContainer: {
    height: 50,
    width: 300,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    alignSelf: "center",
    borderRadius: 8,
    marginTop: 25,
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
    backgroundColor: "#FF8C00",
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
    color: "blue",
  },
  successMessage: {
    marginTop: 15,
    alignSelf: "center",
  },
});

export default Signup;
