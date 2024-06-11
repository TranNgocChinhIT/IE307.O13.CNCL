import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
} from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import trackingImage from "../../assets/image/tracking.png";
const { GOOGLE_MAPS_API_KEY } = process.env;

const INITIAL_COORDINATES = {
  latitude: 10.88793179090269,
  longitude: 106.78181022475557,
};

const Map2d = () => {
  const navigation = useNavigation();
  const [userLocation, setUserLocation] = useState(INITIAL_COORDINATES);
  const [nearbyMovies, setNearbyMovies] = useState([]);
  const [showMovies, setShowMovies] = useState(false);

  const scaleAnimationRef = useRef(new Animated.Value(0)).current;
  const opacityAnimationRef = useRef(new Animated.Value(1)).current;

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  };

  const getUserLocation = useCallback(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } else {
        console.log("Permission to access location was denied");
      }
    } catch (error) {
      console.error("Error getting user location:", error);
    }
  }, []);

  const fetchDataAndCalculateDistances = useCallback(async () => {
    try {
      if (!userLocation) {
        await getUserLocation();
      }

      if (userLocation) {
        const response = await axios.get("/map/v1/nearby-movies", {
          params: {
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          },
        });

        const moviesWithDistance = response.data.nearbyMovies.map((movie) => {
          const distance = calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            movie.location.coordinates[1],
            movie.location.coordinates[0]
          ).toFixed(2);
          return { ...movie, distance };
        });

        setNearbyMovies(moviesWithDistance);
        setShowMovies(true); // Show the movie list after fetching data
      }
    } catch (error) {
      console.error("Error fetching or calculating distances:", error);
    }
  }, [userLocation, getUserLocation]);

  useEffect(() => {
    fetchDataAndCalculateDistances();
  }, [fetchDataAndCalculateDistances]);

  useEffect(() => {
    Animated.loop(
      Animated.timing(scaleAnimationRef, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    ).start();
  }, [scaleAnimationRef]);

  useEffect(() => {
    Animated.loop(
      Animated.timing(opacityAnimationRef, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    ).start();
  }, [opacityAnimationRef]);

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setUserLocation({ latitude, longitude });
  };
  const cleanImageUrl = (url) => {
    return url.replace(/\\/g, ""); // Loại bỏ dấu \ trong URL
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: INITIAL_COORDINATES.latitude,
            longitude: INITIAL_COORDINATES.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={handleMapPress}
        >
          {userLocation && (
            <Marker
              coordinate={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
              }}
              title="Your Location"
            >
              <Animated.View style={styles.markerWrap}>
                <Animated.View
                  style={[
                    styles.ring,
                    { opacity: opacityAnimationRef },
                    { transform: [{ scale: scaleAnimationRef }] },
                  ]}
                />
                <View style={styles.marker} />
              </Animated.View>
            </Marker>
          )}
          {nearbyMovies.map((movie) => (
            <Marker
              key={movie._id}
              coordinate={{
                latitude: movie.location.coordinates[1],
                longitude: movie.location.coordinates[0],
              }}
              title={movie.cinema_name}
            >
              <Image source={trackingImage} style={{ width: 60, height: 60 }} />
            </Marker>
          ))}
        </MapView>
        <View style={styles.coordinatesContainer}>
          <Text>Latitude: {userLocation?.latitude}</Text>
          <Text>Longitude: {userLocation?.longitude}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.nearbyButton}
        onPress={fetchDataAndCalculateDistances}
      >
        <Text style={styles.buttonText}>Get Nearby Movies</Text>
      </TouchableOpacity>
      {showMovies && (
        <FlatList
          style={styles.movieList}
          data={nearbyMovies}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.infoContainer}>
                <Text style={styles.cinemaName}>{item.cinema_name}</Text>
                <View style={styles.detailsContainer}>
                  <Image
                    source={require("../../assets/image/placeholder.png")}
                    style={styles.imgicon}
                  />
                  <Text style={styles.address}>{item.address}</Text>
                </View>
                <View style={styles.detailsContainer}>
                  <Text style={styles.rating}>⭐ {item.rating}</Text>
                  <Text style={styles.distance}>📍 {item.distance} km</Text>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default Map2d;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mapContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  coordinatesContainer: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 10,
    borderRadius: 5,
  },
  nearbyButton: {
    backgroundColor: "#7f0d00",
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 20,
    zIndex: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  movieList: {
    flex: 1,
    marginHorizontal: 20,
  },
  listItem: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  cinemaName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  address: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  rating: {
    fontSize: 14,
    color: "#555",
    marginRight: 10,
  },
  distance: {
    fontSize: 14,
    color: "#555",
  },
  imgicon: {
    width: 10,
    height: 10,
    padding: 10,
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "red",
    position: "absolute",
  },
  ring: {
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(222, 27, 62, 0.3)",
    borderWidth: 1,
    borderColor: "rgba(222, 27, 62, 0.86)",
    opacity: 1,
  },
});
