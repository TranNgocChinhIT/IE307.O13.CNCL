import React, { useEffect, useState } from "react";

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  FlatList,
  Dimensions,
} from "react-native";
import Header from "../component/Header";
import ShowListHeader from "../component/ShowListHeader";
import { dataNowMovieList } from "../data/dataNowMovieList";
import { dataHeaderAdvertisement } from "../data/dataHeaderAdvertisement";
import MainMovieCard from "../component/MainMovieCard";
import { baseImagePath } from "../api/api";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();
const { width, height } = Dimensions.get("window");

const Categories1 = () => {
  const [nowMoviesList, setNowMoviesList] = useState(undefined);
  return (
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
          snapToInterval={width * 0.7}
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          cardFunction={() => {
            navigation.push("Movie", { movieid: item.id });
          }}
          //cardWidth={width * 0.7}
          isFirst={index === 0 ? true : false}
          isLast={
            index === (nowMoviesList ? nowMoviesList.length - 1 : 0)
              ? true
              : false
          }
          imagePath={item.imagePath}
          evaluate={item.evaluate}
          time={item.time}
          title={item.title}
        />
      )}
    />
  );
};
const Categories2 = () => {
  const [nowMoviesList, setNowMoviesList] = useState(undefined);
  return (
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
          snapToInterval={width * 0.7}
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          cardFunction={() => {
            navigation.push("Movie", { movieid: item.id });
          }}
          //cardWidth={width * 0.7}
          isFirst={index === 0 ? true : false}
          isLast={
            index === (nowMoviesList ? nowMoviesList.length - 1 : 0)
              ? true
              : false
          }
          imagePath={item.imagePath}
          evaluate={item.evaluate}
          time={item.time}
          title={item.title}
        />
      )}
    />
  );
};
const Categories3 = () => {
  const [nowMoviesList, setNowMoviesList] = useState(undefined);
  return (
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
          snapToInterval={width * 0.7}
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          cardFunction={() => {
            navigation.push("Movie", { movieid: item.id });
          }}
          //cardWidth={width * 0.7}
          isFirst={index === 0 ? true : false}
          isLast={
            index === (nowMoviesList ? nowMoviesList.length - 1 : 0)
              ? true
              : false
          }
          imagePath={item.imagePath}
          evaluate={item.evaluate}
          time={item.time}
          title={item.title}
        />
      )}
    />
  );
};
const Home = (navigation) => {
  const [nowMoviesList, setNowMoviesList] = useState(undefined);
  const [specialMovies, setSpecialMovies] = useState(undefined);
  const [comingMovies, setComingMovies] = useState(undefined);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.text} numberOfLines={1}>
          BAR
        </Text>
        <FlatList
          data={dataHeaderAdvertisement}
          horizontal
          style={styles.flatList}
          renderItem={({ item, index }) => (
            <Header
              shoudlMarginatedAtEnd={true}
              cardFunction={() => {
                navigation.push("MovieDetails", { movieid: item.id });
              }}
              //cardWidth={width * 0.7}
              isFirst={index === 0 ? true : false}
              isLast={
                index === (nowMoviesList ? nowMoviesList.length - 1 : 0)
                  ? true
                  : false
              }
              imagePath={item.imagePath}
            />
          )}
        />
        <Tab.Navigator>
          <Tab.Screen name="CATEGORIES1" component={Categories1} />
          <Tab.Screen name="CATEGORIES2" component={Categories2} />
          <Tab.Screen name="CATEGORIES3" component={Categories3} />
        </Tab.Navigator>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    //flex:1,
    //backgroundColor:'black',
  },
  headerContainer: {
    marginTop: 30,
  },
  title: {
    flexDirection: "row",
    marginTop: 20,
  },
  movieCard: {},
  flatList: {
    marginTop: 10,
    marginRight: 20,
    alignSelf: "center",
  },
  text: {
    alignSelf: "center",
    fontSize: 21,
    fontWeight: "bold",
  },
  Special: {
    marginLeft: 40,
  },
});

export default Home;
