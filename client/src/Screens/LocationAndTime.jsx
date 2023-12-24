import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList, ToastAndroid, } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const timeArray = [
    '10:30',
    '12:30',
    '14:30',
    '15:00',
    '19:30',
    '21:00',
];
const generateDate = () => {
    const date = new Date();
    let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let weekdays = [];
    for (let i = 0; i < 7; i++) {
        let tempDate = {
            date: new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDate(),
            day: weekday[new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDay()],
        };
        weekdays.push(tempDate);
    }
    console.log(weekdays);
    return weekdays;
};
const updateMonthAndYear = (newDate) => {
    setCurrentMonth(newDate.getMonth() + 1);
    setCurrentYear(newDate.getFullYear());
};
const formatDate = (day, month, year) => {
    const selectedDate = new Date(year, month - 1, day);

    const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][selectedDate.getDay()];
    const date = selectedDate.getDate();
    const monthName = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ][selectedDate.getMonth()];
    const yearNumber = selectedDate.getFullYear();

    return `${dayOfWeek}, ${date} ${monthName} ${yearNumber}`;
};
const CINEMA_DATA = [
    { id: 1, name: 'Rạp 1', address: '123 Nguyễn Tri Phương, Quận 3, Thành phố Hồ Chí Minh' },

];
const LocationAndTime = ({ navigation, route }) => {
    const [dateArray, setDateArray] = useState(generateDate());
    const [selectedTimeIndex, setSelectedTimeIndex] = useState();
    const [selectedDateIndex, setSelectedDateIndex] = useState();
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [selectedCinema, setSelectedCinema] = useState();
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [ticketData, setTicketData] = useState(route.params);
    const [selectedCinemaTimings, setSelectedCinemaTimings] = useState([]);
    const { note } = route.params;
    const selectedDate = selectedDateIndex !== undefined ? dateArray[selectedDateIndex] : null;

    const [showTimings, setShowTimings] = useState(false);
    const getTimingsForCinema = (cinema) => {
        const cinemaTimingsMap = {
            'Rạp 1': ['10:30', '14:30', '19:30'],
        };
    
        const timings = cinemaTimingsMap[cinema] || [];
        console.log('Selected Cinema:', cinema);
        console.log('Selected Timings:', timings);
        return timings;
    };
    

    const handleBarClick = (cinema) => {
        if (selectedCinema === cinema) {
            // If the same cinema is clicked again, toggle the timings visibility
            setShowTimings(!showTimings);
        } else {
            // If a different cinema is clicked, update the selected cinema and show timings
            setSelectedCinema(cinema);
            setSelectedCinemaTimings(getTimingsForCinema(cinema)); // Thêm hàm getTimingsForCinema để lấy giờ của rạp
            setShowTimings(true);
        }
    };
    const BookSeats = async () => {
        if (
          //selectedSeatArray.length !== 0 &&
          timeArray[selectedTimeIndex] !== undefined &&
          dateArray[selectedDateIndex] !== undefined
        ) {
          try {
            await SecureStore.setItemAsync(
              'ticket',
              JSON.stringify({
                // seatArray: selectedSeatArray,
                time: timeArray[selectedTimeIndex],
                date: dateArray[selectedDateIndex],
                month: selectedMonth,
                year: selectedYear,
                note:note,
                ticketImage: route.params.PosterImage,
              })
            );
          } catch (error) {
            console.error('Something went Wrong while storing in BookSeats Functions', error);
          }
          navigation.navigate('Seats', {
            // seatArray: selectedSeatArray,
            time: timeArray[selectedTimeIndex],
            date: dateArray[selectedDateIndex],
            month: selectedMonth,
            year: selectedYear,
            note:note,
            ticketImage: route.params.PosterImage,
            
          });
        } else {
          ToastAndroid.showWithGravity(
            'Please Select Date and Time of the Show',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
        }
      };
      

    return (
        <View style={styles.container}>
            <View style={{ flex: 0.9 }}>
                <View style={{ flex: 0.3 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.chooseText}>
                            Choose Date
                        </Text>
                    </View>
                    <FlatList
                        data={dateArray}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        bounces={false}
                        contentContainerStyle={styles.margin}
                        renderItem={({ item, index }) => {
                            return (
                                <View>
                                    <TouchableOpacity onPress={() => setSelectedDateIndex(index)}>
                                        <View
                                            style={[
                                                styles.dateContainer,
                                                index === 0
                                                    ? { marginLeft: 24 }
                                                    : index === dateArray.length - 1
                                                        ? { marginRight: 24 }
                                                        : {},
                                                index === selectedDateIndex
                                                    ? { backgroundColor: 'orange' }
                                                    : {},
                                            ]}>
                                            <Text style={styles.dayText}>{item.day}</Text>
                                            <Text style={styles.dateText}>{item.date}</Text>
                                        </View>
                                    </TouchableOpacity>

                                </View>
                            );

                        }}
                    />
                </View>
                <View style={styles.pickDateContainer}>
            
                    <Text style={styles.pickDate}>
                        {selectedDate ? formatDate(selectedDate.date, currentMonth, currentYear) : ''}
                    </Text>
                </View>
                
                <View style={styles.separator}></View>
                <View style={styles.pickTime}>
                    <FlatList
                        data={CINEMA_DATA}
                        keyExtractor={(item, index) => index.toString()}
                        bounces={false}
                        contentContainerStyle={styles.margin}
                        renderItem={({ item, index }) => {
                            return (
                                <View>
                                    <TouchableOpacity onPress={() => handleBarClick(index)}>
                                        <View
                                            style={[
                                                styles.timeContainer,

                                                index === selectedCinema
                                                    ? { backgroundColor: '#CC0000' }
                                                    : {},
                                            ]}>
                                            <Text style={styles.nameText}>Rạp Dĩ An</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <Text style={styles.addressText}>{item.address}</Text>
                                    {showTimings && (
                                        <View style={styles.timingsContainer}>

                                        <FlatList
                                            data={timeArray}
                                            keyExtractor={(item) => item}
                                            horizontal
                                            bounces={false}
                                            contentContainerStyle={styles.margin}
                                            renderItem={({ item, index }) => {
                                                return (
                                                    <TouchableOpacity onPress={() => setSelectedTimeIndex(index)}>
                                                        <View
                                                            style={[
                                                                styles.timeContainer2,
                                                                index === 0 ? { marginLeft: 24 } : index === dateArray.length - 1 ? { marginRight: 24 } : {},
                                                                index === selectedTimeIndex ? { backgroundColor: 'orange' } : {},
                                                            ]}
                                                        >
                                                            <Text style={styles.timeText}>{item}</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                );
                                            }}
                                        />
                                    </View>
                                    )}

                                </View>
                            );

                        }}
                    />

                </View>
        
            </View>
            <View style={{ backgroundColor: '#FFFAF0', flex: 0.1, borderRadius: 35, borderWidth: 1, borderColor: 'black' }}>

                <View style={{ flexDirection: 'column', alignSelf: 'center', justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'column',alignItems:'center' }}>
                        <Text style={styles.inforDate}>
                            {timeArray[selectedTimeIndex]}  {selectedDate ? formatDate(selectedDate.date, currentMonth, currentYear) : ''}
                        </Text>

                    </View>

                    <TouchableOpacity style={styles.button}
                        onPress={BookSeats}
                    >
                        <Text style={styles.textButton}>
                            NEXT
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>



        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: 'black',
        flexDirection: 'column',

    },
    dateContainer: {
        width: 70,
        height: 100,
        borderRadius: 10,
        marginTop: 10,
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
    },
    timeContainer: {
        width: 370,
        height: 40,
        borderRadius: 5,
        marginTop: 10,
        backgroundColor: '#FF6666',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    text: {
        color: 'white',
    },
    dateText: {

        fontSize: 24,
        color: 'white',
    },
    dayText: {

        fontSize: 12,
        color: 'white',
    },
    margin: {
        gap: 24
    },
    chooseText: {

        marginTop: 40,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pickDateContainer: {
        alignItems: 'center',

        marginTop: 10,
    },
    pickDate: {
        color: 'white',
        fontSize: 18,
    },
    inforDate: {

        fontSize: 18,
    },
    separator: {
        borderBottomWidth: 1,
        width: 340,
        alignSelf: 'center',
        borderBottomColor: 'white',
        marginTop: 15,

    },
    pickTime: {
        alignItems: 'center',
        flex: 0.4,
        marginTop: 10,
    },
    bar: {
        backgroundColor: '#FF3333',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 10,
        marginTop: 20,
        width: 360,

    },
    barText: {
        color: 'white',
        fontSize: 18,
    },
    timingsContainer: {
        marginTop: 10,
        flexDirection: 'row',
        marginHorizontal: 10,
    },
    time: {
        color: 'white',
    },
    timeContainer2: {
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: 'white',
        paddingHorizontal: 20,
        borderRadius: 25,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    timeText: {
        color: 'white',
    },
    button: {
        backgroundColor: '#FF3333',
        width: 300,
        height: 40,
        borderRadius: 25,
        // marginLeft:70,
        marginTop: 5,
        alignSelf: 'center',
        justifyContent:'center'

    },
    textButton: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 4,
    },
    nameText: {
        color: 'white',
        fontWeight: 'bold',
        justifyContent: 'center',
        marginLeft: 10,
        marginTop: 8,
    },
    addressText: {
        color: 'white',
        fontSize: 16,
        marginHorizontal: 10,
    }

});
export default LocationAndTime