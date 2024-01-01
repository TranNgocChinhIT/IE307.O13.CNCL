import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ToastAndroid,
  FlatList,
} from "react-native";
import React, { useEffect, useState, useContext, } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { TouchableOpacity } from "react-native-gesture-handler";

const { width: screenWidth } = Dimensions.get("window");

const TicketPending = ({ navigation }) => {
  const [userBookings, setUserBookings] = useState([]);
  const [error, setError] = useState(null);
  const [isFocused, setIsFocused] = useState(false); // Thêm state để theo dõi sự kiện focus
  const { user,logout } = useContext(AuthContext);
  const [seatNumbers, setSeatNumbers] = useState([]);


  const fetchUserBookings = async () => {
    try {
      const response = await axios.get(`/booking/user/${user.userID}`);
      const allUserBookings = response.data.datas;

      // Filter bookings with paymentStatus === "pending"
      const pendingBookings = allUserBookings.filter(
        (booking) => booking.paymentStatus === "pending"
      );
  
      setUserBookings(pendingBookings);
    } catch  {

      ToastAndroid.showWithGravity(
        "Please Login to view tickets.",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
    }
  };
  const renderSeatNumbers = async () => {
    try {
      const seatNumbersArray = [];

      for (const booking of userBookings) {
        const { movieScheduleRelationship, selectedSeats } = booking;
        const { _id: movieScheduleId } = movieScheduleRelationship;


        const response = await axios.get(`/movieSchedule/${movieScheduleId}`);
        const seatInfo = response.data.datas.seats;

        const seatNumbersTest = selectedSeats.map((selectedSeatId) => {
          for (const row of seatInfo) {
            const seat = row.find((seat) => seat._id === selectedSeatId);
            if (seat) {
              return seat.number;
            }
          }
          return "";
        });

        // Push the seat numbers array for the current booking to seatNumbersArray
        seatNumbersArray.push(seatNumbersTest);

      }
      setSeatNumbers(seatNumbersArray);
    } catch (error) {
      console.error("Error fetching seat information:", error);
      // Handle error appropriately
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setIsFocused(true); // Đặt giá trị isFocused là true khi có sự kiện focus
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const fetchData = async () => {
      setSeatNumbers([]);
      await fetchUserBookings();
      await renderSeatNumbers();
      setIsFocused(false);
    };

    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  
  const renderItem = ({ item, index }) => {


    return (
      <View style={styles.ticketItem}>
        <View style={{ flexDirection: "row" }}>
          <Image
            style={styles.image}
            source={{
              uri: item.movieScheduleRelationship.movie.imagePath,
            }}
          />
          <View style={{ flexDirection: "column", marginLeft: 10 }}>
            <Text style={{ fontWeight: "bold" }}>
              {item.movieScheduleRelationship.movie.title}
            </Text>
            <Text>
              {item.movieScheduleRelationship.schedule.screeningTime},{" "}
              {item.movieScheduleRelationship.schedule.screeningDate}
            </Text>
            <Text>Seats: {seatNumbers[index]?.join(", ") || "Loading..."}</Text>
            <Text>Number of Tickets: {item.numberOfTickets}</Text>
            <Text>Total Amount: {item.totalAmount}</Text>
            <Text>Payment Status: {item.paymentStatus}</Text>
          </View>
        </View>
      </View>
    );
  };
  if ( !user.userID) {
    return (
      <View style={styles.containerNoData}>

        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity style={styles.button2} onPress={logout}>
            <Text style={{ fontWeight: 'bold', color: 'white', marginTop: 6, fontSize: 18, alignSelf: 'center' }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  else {
  return (
    <View style={styles.container}>
      <FlatList
        data={userBookings}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal={false}
      />
    </View>
  );
}};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 10,
    marginTop: 10,
  },
  containerNoData: {
    flex: 1,
    justifyContent: 'center',
    alignContent:'center',
    backgroundColor: "#FFFFFF",
  },
  ticketItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  image: {
    width: 100,
    height: 150,
  },
  button: {
    backgroundColor: "#7f0d00",
    width: 100,
    height: 30,
    borderRadius: 10,
    marginTop: 8,
    activeOpacity: 0.8,
    opacity: 0.8,
  },
  button2: {

    backgroundColor: '#7f0d00',
    width: 100,
    height: 40,
    borderRadius: 18,
    marginTop: 8,
    margin:15,

    activeOpacity: 0.8,
    opacity: 0.8,
  },
  textButton: {
    color: "white",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 4,
    fontWeight: "bold",
  },
});

export default TicketPending;
