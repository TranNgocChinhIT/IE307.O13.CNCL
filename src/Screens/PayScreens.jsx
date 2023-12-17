import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Image } from 'react-native';
import MoMoPayment from 'react-native-momosdk';
import { useRoute } from '@react-navigation/native';
const PayScreens = ({ route }) => {
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
        (async () => {
            try {
                const ticket = await EncryptedStorage.getItem('ticket');
                if (ticket !== undefined && ticket !== null) {
                    setTicketData(JSON.parse(ticket));
                }
            } catch (error) {
                console.error('Something went wrong while getting Data', error);
            }
        })();
    }, []);

    if (ticketData !== route.params && route.params != undefined) {
        setTicketData(route.params);
    }
    return (
        <View style={styles.container}>
            <View style={{ flex: 0.25, marginTop: 30, }}>
                <View style={{ flexDirection: 'row' }}>
                    {/* <Image style={styles.image} source={{ uri: note.imagePath }}>

                    </Image> */}



                    <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                        {/* <Text style={{fontSize:16,fontWeight:'bold'}}>
                            {note.title}
                        </Text> */}
                        <Text>

                            {ticketData?.date &&
                                `${ticketData.date.day}, ${ticketData.date.date}/${ticketData.month
                                }/${ticketData.year}`
                            }
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
