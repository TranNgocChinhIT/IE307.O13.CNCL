import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("dangkihoa@gmail.com");
  const [password, setPassword] = useState("123456789");
  const [showPassword, setShowPassword] = useState(false); // Thêm state để theo dõi trạng thái hiển thị mật khẩu
  const { login,setisAuthenticated } = useContext(AuthContext);

  const handleLogin = async (email, password) => {
    try {
      await login(email, password);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleOnPressSignup = () => {
    navigation.navigate("Signup");
  };
  const handleOnGoHome = () => {
    setisAuthenticated(true)
  };

  return (
    <View>
      <Image
        style={styles.imageStyle}
        source={require("../assets/image/login.jpg")}
      />
      <View>
        <Text style={styles.text}>DreamCiné</Text>
        <View style={styles.containerTextInput}>
          <MaterialIcons
            name="alternate-email"
            size={20}
            color="#666"
            style={styles.iconStyle}
          />
          <TextInput
            style={styles.textI}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.containerTextInput}>
          <Ionicons
            name="ios-lock-closed-outline"
            size={20}
            color="#666"
            style={styles.iconStyle}
          />
          <TextInput
            style={styles.textI}
            placeholder="Password"
            secureTextEntry={!showPassword}
            autoComplete="password"
            value={password}
            onChangeText={setPassword}
          />
          {/* Thêm nút con mắt */}
          <TouchableOpacity
            onPress={handleTogglePasswordVisibility}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showPassword ? "ios-eye" : "ios-eye-off"}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleLogin(email, password)}
        >
          <Text style={styles.textLogin}>Login</Text>
        </TouchableOpacity>

        <View style={styles.signUpContainer}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={handleOnPressSignup}>
            <Text style={styles.signUpText}>Sign up here.</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <TouchableOpacity  onPress={handleOnGoHome}>
          <Ionicons
            name="home"
            size={50}
            color="#7f0d00"
            style={styles.logoStyle}
          />
        </TouchableOpacity>
      </View>
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
    height: "37%",
    width: "100%",
    resizeMode: "cover",
  },
  text: {
    alignSelf: "center",
    marginTop: 50,
    fontSize: 25,
    fontWeight: "bold",
    color: "#7f0d00",
  },
  textInput: {
    height: 50,
    width: 300,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    alignSelf: "center",
    borderRadius: 8,
    marginTop: 25,
  },
  Forgot: {
    fontSize: 12,
    marginTop: 5,

    marginRight: 20,
    color: "#FF1493",
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
  textLogin: {
    fontSize: 15,
    color: "white",
    alignSelf: "center",
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  imageStyle2: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 10,
  },

  signUpContainer: {
    flexDirection: "row",
    marginTop: 15,
    alignSelf: "center",
  },
  signUpText: {
    color: "#7f0d00",
  },
  forgotContainer: {
    alignItems: "flex-end",
    marginRight: 25,
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  iconContainer: {
    padding: 10,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  textI: {
    justifyContent: "center",
    flex: 1,
    marginLeft: 10,
  },
  containerTextInput: {
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
  iconStyle: {
    width: 27,
    height: 27,
    marginTop: 11,
    marginLeft: 12,
  },
  logoStyle: {
    marginLeft: 5,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 15,
  },
});
export default Login;
