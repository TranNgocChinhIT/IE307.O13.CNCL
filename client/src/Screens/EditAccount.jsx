import React, { useContext, useState, useEffect, useLayoutEffect } from "react";
import { ScrollView, View, Text, TextInput, StyleSheet } from "react-native";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const EditAccount = ({ navigation }) => {
  const { user, setUser } = useContext(AuthContext);
  const [updatedUser, setUpdatedUser] = useState({
    userName: "",
    email: "",
    phone: "",
    region: "",
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`/user/${user.userID}`);
        setUpdatedUser(response.data.datas);
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết người dùng:", error);
      }
    };

    const unsubscribe = navigation.addListener("focus", () => {
      if (user.userID) {
        fetchUserDetails();
      }
    });

    return unsubscribe;
  }, [navigation, user.userID]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MaterialCommunityIcons
          name="check"
          size={30}
          color="#2196f3"
          style={styles.checkIcon}
          onPress={handleUpdateProfile}
        />
      ),
    });
  }, [navigation, handleUpdateProfile]);

  const handleInputChange = (field, value) => {
    setUpdatedUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put(`/user/${user.userID}`, updatedUser);
      setUpdatedUser(response.data.datas);
      navigation.goBack();
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin người dùng:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerTitle}>
        <Text style={styles.textBold}>Tên người dùng:</Text>
        <TextInput
          style={styles.input}
          value={updatedUser.userName}
          onChangeText={(text) => handleInputChange("userName", text)}
        />

        <Text style={styles.textBold}>Email:</Text>
        <TextInput
          style={styles.input}
          value={updatedUser.email}
          onChangeText={(text) => handleInputChange("email", text)}
        />

        <Text style={styles.textBold}>Số điện thoại:</Text>
        <TextInput
          style={styles.input}
          value={updatedUser.phone}
          onChangeText={(text) => handleInputChange("phone", text)}
        />

        <Text style={styles.textBold}>Khu vực:</Text>
        <TextInput
          style={styles.input}
          value={updatedUser.region}
          onChangeText={(text) => handleInputChange("region", text)}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  checkIcon: {
    marginRight: 20,
  },
  headerTitle: {
    flexDirection: "column",
  },
  textBold: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
  },
});

export default EditAccount;
