import React, { useEffect, useState,useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView , Dimensions, Image, ImageBackground,ToastAndroid } from 'react-native';
import ShowListHeader from '../component/ShowListHeader';

import { dataHeaderAdvertisement } from '../data/dataHeaderAdvertisement';
import Casousel from 'react-native-snap-carousel';
const { width: screenWidth } = Dimensions.get('window')

import axios from "axios";
import { AuthContext } from "../context/AuthContext";


const Home = ({ navigation }) => {
    const sliderWidth = screenWidth;
    const itemWidth = screenWidth * 0.67;
    const itemWidthHeader = screenWidth * 0.8;

    const [pressedButton, setPressedButton] = useState('Now');
    const [movies, setMovies] = useState([]);
    const { user , isAuthenticated } = useContext(AuthContext);
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get("/movie");
                const nowShowingMovies = response.data?.datas.filter(item => item.categoryID.slug === 'Now');
                setMovies(response.data?.datas);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
    }, []);

 
    const handlePress = (buttonName) => {
        setPressedButton(buttonName);
    };
    const renderItem = ({ item }) => (

        <View style={styles.itemContainer}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Movie', { note: item })}
            >
                <Image source={{ uri: item.imagePath }} style={styles.itemImg}></Image>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>
                <Image
                    source={require("../assets/image/star.png")}
                    style={{ width: 13, height: 13, marginTop: 3 }}
                />
                <Text style={{ color: 'white', marginLeft: 2 }}>{item.evaluate}</Text>
                {/* <Text style={{ color: 'white', marginLeft: 2 }}>{item.categoryID.slug}</Text> */}
                <Image
                    source={require("../assets/image/time.png")}
                    style={{ width: 11, height: 11, marginLeft: 14, marginTop: 5, tintColor: 'white' }}
                />
                <Text style={{ color: 'white', marginLeft: 8 }}>{item.time}</Text>

            </View >
            <Text style={{ color: 'white', marginLeft: 2, fontWeight: 'bold' }}>{item.title}</Text>
            <TouchableOpacity
                style={styles.buttonBook}
                onPress={() => handleBookButtonPress(item)}
            >

                <Text style={styles.overlayText}>BOOK</Text>

            </TouchableOpacity>
        </View>
    )
    const handleBookButtonPress = (movie) => {
        if (isAuthenticated && user && user.userID) {
          // Nếu đã đăng nhập, điều hướng đến màn hình LocationAndTime
          navigation.navigate('LocationAndTime', { note: movie });
        } else {
          // Nếu chưa đăng nhập, hiển thị thông báo lỗi
          ToastAndroid.showWithGravity(
            "Please Login to book tickets.",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
        }
      };
    const renderItemHeader = ({ item }) => (

        <View style={styles.itemHeaderContainer}>
            <Image source={{ uri: item.imagePath }} style={styles.itemHeader}></Image>
        </View>
    )
    const filteredMovies = movies.filter(item => {
        if (pressedButton === 'Now Showing') {
            return item.categoryID.slug === 'Now';
        } else if (pressedButton === 'Special') {
            return item.categoryID.slug === 'Special';
        } else if (pressedButton === 'Coming Soon') {
            return item.categoryID.slug === 'Coming_Soon';
        }
        return true; // Default case, show all movies
    });


    return (
        <ImageBackground
            source={require('../assets/image/aquaman.jpg')}
            style={styles.backgroundImage}

        >

            <ScrollView style={styles.container}>


                <Text style={styles.text} numberOfLines={1}>CGV*</Text>

                <Casousel

                    autoplay={true}
                    autoplayTimeout={5}
                    data={dataHeaderAdvertisement}
                    renderItem={renderItemHeader}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidthHeader}
                    loop
                />

                <View style={styles.title}>

                    <TouchableOpacity >
                        <ShowListHeader title={'Now Showing'} onPress={() => handlePress('Now Showing')} />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <ShowListHeader  onPress={() => handlePress('Special')} title={'      Special'} />
                    </TouchableOpacity>

                    <TouchableOpacity >
                        <ShowListHeader title={'Coming Soon'} onPress={() => handlePress('Coming Soon')} />
                    </TouchableOpacity>

                </View>

                <Casousel

                    Layout='default'
                    //data={dataNowMovieList}
                    data={filteredMovies}
                    renderItem={renderItem}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth} />

            </ScrollView >
        </ImageBackground>


    )

};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor:'black'
    },
    headerContainer: {
        //marginTop: 20,
        //flex: 1,
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
    normalText: {
        color: 'white',
    },
    pressedText: {
        color: 'black',
    },
    Special: {
        fontWeight: 'bold',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',



    },
    slide: {
        alignItems: 'center',
        flex: 1,

    },
    itemImg: {
        width: 220,
        height: 300,
        borderRadius: 2,

        justifyContent: 'center',
        marginBottom: 10,

    },
    title: {
        flexDirection: 'row',
        marginTop: 20,
        color: 'white',

    },
    headerText: {
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
        backgroundColor: '#7f0d00',
        width: 100,
        height: 40,
        borderRadius: 18,
        marginTop: 8,
        marginTop: 8,
        activeOpacity: 0.8,
        opacity: 0.8,
  

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
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 7,



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
        borderRadius: 15,
        resizeMode: 'cover',
        borderWidth: 3,
    },
    swiper: {
        flex: 0.1,
    }
});

export default Home;