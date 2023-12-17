
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
const LocationAndTime = () => {
    const [dateArray, setDateArray] = useState(generateDate());
    const [selectedTimeIndex, setSelectedTimeIndex] = useState();
    const [selectedDateIndex, setSelectedDateIndex] = useState();
    const selectedDate = selectedDateIndex !== undefined ? dateArray[selectedDateIndex] : null;
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    return (
        <View style={styles.container}>
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
            <View style={styles.pickDateContainer}>
                <Text style={styles.pickDate}>
                {selectedDate ? formatDate(selectedDate.date, currentMonth, currentYear) : ''}
                </Text>
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
        // marginLeft:25,
    },
    pickDateContainer: {
        alignItems: 'center',
        // justifyContent: 'center',
        //  flex: 1,
        marginTop: 10,
    },
    pickDate: {
        color: 'white',
        fontSize: 18,
    },
    separator: {
        borderBottomWidth: 1,
        width:340,
        alignSelf:'center',
        borderBottomColor: 'white', 
        marginTop:15,
      
      },

});
export default LocationAndTime