import { View, Text, StyleSheet, Image, Dimensions, FlatList } from 'react-native';
import React, { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import Casousel from 'react-native-snap-carousel';
import { AuthContext } from '../../context/AuthContext';
const { width: screenWidth } = Dimensions.get('window')
const TicketPending = () => {
  const [userBookings, setUserBookings] = useState([]);
  const [movieSchedules, setMovieSchedules] = useState([]);
  const [error, setError] = useState(null);
  const sliderWidth = screenWidth;
  const itemWidth = screenWidth * 0.67;
  const itemWidthHeader = screenWidth * 0.8;
  const { user, setUser } = useContext(AuthContext);

  const fetchUserBookings = async () => {
      try {
        const response = await axios.get(`/booking/user/${user.userID}`);
        setUserBookings(response.data.datas);
      } catch (error) {
        console.error("Error fetching user bookings:", error);
        setError(error.message || "An error occurred while fetching user bookings.");
      }
    };
  // thêm dòng addListener để mỗi khi qua màn đó thì sẽ get lại dữ liệu
  useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        fetchUserBookings();
      })
      return unsubscribe;
    }, [navigation]); 
  const filteredBookings = userBookings.filter(item => item.paymentStatus === 'pending');
  const renderItem = ({ item }) => (
    <View style={styles.ticketItem}>
      <View style={{ flexDirection: 'row' }}>
        <Image
          style={styles.image}
          source={{ uri: item.movieScheduleRelationship.movie.imagePath }}
        />
        <View style={{ flexDirection: 'column', marginLeft: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>{item.movieScheduleRelationship.movie.title}</Text>
          <Text >{item.movieScheduleRelationship.schedule.screeningTime}, {item.movieScheduleRelationship.schedule.screeningDate}</Text>
          {/* <Text>
  Seats: {item?.selectedSeats && (
    item.selectedSeats.slice(0, 3).map((selectedSeatId, index, arr) => {
      const matchingSeat = item.movieScheduleRelationship.seats.find(seat => seat._id === selectedSeatId);
      const seatNumber = matchingSeat ? matchingSeat.number : 'Unknown';

      return (
        <React.Fragment key={index}>
          {index > 0 && ', '}
          {seatNumber}
        </React.Fragment>
      );
    })
  )}
</Text> */}

          <Text>Number of Tickets: {item.numberOfTickets}</Text>
          <Text>Total Amount: {item.totalAmount}</Text>
          <Text>Payment Status: {item.paymentStatus}</Text>
        </View>
      </View>
    </View>
  );

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
  bookingContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
  },
  ticketItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  image: {
    width: 100,
    height: 150,
  },
});

export default TicketPending;
