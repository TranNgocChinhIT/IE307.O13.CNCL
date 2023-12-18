import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Image, ToastAndroid, } from 'react-native';

import * as SecureStore from 'expo-secure-store';
const generateSeats = () => {
    let numRow = 8;
    let numColumn = 12;
    let rowArray = [];
    let start = 1;
    let reachnine = false;

    for (let i = 0; i < numRow; i++) {
        let columnArray = [];
        for (let j = 0; j < numColumn; j++) {
            let seatObject = {
                number: String.fromCharCode(65 + i) + (j + 1),
                taken: Boolean(Math.round(Math.random())),
                selected: false,
            };
            columnArray.push(seatObject);
            start++;
        }
        rowArray.push(columnArray);
    }
    return rowArray;
};
const Seats = ({navigation,route}) => {

  
    const [price, setPrice] = useState(0);
    const { note } = route.params;
    const [totalSeats, setTotalSeats] = useState(0);
    const [twoDSeatArray, setTwoDSeatArray] = useState(generateSeats());
    const [selectedSeatArray, setSelectedSeatArray] = useState([]);
    const [ticketData, setTicketData] = useState(route.params);
    const total = selectedSeatArray.length * 45.0;
   // const totalSeat = selectedSeatArray.length*1;
   // const [total, setTotal] = useState(price);
    console.log(JSON.stringify(twoDSeatArray, null, 2));
    const selectSeat = (index, subindex, num) => {
        if (!twoDSeatArray[index][subindex].taken) {
          let array = [...selectedSeatArray];
          let temp = [...twoDSeatArray];
          temp[index][subindex].selected = !temp[index][subindex].selected;
      
          if (!array.includes(num)) {
            array.push(num);
            setSelectedSeatArray(array);
          } else {
            const tempindex = array.indexOf(num);
            if (tempindex > -1) {
              array.splice(tempindex, 1);
              setSelectedSeatArray(array);
            }
          }
      
          setPrice(array.length * 45.0);
          setTotalSeats(array.length*1);
          setTwoDSeatArray(temp);
        }
      };
      useEffect(() => {
        const fetchData = async () => {
          try {
            const ticket = await SecureStore.getItemAsync('ticket'); // Use getItemAsync instead of getItem
            if (ticket !== null) {
              setTicketData(JSON.parse(ticket));
            }
          } catch (error) {
            console.error('Something went wrong while getting Data', error);
          }
        };
    
        fetchData(); // Invoke the async function
      }, []);

    if (ticketData !== route.params && route.params != undefined) {
        setTicketData(route.params);
    }
      const BookSeats = async () => {
        if (
          selectedSeatArray.length !== 0 
        //   timeArray[selectedTimeIndex] !== undefined &&
        //   dateArray[selectedDateIndex] !== undefined
        ) {
          try {
           
            await SecureStore.setItemAsync(
              'ticket',
              JSON.stringify({
                 seatArray: selectedSeatArray,
                time: ticketData.time,
                date: ticketData.date,
                month: ticketData.month,
                year: ticketData.year,
                note:ticketData.note,
                total:total,
                quantity:totalSeats,
                ticketImage: route.params.PosterImage,
              })
            );
          } catch (error) {
            console.error('Something went Wrong while storing in BookSeats Functions', error);
          }
          navigation.navigate('PayScreens', {
           seatArray: selectedSeatArray,
            time: ticketData.time,
            date: ticketData.date,
            month: ticketData.month,
            year: ticketData.year,
            note:ticketData.note,
            total:total,
            quantity:totalSeats,
            ticketImage: route.params.PosterImage,
          });
        } else {
          ToastAndroid.showWithGravity(
            'Please Select Seats',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
        }
      };
    return (
        <View style={{flex:1,backgroundColor:'black'}}>
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
                                                        <View style={[styles.square, subitem.taken?{backgroundColor:'white'}:{},subitem.selected?{backgroundColor:'orange'}:{},]}>
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
                    <View style={{ flexDirection: 'row',alignSelf:'center',marginTop:20 }}>
                        <View style={styles.square1}>
                        </View>
                        <Text style={styles.noteSeats}>Empty seat </Text>
                        <View style={styles.square2}>
                        </View>
                        <Text  style={styles.noteSeats}>Occupied</Text>
                        <View style={styles.square3}>
                        </View>
                        <Text  style={styles.noteSeats}>Selected</Text>

                    </View>
                </View>
            </ScrollView>
        </ScrollView >
        <View style={{backgroundColor:'white',flex:0.12,borderRadius: 15,borderWidth: 1, borderColor: 'black' }}>
       
            <View style={{flexDirection:'row',justifyContent: 'space-between',}}>
                <View style={{flexDirection:'column',marginTop:15, marginLeft:10}}>
                    {/* <Text style={{ fontWeight:'bold',fontSize:14, }}>
                        {note.title}
                    </Text> */}
                    <Text style={{ fontSize:15, }}>
                        {price}.000 đ
                    </Text>
                    <Text style={{ fontSize:15, }}>
                        {totalSeats} seats

                    </Text>
                </View>
               
                <TouchableOpacity style={styles.button}
                onPress={BookSeats}
                >
                    <Text style={styles.textButton}>
                    BOOK NOW
                    </Text>
                </TouchableOpacity>
            </View>
        </View>

        </View>
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
        height:30, 
        backgroundColor: '#FF3333', 
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
        backgroundColor: '#FF3333', 
        marginHorizontal:10,
    },
    square2: {
        width: 30, 
        height: 30, 
        backgroundColor: 'white', 
        marginHorizontal:10,
    },
    square3: {
        width: 30, 
        height: 30, 
        backgroundColor: 'orange', 
        marginHorizontal:10,
    },
    noteSeats:{
        color:'brown',
        fontSize:20,
        fontWeight:'bold',
    },
    button:{
        backgroundColor: '#FF3333',
        width: 130,
        height: 40,
        borderRadius:25,
        marginRight:20,
        marginTop:20,
        justifyContent: 'flex-start',
      
    },
    textButton:{
        fontWeight:'bold',
        fontSize:18,
        color:'white',
        justifyContent:'center',
        alignSelf:'center',
        marginTop:7,
    }
});

export default Seats;