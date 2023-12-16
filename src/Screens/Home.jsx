import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, StatusBar, FlatList, Dimensions, Image, ImageBackground } from 'react-native';
import ShowListHeader from '../component/ShowListHeader';
import { dataNowMovieList } from '../data/dataNowMovieList';
import { dataHeaderAdvertisement } from '../data/dataHeaderAdvertisement';
import Casousel from 'react-native-snap-carousel';
const { width: screenWidth } = Dimensions.get('window')
import { useNavigation } from '@react-navigation/native';


const Home = () => {
    const navigation = useNavigation();
    const sliderWidth = screenWidth;
    const itemWidth = screenWidth * 0.67;
    const itemWidthHeader = screenWidth * 0.8;

    const renderItem = ({ item }) => (

        <View style={styles.itemContainer}>
            <TouchableOpacity 
            onPress={() => navigation.navigate("MovieScreen", { note: item })}
            >
                <Image source={{ uri: item.imagePath }} style={styles.itemImg}></Image>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>
                <Image
                    source={require("../assets/image/star.png")}
                    style={{ width: 13, height: 13, marginTop: 3 }}
                />
                <Text style={{ color: 'white', marginLeft: 2 }}>{item.evaluate}</Text>
                <Image
                    source={require("../assets/image/time.png")}
                    style={{ width: 11, height: 11, marginLeft: 14, marginTop: 5, tintColor: 'white' }}
                />
                <Text style={{ color: 'white', marginLeft: 8 }}>{item.time}</Text>

            </View >
            <Text style={{ color: 'white', marginLeft: 2, fontWeight: 'bold' }}>{item.title}</Text>
            <TouchableOpacity
            style={styles.buttonBook}
            onPress={() => navigation.navigate('Seats', { note: item })}
            >
                
                    <Text style={styles.overlayText}>BOOK</Text>
                
            </TouchableOpacity>
        </View>
    )
    const renderItemHeader = ({ item }) => (

        <View style={styles.itemHeaderContainer}>
            <Image source={{ uri: item.imagePath }} style={styles.itemHeader}></Image>
        </View>
    )
 
    return (
        <ScrollView style={styles.container}>
            <ImageBackground
                source={require('../assets/image/aquaman.jpg')}
                style={styles.backgroundImage}

            >
                <View style={styles.headerContainer}>
                    <Text style={styles.text} numberOfLines={1}>CGV*</Text>

                    <Casousel

                        autoplay={true}
                        autoplayTimeout={5}
                        data={dataHeaderAdvertisement}
                        renderItem={renderItemHeader}
                        sliderWidth={sliderWidth}
                        itemWidth={itemWidthHeader}
                    />

                    <View style={styles.title}>

                        <ShowListHeader title={'Now Showing'} />
                        <ShowListHeader style={styles.Special} title={'      Special'} />
                        <ShowListHeader title={'Coming Soon'} />

                    </View>

                    {/* <Swiper
                        autoplay={true}
                        autoplayTimeout={3} 
                        style={styles.swiper}
                    >
                        {dataHeaderAdvertisement.map(advertisement => (
                            <View key={advertisement.id} style={styles.slide}>
                                <Image source={{ uri: advertisement.imagePath }} style={styles.imageBanner} />
                            </View>
                        ))}
                    </Swiper> */}


                    <Casousel

                        Layout='default'
                        data={dataNowMovieList}
                        renderItem={renderItem}
                        sliderWidth={sliderWidth}
                        itemWidth={itemWidth}
                    />


                </View>
            </ImageBackground>
        </ScrollView>

    )

};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor:'black'
    },
    headerContainer: {
        marginTop: 20,
        flex: 1,
    },
    itemHeaderContainer: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemContainer: {
        marginTop: 20,
        borderRadius: 8,
        marginHorizontal: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 420,
    },

    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        marginTop: 20,

    },
    slide: {
        alignItems: 'center',
        flex: 1,

    },
    itemImg: {
        width: 220,
        height: 300,
        borderRadius:2,

        justifyContent: 'center',
        marginBottom: 10,

    },
    title: {
        flexDirection: 'row',
        marginTop: 20,
        color: 'white',

    },
    movieCard: {


    },
    flatList: {

        marginTop: 10,
        marginRight: 20,
        alignSelf: 'center',
    },
    text: {
        alignSelf: 'center',
        fontSize: 21,
        fontWeight: 'bold',
        color: 'white',

    },
    Special: {


        fontWeight: 'bold',
        marginLeft: 90,
    },
    buttonBook: {
        backgroundColor: '#FF3333',
        width: 100,
        height: 40,
        borderRadius: 18,
        marginTop: 8,
        marginTop: 8,
        activeOpacity:0.8,
        opacity:0.8,
        //elevation: 1000,

    },

    imageBackground: {
        width: 65,
        height: 30,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF3333',

        marginTop: 10,
    },
    overlayText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf:'center',
        justifyContent:'center',
        marginTop:7,



    },
    imageBanner: {
        borderRadius: 10,
        aspectRatio: 9 / 3,
        width: 340,
        heigh: 360,
        marginRight: 20,
        marginLeft: 20,
        alignSelf: 'center',
        marginTop: 10,
    },
    itemHeader: {
        width: 280,
        height: 120,
        justifyContent: 'center',
        borderRadius: 20,
        resizeMode:'cover',
        borderColor: 'white',
        borderWidth: 3,
    },
    swiper: {
        flex: 0.1,
    }
});

export default Home;