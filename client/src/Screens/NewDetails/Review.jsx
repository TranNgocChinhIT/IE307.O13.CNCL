import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState, useRoute } from "react";
import Casousel from "react-native-snap-carousel";
const { width: screenWidth } = Dimensions.get("window");
import { StatusBar } from "expo-status-bar";
import axios from "axios";

const Review = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const sliderWidth = screenWidth;
  const itemWidth = screenWidth * 0.67;
  const itemWidthHeader = screenWidth * 0.8;
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("/movie");
        setMovies(response.data?.datas);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.imagePath }} style={styles.itemImg}></Image>

      <View style={{ flexDirection: "row" }}>
        <Image
          source={require("../../assets/image/star.png")}
          style={{ width: 13, height: 13, marginTop: 3 }}
        />
        <Text style={{ color: "white", marginLeft: 2 }}>{item.evaluate}</Text>

        <Image
          source={require("../../assets/image/time.png")}
          style={{
            width: 11,
            height: 11,
            marginLeft: 14,
            marginTop: 5,
            tintColor: "white",
          }}
        />
        <Text style={{ color: "white", marginLeft: 8 }}>{item.time}</Text>
      </View>
      <Text style={{ color: "white", marginLeft: 2, fontWeight: "bold" }}>
        {item.title}
      </Text>
      <TouchableOpacity
        style={styles.buttonBook}
        onPress={() => {
          console.log("Button Pressed!");
          navigation.navigate("ReviewDetails", { note: item });
        }}
      >
        <Text style={styles.overlayText}>See Reviews</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <ImageBackground
      source={require("../../assets/image/background.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Casousel
          layout="default"
          data={movies}
          renderItem={renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          horizontal={false}
        />

        <StatusBar backgroundColor="black" barStyle="light-content" />
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  ticketItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  headerContainer: {},
  itemHeaderContainer: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer: {
    marginTop: 100,
    borderRadius: 8,
    marginHorizontal: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 420,
  },
  normalText: {
    color: "white",
  },
  pressedText: {
    color: "black",
  },
  Special: {
    fontWeight: "bold",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  slide: {
    alignItems: "center",
    flex: 1,
  },
  itemImg: {
    width: 260,
    height: 360,
    borderRadius: 2,

    justifyContent: "center",
    marginBottom: 10,
  },
  title: {
    flexDirection: "row",
    marginTop: 20,
    color: "white",
  },
  headerText: {
    color: "white",
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
    color: "white",
  },
  Special: {
    fontWeight: "bold",
    marginLeft: 90,
  },
  buttonBook: {
    backgroundColor: "#7f0d00",
    width: 200,
    height: 40,
    borderRadius: 18,
    marginTop: 8,

    activeOpacity: 0.8,
    opacity: 0.8,
  },

  imageBackground: {
    width: 65,
    height: 30,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF3333",

    marginTop: 10,
  },
  overlayText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 7,
  },
  imageBanner: {
    borderRadius: 10,
    aspectRatio: 9 / 3,
    width: 340,
    heigh: 360,
    marginRight: 20,
    marginLeft: 20,
    alignSelf: "center",
    marginTop: 10,
  },
  itemHeader: {
    width: 280,
    height: 120,
    justifyContent: "center",
    borderRadius: 15,
    resizeMode: "cover",
    borderWidth: 3,
  },
  swiper: {
    flex: 0.1,
  },
});
export default Review;
