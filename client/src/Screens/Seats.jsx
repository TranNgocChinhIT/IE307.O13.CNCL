import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Image, ToastAndroid, Animated } from 'react-native';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import axios from 'axios';

const Seats = ({ navigation, route }) => {
    const [movieScheduleID, setMovieScheduleID] = useState();
    const [seats, setSeats] = useState();
    const [seatsID, setSeatsID] = useState([]);
    const [price, setPrice] = useState(0);
    const { note } = route.params;
    const { schedule } = route.params;
    const [totalSeats, setTotalSeats] = useState(0);
    const [selectedSeatArray, setSelectedSeatArray] = useState([]);
    const [ticketData, setTicketData] = useState(route.params);
    const total = selectedSeatArray.length * 45.0;
    const [scale, setScale] = useState(1);
    const [twoDSeatArray, setTwoDSeatArray] = useState();
    const fetchData = async () => {
        try {
          const response = await axios.get('/movieSchedule');
          const data = response.data.datas;
          const filteredSchedules = data.filter(
            (movieSchedule) =>
              movieSchedule.movie._id === note._id && movieSchedule.schedule._id === schedule
          );
    
          if (filteredSchedules.length > 0) {
            const matchingMovieScheduleID = filteredSchedules[0]._id;
            setMovieScheduleID(matchingMovieScheduleID);
            const seatsResponse = await axios.get(`/movieSchedule/${matchingMovieScheduleID}`);
            const seatsData = seatsResponse.data.datas.seats;
            setSeats(seatsData)
            const sanitizedSeatsData = seatsData.map((row) => row.map(({ _id, ...rest }) => rest));
            setTwoDSeatArray(sanitizedSeatsData);   
          }
          setSelectedSeatArray([])
        } catch (error) {
          console.error('Something went wrong while getting Data', error);
        }
      };
    
      useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          fetchData();
        });
    
        // Unsubscribe when the component is unmounted
        return unsubscribe;
      }, [navigation]); 

      const selectSeat = (index, subindex, num) => {
        if (!twoDSeatArray[index][subindex].taken) {
            let array = [...selectedSeatArray];
            let temp = [...twoDSeatArray];
            temp[index][subindex].selected = !temp[index][subindex].selected;
    
            // Check if the seat number is already in the selectedSeatArray
            if (!array.includes(num)) {
                array.push(num);
            } else {
                // Remove the seat number from the array if already present
                const tempindex = array.indexOf(num);
                if (tempindex > -1) {
                    array.splice(tempindex, 1);
                }
            }
            // Extract _id for selected seats from the seats array
            const selectedSeatIds = array.map((seatNum) => {
                for (let row of seats) {
                    const seat = row.find((s) => s.number === seatNum);
                    if (seat) {
                        return seat._id;
                    }
                }
                return null;
            });

            // Remove null values (for unmatched seat numbers)
            const filteredSelectedSeatIds = selectedSeatIds.filter((id) => id !== null);
            setSeatsID(filteredSelectedSeatIds);
            setSelectedSeatArray(array);
            setPrice(array.length * 45.0);
            setTotalSeats(array.length * 1);
            setTwoDSeatArray(temp);
        }
    };
    

    if (ticketData !== route.params && route.params != undefined) {
        setTicketData(route.params);
    }
    const BookSeats = async () => {
        if (
            selectedSeatArray.length !== 0

        ) {
            
            navigation.navigate('PayScreens', {
                seatArray: selectedSeatArray,
                time: ticketData.time,
                date: ticketData.date,
                month: ticketData.month,
                year: ticketData.year,
                note: ticketData.note,
                total: total,
                quantity: totalSeats,
                ticketImage: route.params.PosterImage,
                selectedSeats: seatsID,
                movieScheduleID: movieScheduleID,

            });
        } else {
            ToastAndroid.showWithGravity(
                'Please Select Seats',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
        }
    };
    const translateY = new Animated.Value(100); // Initial translateY value


    const onPinchEvent = Animated.event([{ nativeEvent: { scale } }], {
        useNativeDriver: false,
    });
    const onPinchStateChange = (event) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            setScale(event.nativeEvent.scale);


            if (selectedSeatArray.length > 0) {
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: false,
                }).start();
            } else {

                Animated.timing(translateY, {
                    toValue: 100,
                    duration: 500,
                    useNativeDriver: false,
                }).start();
            }
        }
    };
    return (
        //     <PinchGestureHandler
        //   onGestureEvent={onPinchEvent}
        //   onHandlerStateChange={onPinchStateChange}
        // >
        //   <Animated.View style={{ flex: 1, transform: [{ scale }] }}>
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
                <ScrollView style={{ flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'column' }}>
                        <View style={styles.svgContainer}>
                            <Image
                                source={require("../assets/image/screen4.png")}
                                style={styles.screen}
                            />
                        </View>

                        <Text style={styles.screenText}>
                            SCREEN
                        </Text>

                        <View>
                            < View style={styles.seatContainer} >
                                <View style={styles.container2}>
                                    {twoDSeatArray?.map((item, index) => {
                                        return (
                                            <View key={index} style={styles.seatRow}>
                                                {item?.map((subitem, subindex) => {
                                                    return (
                                                        <TouchableOpacity
                                                            key={subitem.number}
                                                            onPress={() => {
                                                                selectSeat(index, subindex, subitem.number);
                                                            }}
                                                        >
                                                            <View style={[styles.square, subitem.taken ? { backgroundColor: 'white' } : {}, subitem.selected ? { backgroundColor: 'orange' } : {},]}>
                                                                <Text style={styles.txtSeat}>
                                                                    {subitem.number}

                                                                </Text>
                                                            </View>

                                                        </TouchableOpacity>
                                                    );
                                                })}
                                            </View>
                                        );
                                    })}
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20 }}>
                            <View style={styles.square1}>
                            </View>
                            <Text style={styles.noteSeats}>Empty seat </Text>
                            <View style={styles.square2}>
                            </View>
                            <Text style={styles.noteSeats}>Occupied</Text>
                            <View style={styles.square3}>
                            </View>
                            <Text style={styles.noteSeats}>Selected</Text>

                        </View>
                    </View>
                </ScrollView>
            </ScrollView >
            {selectedSeatArray.length > 0 && (
                <View style={{ backgroundColor: '#FFFAF0', flex: 0.12, borderRadius: 25, borderWidth: 1, borderColor: 'black' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'column', marginTop: 10, marginLeft: 10 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                                {note.title}
                            </Text>
                            <Text style={{ fontSize: 15 }}>
                                {price}.000 đ
                            </Text>
                            <Text style={{ fontSize: 15 }}>
                                {totalSeats} seats
                            </Text>
                        </View>

                        <TouchableOpacity style={styles.button} onPress={BookSeats}>
                            <Text style={styles.textButton}>
                                BOOK NOW
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

        </View>
        //     </Animated.View>
        // </PinchGestureHandler>
    )
};
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 0.88,
        backgroundColor: 'black',
        flexDirection: 'row',
    },
    seatRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
    },
    square: {
        width: 30,
        height: 30,
        backgroundColor: '#7f0d00',
    },
    seatContainer: {
        //flex: 0.1,
        marginVertical: 20,
    },
    container2: {
        gap: 20,
        marginHorizontal: 30,
    },
    svgContainer: {
        flexDirection: 'row',
        //  flex: 0.1,
        // alignContent: 'center',
        marginTop: 40,
        marginBottom: -15,
        justifyContent: 'center',

    },
    tt: {
        marginLeft: 110,
        marginBottom: 10,
        //alignContent: 'center',
        justifyContent: 'space-evenly',
    },
    screen: {
        width: 400,
        height: 200,
        marginLeft: 14,
        marginTop: 5,
        //tintColor: 'yellow',
    },
    screenText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 40,
        alignSelf: 'center',
    },
    txtSeat: {
        marginTop: 4,
        color: 'white',
        fontSize: 15,
        justifyContent: 'center',
        alignSelf: 'center',
        alignContent: 'center',
    },
    square1: {
        width: 30,
        height: 30,
        backgroundColor: '#7f0d00',
        marginHorizontal: 10,
    },
    square2: {
        width: 30,
        height: 30,
        backgroundColor: 'white',
        marginHorizontal: 10,
    },
    square3: {
        width: 30,
        height: 30,
        backgroundColor: 'orange',
        marginHorizontal: 10,
    },
    noteSeats: {
        color: 'brown',
        fontSize: 20,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#7f0d00',
        width: 130,
        height: 40,
        borderRadius: 25,
        marginRight: 20,
        marginTop: 20,
        justifyContent: 'flex-start',

    },
    textButton: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 7,
    }
});

export default Seats;