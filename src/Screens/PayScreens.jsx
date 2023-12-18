import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Image } from 'react-native';
import MoMoPayment from 'react-native-momosdk';
import { useRoute } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
const PayScreens = ({ navigation, route }) => {
    //const route = useRoute();
    const [ticketData, setTicketData] = useState(route.params);

    const handleOpenMomoApp = () => {
        const momoPaymentURL = 'momo://payment';

        Linking.canOpenURL(momoPaymentURL).then((supported) => {
            if (supported) {
                return Linking.openURL(momoPaymentURL);
            } else {
                console.warn('Momo app is not installed.');
            }
        });
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
    return (
        <View style={styles.container}>
            <View style={{ flex: 0.25, marginTop: 30, }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={styles.image} source={{ uri: ticketData.note.imagePath }}>

                    </Image>



                    <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                        <Text style={{fontSize:16,fontWeight:'bold'}}>
                            {ticketData.note.title}
                        
                        </Text>
                        <Text>

                            {ticketData?.date &&
                                `${ticketData.date.day}, ${ticketData.date.date}/${ticketData.month
                                }/${ticketData.year}`
                            }
                        </Text>
                        <Text>


                            Time: {ticketData.time}
                        </Text>
                        <Text>

                            Seats: {ticketData?.seatArray.slice(0, 3).map((item, index, arr) => (
                                <React.Fragment key={index}>
                                    {item}
                                    {index === arr.length - 1 ? '' : ', '}
                                </React.Fragment>
                            ))}
                        </Text>
                        <Text style={{color:'red',fontSize:17,fontWeight:'bold'}}>

                            Total payment: {ticketData.total}.000 đ
                        </Text>

                    </View>
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleOpenMomoApp}>
                <Text>Open Momo Payment</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

        flex: 1,

    },
    button: {
        backgroundColor: 'red',
        width: 100,
        height: 100,
    },
    image: {
        width: 100,
        height: 160,
    }

});
export default PayScreens;
