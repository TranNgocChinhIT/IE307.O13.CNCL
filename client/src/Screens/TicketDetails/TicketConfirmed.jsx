import { View, Text, StyleSheet, Image, Dimensions, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Casousel from 'react-native-snap-carousel';
const { width: screenWidth } = Dimensions.get('window')
const TicketConfirmed = () => {
  const [userBookings, setUserBookings] = useState([]);
  const [movieSchedules, setMovieSchedules] = useState([]);
  const [error, setError] = useState(null);
  const sliderWidth = screenWidth;
  const itemWidth = screenWidth * 0.67;
  const itemWidthHeader = screenWidth * 0.8;
  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const user = '6588ceb8b642502ef8f3d2d6';
        const response = await axios.get(`/booking/user/${user}`);
        setUserBookings(response.data.datas);
      } catch (error) {
        console.error("Error fetching user bookings:", error);
        setError(error.message || "An error occurred while fetching user bookings.");
      }
    };

    fetchUserBookings();
  }, []);
  const filteredBookings = userBookings.filter(item => item.paymentStatus === 'completed');
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
          <Text>

                                    Seats: {item?.selectedSeats.slice(0, 3).map((item, index, arr) => (
                                        <React.Fragment key={index}>
                                            {item}
                                            {index === arr.length - 1 ? '' : ', '}
                                        </React.Fragment>
                                    ))}
                                </Text>
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
    height: 100,
  },
});

export default TicketConfirmed;
