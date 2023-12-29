import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { TouchableOpacity } from "react-native-gesture-handler";

const { width: screenWidth } = Dimensions.get("window");

const TicketConfirmed = ({ navigation }) => {
  const [userBookings, setUserBookings] = useState([]);
  const [error, setError] = useState(null);
  const [isFocused, setIsFocused] = useState(false); // Thêm state để theo dõi sự kiện focus
  const { user } = useContext(AuthContext);
  const [seatNumbers, setSeatNumbers] = useState([]);
  const numRef = useRef(0);

  const fetchUserBookings = async () => {
    try {
      const response = await axios.get(`/booking/user/${user.userID}`);
      setUserBookings(response.data.datas);
    } catch (error) {
      console.error("Error fetching user bookings:", error);
      setError(
        error.message || "An error occurred while fetching user bookings."
      );
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setIsFocused(true); // Đặt giá trị isFocused là true khi có sự kiện focus
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (isFocused) {
      fetchUserBookings();
      setIsFocused(false); // Đặt lại giá trị isFocused là false sau khi xử lý sự kiện
    }
  }, [isFocused]);

  const filteredBookings = userBookings.filter(
    (item) => item.paymentStatus === "completed"
  );

  const renderItem = ({ item, index }) => {
    const renderSeatNumbers = async (movieScheduleId, selectedSeats) => {
      try {
        const response = await axios.get(`/movieSchedule/${movieScheduleId}`);
        const seatInfo = response.data.datas.seats;

        const seatNumbers = selectedSeats.map((selectedSeatId) => {
          for (const row of seatInfo) {
            const seat = row.find(
              (seat) => seat._id === selectedSeatId
            );
            if (seat) {
              return seat.number;
            }
          }
          return "";
        });

        setSeatNumbers((prevSeatNumbers) => {
          const newSeatNumbers = [...prevSeatNumbers];
          newSeatNumbers[index] = seatNumbers.join(", ");
          return newSeatNumbers;
        });
      } catch (error) {
        console.error("Error fetching seat information:", error);
        return "";
      }
    };

    const fetchSeatNumbers = async () => {
      await renderSeatNumbers(
        item.movieScheduleRelationship._id,
        item.selectedSeats
      );
    };

    if (numRef.current < filteredBookings.length) {
      fetchSeatNumbers();
      numRef.current += 1;
    }

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
            <Text>Seats: {seatNumbers[index]}</Text>
            <Text>Number of Tickets: {item.numberOfTickets}</Text>
            <Text>Total Amount: {item.totalAmount}</Text>
            <Text>Payment Status: {item.paymentStatus}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate("Reviews", { note: item })
              }
            >
              <Text style={styles.textButton}>Reviews</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredBookings}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 10,
    marginTop: 10,
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
  textButton: {
    color: "white",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 4,
    fontWeight: "bold",
  },
});

export default TicketConfirmed;
