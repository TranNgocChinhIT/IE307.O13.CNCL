import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button, Image, StyleSheet, TouchableOpacity, ProgressBarAndroid, ProgressBarIOS, Platform } from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/Ionicons";
import { AuthContext } from "../context/AuthContext";
import { StatusBar } from 'expo-status-bar';
import Slider from '@react-native-community/slider';

const Account = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [totalAmount, setTotalAmount] = useState(4000000);
  const [customerAmount, setCustomerAmount] = useState(2000000);

  // useEffect(() => {

  //   const fetchDataFromDatabase = async () => {
  //     const result = await fetchCustomerAmount(); 
  //     setCustomerAmount(result);
  //   };

  //   fetchDataFromDatabase();
  // }, []);

  const calculateProgress = () => {

    return customerAmount / totalAmount;
  };
  const renderProgressBar = () => {
    const progressValue = calculateProgress();

    if (Platform.OS === 'android') {
      return <View style={{ transform: [{ scaleY: 4.5 }], overflow: 'hidden' }}>
        <ProgressBarAndroid
          styleAttr="Horizontal"
          indeterminate={false}
          progress={progressValue}

          style={{ borderRadius: 100, color: "#CDB79E" }}
        />
      </View>;
    } else if (Platform.OS === 'ios') {
      return <ProgressBarIOS progress={progressValue}

        style={{ height: 40, transform: [{ scaleY: 4.5 }], color: "#FF3333" }}
      />;
    } else {
      return (
        <View style={{ height: 40, transform: [{ scaleY: 4.5 }] }}>
        </View>
      );
    }
  };
  const handleAddExpense = () => {

    setCurrentExpenses(currentExpenses + 50);
  };
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`/user/${user.userID}`);
      setUserData(response.data.datas);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {

    const unsubscribe = navigation.addListener('focus', () => {
      fetchUserData();
    });

    return unsubscribe;
  }, [navigation]);
  if (!user.userID) {
    return (
      <View style={styles.containerNoData}>
        <View style={styles.headerTitle}>
          <Image
            source={require("../assets/image/cgv.png")}
            style={styles.imageStyle}

          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity style={styles.button} onPress={logout}>
            <Text style={{ fontWeight: 'bold', color: 'white', marginTop: 6, fontSize: 18, alignSelf: 'center' }}>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Signup')}>
            <Text style={{ fontWeight: 'bold', color: 'white', marginTop: 6, fontSize: 18, alignSelf: 'center' }}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  else {
    return (
      <View style={styles.container}>

        {userData && (
          <>
            <View style={styles.container}>
              <View style={styles.headerTitle}>
                <Image
                  source={require("../assets/image/cgv.png")}
                  style={styles.imageStyle}

                />

                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{userData.userName}</Text>
                <View style={{ flexDirection: 'row', }}>
                  <Text style={{ color: "#FF3333" }}>Card Number : </Text>
                  <Text >{userData._id}</Text>
                </View>

                <View>

                  <StatusBar
                    backgroundColor="white"
                    barStyle="light-content"
                  />

                </View>
              </View>
              <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'center' }}>
                <Text style={{ color: "#FF3333" }}>Total Spending : </Text>
                <Text >{customerAmount} đ</Text>
              </View>
              <Image
                source={require("../assets/image/vip.png")}
                style={styles.imageVip}

              />
              <View style={{ width: 360, alignSelf: 'center', height: 40, borderRadius: 100, marginTop: 10, }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                </View>
                {renderProgressBar()}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                  <Text style={{ fontSize: 11 }}>0.000.000</Text>
                  <Text style={{ fontSize: 11 }}>2.000.000</Text>
                  <Text style={{ fontSize: 11 }}>4.000.000</Text>
                </View>
              </View>

              <View style={{ marginTop: 20 }}>
                <TouchableOpacity onPress={() => navigation.navigate('EditAccount')}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image
                        source={require("../assets/image/Account.png")}
                        style={styles.imageIcon}

                      />
                      <Text style={{ justifyContent: 'flex-start', marginLeft: 5 }}>
                        Account Information
                      </Text>
                    </View>

                    <Image
                      source={require("../assets/image/next.png")}
                      style={styles.imageNext}

                    />
                  </View>
                </TouchableOpacity>
                <View style={styles.separator}></View>
                <TouchableOpacity onPress={() => navigation.navigate('Pending Confirmation Ticket')}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image
                        source={require("../assets/image/expired.png")}
                        style={styles.imageIcon}

                      />
                      <Text style={{ justifyContent: 'flex-start', marginLeft: 5 }}>
                        Pending Confirmation Ticket
                      </Text>
                    </View>

                    <Image
                      source={require("../assets/image/next.png")}
                      style={styles.imageNext}

                    />
                  </View>
                </TouchableOpacity>
                <View style={styles.separator}></View>
                <TouchableOpacity onPress={() => navigation.navigate('Booked Ticket')}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image
                        source={require("../assets/image/ticket5.png")}
                        style={styles.imageIcon}

                      />
                      <Text style={{ justifyContent: 'flex-start', marginLeft: 5 }}>
                        Booked Ticket
                      </Text>
                    </View>

                    <Image
                      source={require("../assets/image/next.png")}
                      style={styles.imageNext}

                    />
                  </View>
                </TouchableOpacity>
                <View style={styles.separator}></View>

                <TouchableOpacity onPress={logout}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image
                        source={require("../assets/image/feedback2.png")}
                        style={styles.imageIcon}

                      />
                      <Text style={{ justifyContent: 'flex-start', marginLeft: 5 }}>
                        My Reviews
                      </Text>
                    </View>

                    <Image
                      source={require("../assets/image/next.png")}
                      style={styles.imageNext}

                    />
                  </View>
                </TouchableOpacity>
                
                <View style={styles.separator}></View>
                <TouchableOpacity onPress={() => navigation.navigate('Movie Theater Information')}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image
                        source={require("../assets/image/info.png")}
                        style={styles.imageIcon}

                      />
                      <Text style={{ justifyContent: 'flex-start', marginLeft: 5 }}>
                        Theater
                      </Text>
                    </View>

                    <Image
                      source={require("../assets/image/next.png")}
                      style={styles.imageNext}

                    />
                  </View>
                </TouchableOpacity>

                <View style={styles.separator}></View>
                <TouchableOpacity onPress={logout}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image
                        source={require("../assets/image/logout.png")}
                        style={styles.imageIcon}

                      />
                      <Text style={{ justifyContent: 'flex-start', marginLeft: 5 }}>
                        Log Out
                      </Text>
                    </View>

                    <Image
                      source={require("../assets/image/next.png")}
                      style={styles.imageNext}
                    />
                  </View>
                </TouchableOpacity>
                <View style={styles.separator}></View>
              </View>

            </View>


          </>


        )}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#FFFFFF",
  },
  containerNoData: {
    flex: 1,

    justifyContent: 'center',
    alignContent:'center',
    backgroundColor: "#FFFFFF",
  },
  header: {

    alignItems: "center",
    marginTop: 20,
  },
  headerTitle: {

    marginTop: 40,
    alignSelf: 'center',
    alignItems: 'center',
  },
  headerIcon: {
    marginLeft: 30,
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 0,
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
  imageIcon: {
    width: 30,
    height: 30,

    tintColor: "#FF3333",
    margin: 5,
  },
  imageNext: {
    width: 30,
    height: 30,

    margin: 5,
  },
  separator: {
    borderBottomColor: '#808080',
    borderBottomWidth: 0.55,
    marginTop: 10,
    width: 390,
    alignSelf: 'center',
  },
  imageVip: {
    width: 30,
    height: 30,
    alignSelf: 'center',

  },
  button: {

    backgroundColor: '#7f0d00',
    width: 100,
    height: 40,
    borderRadius: 18,
    marginTop: 8,
    margin:15,

    activeOpacity: 0.8,
    opacity: 0.8,
  },
});

export default Account;