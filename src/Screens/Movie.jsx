import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Text, View, StyleSheet, ScrollView, ImageBackground, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


const Movie = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { note } = route.params;
    return (
        <View style={{flex:1,backgroundColor:'black'}}> 
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
                <View style={{marginHorizontal:4}}>
                <Text style={styles.textContent}>
                    {note.content}
                </Text>
                <View style={styles.separator}></View>
                <View style={styles.inforContainer}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.textInfor}>
                            Gendre
                        </Text>
                        <Text style={[styles.infor, { marginLeft: 103 }]}>
                            {note.gendre}
                        </Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.textInfor}>
                            Director
                        </Text>
                
                        <Text style={[styles.infor, { marginLeft: 101 }]}>
                            {note.director}
                        </Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.textInfor}>
                            Language
                        </Text>
                
                        <Text style={[styles.infor, { marginLeft: 90 }]}>
                            {note.language}
                        </Text>
                    </View>


                </View>
                </View>
            </View>



        </ScrollView>
        <TouchableOpacity style={styles.button}
        onPress={() => navigation.navigate('Seats', { note })}
        >
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
        fontWeigh: 'bold',
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
        marginHorizontal: 7,
        marginTop: 10,


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
    inforContainer:{

        marginTop:10,
    },
    textInfor:{
        color:'white',
        fontWeight:'bold',
    },
    infor:{
        color:'white',
    },
    separator: {
        borderBottomColor: 'white', 
        borderBottomWidth: 0.55,
        marginTop: 10, 
        width:320,
        alignSelf:'center',
      },
      button:{
        backgroundColor:'#FF3333',
        alignSelf:'center',
        justifyContent:'center',
        width:370,
        height:35,
        borderRadius:18,
        marginTop:5,
      },
      textButton:{
        alignSelf:'center',
        fontWeight:'bold',
        color:'white',
      }
});

export default Movie;