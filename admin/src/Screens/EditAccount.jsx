import React, { useContext, useState, useEffect, useLayoutEffect } from "react";
import { ScrollView, View, Text, TextInput, StyleSheet,Modal,Button,Alert } from "react-native";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native-gesture-handler";

const EditAccount = ({ navigation }) => {
  const { user, setUser } = useContext(AuthContext);
  const [updatedUser, setUpdatedUser] = useState([]);
  const [userNameUpdate, setUserNameUpdate] = useState('');
  const [regionUpdate, setRegionUpdate] = useState('');
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`/user/${user.userID}`);
        setUpdatedUser(response.data.datas);
        setUserNameUpdate(response.data.datas.userName);
        setRegionUpdate(response.data.datas.region);
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

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <MaterialCommunityIcons
  //         name="check"
  //         size={30}
  //         color="#2196f3"
  //         style={styles.checkIcon}
  //         onPress={handleUpdateProfile}
  //       />
  //     ),
  //   });
  // }, [navigation, handleUpdateProfile]);

  const handleInputChange = (field, value) => {
    setUpdatedUser((prev) => ({ ...prev, [field]: value }));
    setUserNameUpdate((prev) =>
      field === 'userName' ? value : prev
    );
    
    setRegionUpdate((prev) =>
      field === 'region' ? value : prev
    );

  };



  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put(`/user/${user.userID}`, {
        userName: userNameUpdate,
        region: regionUpdate,
      });
      setPosts([...posts, data?.post]);
      setLoading(false);
      showAlert("Notice!", "Update succsess! Press Confirm to go back.");
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin người dùng:", error);
    }
    
    console.log(user.userID)
    console.log(userNameUpdate)
    console.log(regionUpdate)
  };
  const handleConfirm = () => {
    setSuccessModalVisible(false);
    navigation.goBack();
  };
  const showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [
        {
          text: "Confirm",
        
          onPress: () => {
            navigation.goBack();
          },
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerTitle}>
        <Text style={styles.textBold}>Full name</Text>
        <TextInput
          style={styles.input}
          value={updatedUser.userName}
          onChangeText={(text) => handleInputChange("userName", text)}
        />

        <Text style={styles.textBold}>Email</Text>
        <TextInput
          style={styles.input}
          value={updatedUser.email}
    
          editable={false}
        />

        <Text style={styles.textBold}>Phone number</Text>
        <TextInput
          style={styles.input}
          value={updatedUser.phone}
          
          editable={false}
        />

        <Text style={styles.textBold}>Address</Text>
        <TextInput
          style={styles.input}
          value={updatedUser.region}
          onChangeText={(text) => handleInputChange("region", text)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
        <Text style={{alignSelf:'center',color:'white',fontWeight:'bold',fontSize:23,marginTop:10}}>UPDATE</Text>
      </TouchableOpacity>
   
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
  button: {
    backgroundColor: '#FF3333',
    width: 200,
    height: 50,
    borderRadius: 25,
    marginTop: 8,
    marginTop: 8,
    activeOpacity: 0.8,
    opacity: 0.8,
    alignSelf:'center'
  

},
});
export default EditAccount;