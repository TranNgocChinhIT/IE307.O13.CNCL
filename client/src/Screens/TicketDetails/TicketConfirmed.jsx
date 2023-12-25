import { View, Text, StyleSheet, Image, Dimensions, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Casousel from 'react-native-snap-carousel';
import { TouchableOpacity } from 'react-native-gesture-handler';
const { width: screenWidth } = Dimensions.get('window')
const TicketConfirmed = ({ navigation }) => {
  const [userBookings, setUserBookings] = useState([]);
  const [movieSchedules, setMovieSchedules] = useState([]);
  const [error, setError] = useState(null);
  const sliderWidth = screenWidth;
  const itemWidth = screenWidth * 0.67;
  const itemWidthHeader = screenWidth * 0.8;
  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const user = '658737f3c077263ab5db1b08';
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
          <TouchableOpacity style={styles.button} 
          onPress={() => navigation.navigate('Reviews', { note: item })}>
            <Text style={styles.textButton}>Reviews</Text>

          </TouchableOpacity>
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
  button: {

    backgroundColor: '#FF3333',
    width: 100,
    height: 30,
    borderRadius: 10,
    marginTop: 8,
    marginTop: 8,
    activeOpacity: 0.8,
    opacity: 0.8,
  },
  textButton: {
    color: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 4,
    fontWeight: 'bold',
  },
});

export default TicketConfirmed;
