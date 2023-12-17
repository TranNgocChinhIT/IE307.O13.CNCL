import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';


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
    { id: 2, name: 'Rạp 2', address: '456 Lê Lợi, Quận 10, Thành phố Hồ Chí Minh' },
];
const LocationAndTime = ({navigation}) => {
    const [dateArray, setDateArray] = useState(generateDate());
    const [selectedTimeIndex, setSelectedTimeIndex] = useState();
    const [selectedDateIndex, setSelectedDateIndex] = useState();
    const selectedDate = selectedDateIndex !== undefined ? dateArray[selectedDateIndex] : null;
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [selectedCinema, setSelectedCinema] = useState(null);

    const route = useRoute();
    const { note } = route.params;
    const [showTimings, setShowTimings] = useState(false);
    const handleBarClick = (cinema) => {
        if (selectedCinema === cinema) {
            // If the same cinema is clicked again, toggle the timings visibility
            setShowTimings(!showTimings);
        } else {
            // If a different cinema is clicked, update the selected cinema and show timings
            setSelectedCinema(cinema);
            setShowTimings(false);
        }
    };
    return (
        <View style={styles.container}>
            <View style={{ flex: 0.9 }}>
                <View style={{ flex: 0.25 }}>
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
                    <View>
                        <TouchableOpacity onPress={() => handleBarClick(CINEMA_DATA[0])}>
                            <View style={styles.bar}>
                                <Text style={styles.barText}>{CINEMA_DATA[0].name}</Text>

                            </View>
                        </TouchableOpacity>
                        <View style={{ marginHorizontal: 10 }}>
                            <Text style={{ color: 'white',marginTop:8, }}>{CINEMA_DATA[0].address}</Text>
                        </View>

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
                                                        styles.timeContainer,
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

                </View>
            </View>
            <View style={{ backgroundColor: 'white', flex: 0.1, borderRadius: 35, borderWidth: 1, borderColor: 'black' }}>

                <View style={{ flexDirection: 'column',alignSelf:'center',justifyContent:'center' }}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.inforDate}>
                            {selectedDate ? formatDate(selectedDate.date, currentMonth, currentYear) : ''}
                        </Text>
                    
                    </View>

                    <TouchableOpacity style={styles.button}
                    onPress={() => navigation.navigate('Seats', { note })}
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
       // color: 'white',
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
        // justifyContent: 'center',
        flex: 0.1,
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
        marginHorizontal:10,
    },
    time: {
        color: 'white',
    },
    timeContainer: {
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
    button:{
        backgroundColor: '#FF3333',
        width: 80,
        height: 30,
        borderRadius:25,
      // marginLeft:70,
        marginTop:10,
        alignSelf:'center'
      
    },
    textButton:{
        fontWeight:'bold',
        fontSize:16,
        color:'white',
        justifyContent:'center',
        alignSelf:'center',
        marginTop:4,
    }

});
export default LocationAndTime