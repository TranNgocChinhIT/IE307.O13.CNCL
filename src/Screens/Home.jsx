import React, { useEffect, useState } from 'react';

import { Text, View, StyleSheet, TouchableOpacity, ScrollView, StatusBar, FlatList, Dimensions } from 'react-native';
import Header from '../component/Header';
import ShowListHeader from '../component/ShowListHeader';
import { dataNowMovieList } from '../data/dataNowMovieList';
import { dataHeaderAdvertisement } from '../data/dataHeaderAdvertisement';
import MainMovieCard from '../component/MainMovieCard';
import { baseImagePath } from '../api/api';
const {width,height}=Dimensions.get('window')
const listNowPlayingMovies = async () => {
    try {
        let res = await fetch(dataNowMovieList);
        let json = await res.json();
        return json;
    } catch (error) {
        console.error('Error', error);
    }
}
// const listSpecialMovies = async () => {
//     try {
//         let res = await fetch(specialMovies);
//         let json = await Response.json();
//         return json;
//     } catch (error) {
//         console.error('Error', error);
//     }
// }
// const listComingMovies = async () => {
//     try {
//         let res = await fetch(comingMovies);
//         let json = await Response.json();
//         return json;
//     } catch (error) {
//         console.error('Error', error);
//     }
// }
const Home = (navigation) => {
    const [nowMoviesList, setNowMoviesList] = useState(undefined);
    const [specialMovies, setSpecialMovies] = useState(undefined);
    const [comingMovies, setComingMovies] = useState(undefined);
    useEffect(() => {
        (async () => {
            let tempNowPlaying = await listNowPlayingMovies();
            setNowMoviesList([
                { id: 'dummy1' },
                ...tempNowPlaying.results,
                { id: 'dummy2' },
            ]);

            let tempPopular = await listSpecialMovies();
            setSpecialMovies(tempPopular.results);

            let tempUpcoming = await listComingMovies();
            setComingMovies(tempUpcoming.results);
        })();
    }, []);
    return (
        <ScrollView style={styles.container}>

            <Text>Loading..</Text>
            <View style={styles.headerContainer}>
            <Text style={styles.text} numberOfLines={1}>CGV*</Text>
            <FlatList
                    data={dataHeaderAdvertisement}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal
                    style={styles.flatList}
                    renderItem={({ item, index }) => (
                        <Header
                        shoudlMarginatedAtEnd={true}
                        cardFunction={() => {
                          navigation.push('MovieDetails', { movieid: item.id });
                        }}
                        //cardWidth={width * 0.7}
                        isFirst={index === 0 ? true : false}
                        isLast={index === (nowMoviesList ? nowMoviesList.length - 1 : 0) ? true : false}
                            imagePath={item.imagePath}
                        />
                    )}
                />
                <View style={styles.title}>
                
                    <ShowListHeader title={'Now Showing'} />
                    <ShowListHeader style={styles.Special} title={'Special'} />
                    <ShowListHeader title={'Coming Soon'} />
                   
                </View>
                
                <FlatList
                    data={dataNowMovieList}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal
                    decelerationRate={10}
                    style={styles.flatList}
                    renderItem={({ item, index }) => (
                        <MainMovieCard
                        shoudlMarginatedAtEnd={true}
                        bounces={false}
                        snapToInterval={width*0.7}
                        showsHorizontalScrollIndicator={false}
                        decelerationRate={0}
                        cardFunction={() => {
                          navigation.push('Movie', { movieid: item.id });
                        }}
                        //cardWidth={width * 0.7}
                        isFirst={index === 0 ? true : false}
                        isLast={index === (nowMoviesList ? nowMoviesList.length - 1 : 0) ? true : false}
                            imagePath={item.imagePath}
                            evaluate={item.evaluate}
                            time={item.time}
                            title={item.title}
                        />
                    )}
                />


            </View>

        </ScrollView>
    )

};
const styles = StyleSheet.create({
    container: {
        //flex:1,
        //backgroundColor:'black',
    },
    headerContainer: {
        marginTop: 20,
    },
    title: {
        flexDirection: 'row',
        marginTop: 20,
    },
    movieCard: {


    },
    flatList: {

        marginTop: 10,
        marginRight: 20,
        alignSelf:'center',
    },
    text:{
        alignSelf:'center',
        fontSize: 21,
        fontWeight:'bold',
        
    },
    Special:{

        marginLeft:40,
    },

});

export default Home;
