import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Image, ScrollView } from 'react-native';
import MoMoPayment from 'react-native-momosdk';
import { useRoute } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
const PayScreens = ({ navigation, route }) => {
    //const route = useRoute();
    const [ticketData, setTicketData] = useState(route.params);
    const [isMomoSelected, setIsMomoSelected] = useState(false);
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
    const handleMomoSelection = () => {
        setIsMomoSelected(!isMomoSelected);
      };
    return (
        <View style={styles.container}>
            <View style={{ flex: 0.25, marginTop: 30, marginBottom: 25 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={styles.image} source={{ uri: ticketData.note.imagePath }}>

                    </Image>



                    <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
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
                        <Text style={{ color: 'red', fontSize: 17, fontWeight: 'bold' }}>

                            Total payment: {ticketData.total}.000 đ
                        </Text>

                    </View>
                </View>
            </View>
            <ScrollView style={{ flex: 0.55 }}>
                <View style={{ backgroundColor: '#A9A9A9', with: '100%', height: 40, marginTop: 15 }}>

                    <Text style={{ fontSize: 18, marginTop: 7, marginLeft: 10, }}>
                        TICKET INFORMATION
                    </Text>
                </View>
                <View>
                    <View style={styles.inforContainer}>
                        <Text style={styles.txtInfor}>
                            Quantity
                        </Text>

                        <Text style={styles.txtQuantity}>
                            {ticketData.quantity}
                        </Text>
                    </View>
                    <View style={styles.separator}></View>
                    <View style={styles.inforContainer}>
                        <Text style={styles.txtInfor}>
                            Sub Total
                        </Text>

                        <Text style={styles.txtQuantity}>
                            {ticketData.total}.000 đ
                        </Text>
                    </View>
                    <View style={styles.separator}></View>
                </View>


                <View style={{ backgroundColor: '#A9A9A9', with: '100%', height: 40 }}>

                    <Text style={{ fontSize: 18, marginTop: 7, marginLeft: 10, }}>
                        CONCESSION INFORMATION
                    </Text>
                </View>
                <View>
                    <View style={styles.inforContainer}>
                        <Text style={styles.txtInfor}>
                            Quantity
                        </Text>

                        <Text style={styles.txtQuantity}>
                            {ticketData.quantity}
                        </Text>
                    </View>
                    <View style={styles.separator}></View>
                    <View style={styles.inforContainer}>
                        <Text style={styles.txtInfor}>
                            Sub Total
                        </Text>

                        <Text style={styles.txtQuantity}>
                            {ticketData.total}.000 đ
                        </Text>
                    </View>
                    <View style={styles.separator}></View>
                </View>
                <View style={{ backgroundColor: '#A9A9A9', with: '100%', height: 40 }}>

                    <Text style={{ fontSize: 18, marginTop: 7, marginLeft: 10, }}>
                        DISCOUNT PAYMENT
                    </Text>
                </View>
                <View>

                    <View style={styles.separator}></View>
                </View>
                <View style={{ backgroundColor: '#A9A9A9', with: '100%', height: 40 }}>

                    <Text style={{ fontSize: 18, marginTop: 7, marginLeft: 10, }}>
                        SUMMARY
                    </Text>
                </View>

                <View>
                    <View style={styles.inforContainer}>
                        <Text style={styles.txtInfor}>
                            Total including VAT
                        </Text>

                        <Text style={styles.txtQuantity}>
                            {ticketData.total}.000 đ
                        </Text>
                    </View>
                    <View style={styles.separator}></View>
                    <View style={styles.inforContainer}>
                        <Text style={styles.txtInfor}>
                            Discount
                        </Text>

                        <Text style={styles.txtQuantity}>
                            0 đ
                        </Text>
                    </View>
                    <View style={styles.separator}></View>
                    <View style={styles.inforContainer}>
                        <Text style={styles.txtInfor}>
                            After Discount
                        </Text>

                        <Text style={styles.txtQuantity}>
                            {ticketData.total}.000 đ
                        </Text>
                    </View>
                    <View style={styles.separator}></View>
                </View>

                {/* sds */}
                <View style={{ backgroundColor: '#A9A9A9', with: '100%', height: 40 }}>

                    <Text style={{ fontSize: 18, marginTop: 7, marginLeft: 10, }}>
                        PAYMENT
                    </Text>
                </View>
                <View>

                    <TouchableOpacity onPress={handleMomoSelection}>
                        <View style={styles.inforContainer}>
                            <Image source={require('../assets/image/momo2.webp')}
                                style={styles.imageIcon}>

                            </Image>
                            {isMomoSelected && <Text style={{ color: '#FF3333', marginRight: 10 }}>✔</Text>}

                        </View>
                    </TouchableOpacity>
                    <View style={styles.separator}></View>
                </View>


            </ScrollView>
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.2, backgroundColor: '#D2B48C', borderRadius: 15 }}>
                <Text style={{ marginHorizontal: 4, }}>
                    I agree to the
                    <Text style={{ color: '#FF3333' }}> Terms of Use </Text>
                    and am purchasings tickers for age appropriate audience
                </Text>
                <TouchableOpacity style={styles.button} onPress={handleOpenMomoApp}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, }}>I AGREE AND CONTINUE</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

        flex: 1,

    },
    button: {
        backgroundColor: '#FF3333',
        width: '80%',
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        marginTop: 5,
    },
    image: {
        width: 100,
        height: 160,
        marginLeft: 5,
    },
    inforContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        with: '100%',
        height: 35,
        alignItems: 'center',
    },
    txtInfor: {

        fontSize: 17,
        marginLeft: 10,
    },
    txtQuantity: {

        fontSize: 17,
        marginRight: 10,
    },
    separator: {
        borderBottomWidth: 1,
        width: '100%',
        alignSelf: 'center',
        borderBottomColor: 'black',
        // marginTop: 15,

    },
    imageIcon: {
        width: 27,
        height: 27,
        marginLeft:10,
    }

});
export default PayScreens;
