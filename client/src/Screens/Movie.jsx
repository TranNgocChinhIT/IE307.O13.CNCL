import React, { useEffect, useState,useContext } from 'react';
import { useRoute } from '@react-navigation/native';
import { Text, View, StyleSheet, ScrollView, ImageBackground, Image, TouchableOpacity, FlatList, Dimensions, Linking,ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from "../context/AuthContext";
const { width: screenWidth } = Dimensions.get('window')
const Movie = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { note } = route.params;
    const sliderWidth = screenWidth;
    const itemWidth = screenWidth * 0.67;
    const itemWidthHeader = screenWidth * 0.8;
    const { user , isAuthenticated } = useContext(AuthContext);
    const renderCast = ({ item }) => (

        <View style={styles.itemHeaderContainer}>
            <Image source={{ uri: item.imagePath }} style={styles.itemHeader}></Image>
        </View>
    )
    const openYouTubeApp = () => {
    
        const youtubeUrl = note.trailer.toString();
  
        Linking.openURL(youtubeUrl).catch((err) =>
            console.error('Error opening YouTube:', err)
        );
    };
    const handleBookButtonPress = () => {
        if (isAuthenticated && user && user.userID) {
          
          navigation.navigate('LocationAndTime', { note });
        } else {
            ToastAndroid.showWithGravity(
                "Please Login to book tickets.",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
              );
        }
      };
    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <ScrollView
                style={styles.container}
                bounces={false}
                showsVerticalScrollIndicator={false}
            >
                <View>
                    <ImageBackground
                        source={{
                            uri: note?.backdrop_path,
                        }}
                        style={styles.imageBG}
                        overlayColor="rgba(0, 0, 9, 0.9)"
                    >
                        <View style={styles.overlay} />
                    </ImageBackground>
                    <View style={styles.imageBG}></View>
                    <Image
                        source={{ uri: note.imagePath }}
                        style={styles.cardImage}
                    />
                </View>
                <View>
                    <View style={styles.youtubeContainer}>
                        <TouchableOpacity onPress={openYouTubeApp}>
                        <Image source={require("../assets/image/youtube.png")}
                            style={styles.ytbImg}></Image>
                            </TouchableOpacity>
                        <Text style={{ color: 'white', fontSize: 13 }}> TRAILERS</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                        <View style={styles.dateTimeItem}>
                            <Image
                                source={require("../assets/image/calendar.png")}
                                style={styles.itemImg}
                            />
                            <Text style={styles.time}>
                                {note.date}
                            </Text>
                        </View>
                        <View style={styles.dateTimeItem}>
                            <Image
                                source={require("../assets/image/time.png")}
                                style={styles.itemImg}
                            />
                            <Text style={styles.time}>
                                {note.time}
                            </Text>
                        </View>

                    </View>
                    <Text style={styles.title}>
                        {note.title}
                    </Text>
                    <View style={{ marginHorizontal: 4 }}>
                        <Text style={styles.textContent}>
                            {note.content}
                        </Text>
                        <View style={styles.separator}></View>
                        <View style={styles.inforContainer}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.textInfor}>
                                    Genre
                                </Text>
                                <Text style={[styles.infor, { marginLeft: 103 }]}>
                                    {note.gendre}
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.textInfor}>
                                    Director
                                </Text>

                                <Text style={[styles.infor, { marginLeft: 98 }]}>
                                    {note.director}
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.textInfor}>
                                    Language
                                </Text>

                                <Text style={[styles.infor, { marginLeft: 87 }]}>
                                    {note.language}
                                </Text>
                            </View>


                        </View>
                    </View>
                </View>

                <View style={{ marginTop: 10, marginHorizontal: 5 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}>
                        Cast
                    </Text>
                    <View style={{ marginTop: 15 }}>
                        <FlatList
                            data={note.cast}
                            keyExtractor={(item, index) => index.toString()} // Sử dụng index như một key tạm thời
                            horizontal
                            bounces={false}
                            contentContainerStyle={styles.margin}

                            renderItem={({ item, index }) => {
                                return (
                                    <View style={{ flexDirection: 'column' }}>
                                        <Image source={{ uri: item.actorImage }} style={styles.itemHeader}></Image>
                                        <Text style={{ color: 'white' }}>{item.actorName}</Text>
                                    </View>
                                );
                            }}
                        />


                    </View>

                </View>


            </ScrollView>
            <TouchableOpacity style={styles.button}
                onPress={handleBookButtonPress}>
                <Text style={styles.textButton}>BOOK NOW</Text>
            </TouchableOpacity>
        </View>
    )
};
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: 'black',
    },
    imageBG: {
        width: '100%',
        aspectRatio: 3072 / 1900,
    },
    linearGradient: {
        height: '100%',
    },
    margin: {
        gap: 18,
    },
    cardImage: {
        width: '60%',
        aspectRatio: 200 / 300,
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        marginTop: 500,
        borderRadius: 3,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.29)', // Điều chỉnh alpha để thay đổi độ mờ

    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        marginTop: 10,
        alignSelf: 'center',
        fontSize: 18,

    },
    time: {
        marginLeft: 7,
        color: 'white',
        fontWeight: 'bold',
        marginRight: 6,

        alignSelf: 'center',
        justifyContent: 'center',


    },
    dateTimeItem: {
        flexDirection: 'row',
        borderColor: 'white',
        alignItems: 'center',
        borderWidth: 0.8,
        borderRadius: 4,
        marginHorizontal: 5,
        marginTop: 1,


    },
    itemImg: {
        width: 13,
        height: 13,
        marginLeft: 6,
        tintColor: 'white'
    },
    textContent: {
        color: 'white',
        marginTop: 10,
        alignSelf: 'center',
        textAlign: 'justify',

    },
    inforContainer: {

        marginTop: 10,
    },
    textInfor: {
        color: 'white',
        fontWeight: 'bold',
    },
    infor: {
        color: 'white',
    },
    separator: {
        borderBottomColor: 'white',
        borderBottomWidth: 0.55,
        marginTop: 10,
        width: 320,
        alignSelf: 'center',
    },
    button: {
        backgroundColor: '#FF3333',
        alignSelf: 'center',
        justifyContent: 'center',
        width: 370,
        height: 35,
        borderRadius: 18,
        marginTop: 5,
    },
    textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: 'white',
    },
    imageCast: {
        width: 40,
        height: 40,
    },
    itemHeaderContainer: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemHeader: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        borderRadius: 20,
        resizeMode: 'cover',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 100,

    },
    youtubeContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 5,
    },
    ytbImg: {
        width: 33,
        height: 33,
        //marginLeft: 6,
        tintColor: 'white'
    }
});

export default Movie;