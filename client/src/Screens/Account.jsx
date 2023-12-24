import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/Ionicons";
import { AuthContext } from "../navigators/AuthContext";

const Account = ({ navigation }) => {
  const { userID, logout, userUpdate, setUserUpdate } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnPressLogout = () => {
    logout();
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get("http://192.168.76.98:8000/api/user/658737f3c077263ab5db1b08");
        setUserData(response.data.datas); // Assuming the user data is in response.data.datas
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          <View style={styles.headerTitle}>
            <Image
              source={{
                uri: "https://internet-israel.com/wp-content/uploads/2018/07/React_Native_Logo-768x403.png",
              }}
              style={styles.imageStyle}
            />
            <Text style={styles.textBoldHeader}></Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("EditAccount", { initialUserData: userData })
            }
          >
            <Icon
              name="enter-outline"
              size={30}
              color={"#2196f3"}
              style={styles.headerIcon}
            />
          </TouchableOpacity>
        </View>
            <Text style={styles.textBold}>Name:</Text>
            <Text style={styles.textStyle}>{userData?.userName}</Text>
            <Text style={styles.textBold}>Email:</Text>
            <Text style={styles.textStyle}>{userData?.email}</Text>
            <Text style={styles.textBold}>Phone:</Text>
            <Text style={styles.textStyle}>{userData?.phone}</Text>
            <Text style={styles.textBold}>Address:</Text>
            <Text style={styles.textStyle}>{userData?.region}</Text>
    
      </View>
      <Button title="Logout" onPress={handleOnPressLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "50%",
  },
  container: {
    flex: 1,
    margin: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle:{
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    marginLeft: 30,
  },
  imageStyle: {
    width: 80,
    height: 80,
    borderRadius: 100,
    margin: 5,
  },
  textStyle: {
    fontSize: 16,
    color: "#333",
    margin: 10,
  },
  textBold: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  textBoldHeader: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#333",
    alignItems: "center",
    marginLeft: 30,
  },
});

export default Account;
