import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState, FlatList } from 'react';
import axios from 'axios';

const TicketPending = () => {
  // const [bookings, setBookings] = useState([]);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchBookings = async () => {
  //     try {
  //       const response = await axios.get('/booking'); // Replace with your actual API URL
  //       setBookings(response.data.datas);
  //     } catch (error) {
  //       console.error('Error fetching bookings:', error);
  //       setError(error.message || 'An error occurred while fetching bookings.');
  //     }
  //   };

  //   fetchBookings();
  // }, []);

  // if (error) {
  //   return (
  //     <View>
  //       <Text>Error: {error}</Text>
  //     </View>
  //   );
  // }

  // if (!bookings || bookings.length === 0) {
  //   return (
  //     <View>
  //       <Text>No bookings found for this user.</Text>
  //     </View>
  //   );
  // }
  const [userBookings, setUserBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        // Đặt userId là id của người dùng bạn muốn lấy danh sách đặt vé
        const user = '658295aeb31ceea07b228b6f';

        const response = await axios.get(`/booking/user/${user}`);

        setUserBookings(response.data.datas);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách đặt vé:", error);
        setError(error.message || "Có lỗi xảy ra khi lấy danh sách đặt vé.");
      }
    };

    fetchUserBookings();
  }, []);
  return (
    <View style={styles.container}>
      {userBookings.map(booking => (
        <View key={booking._id} style={styles.bookingContainer}>
        <View style={styles.ticketItem}>
          <View style={{ flexDirection: 'row' }}>

            {/* <Image style={styles.image} source={{ uri: item.note.imagePath }}>

            </Image> */}
            <View style={{ flexDirection: 'column', marginLeft: 10, }}>
              {/* <Text style={{ fontWeight: 'bold' }}>{item.note.title}</Text> */}
              <Text>Number of Tickets: {booking.numberOfTickets}</Text>
          <Text>Total Amount: {booking.totalAmount}</Text>
          <Text>Payment Status: {booking.paymentStatus}</Text>

              {/* <Text>

                Seats: {item?.seatArray.slice(0, 3).map((item, index, arr) => (
                  <React.Fragment key={index}>
                    {item}
                    {index === arr.length - 1 ? '' : ', '}
                  </React.Fragment>
                ))}
              </Text> */}
            </View>
          </View>
        </View>
        </View>
      ))}

    </View>
  )
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
  productList: {
    // Add styles for FlatList if needed
  },
  ticketItem: {
    // Add styles for each ticket item if needed
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

export default TicketPending;
