import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

const INITIAL_COORDINATES = {
  latitude: 10.88793179090269,
  longitude: 106.78181022475557,
};

const MapPolyline = () => {
  const navigation = useNavigation();
  const [userLocation, setUserLocation] = useState(INITIAL_COORDINATES);
  const [nearbyMovies, setNearbyMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleOrderNow = () => {
    if (selectedMovie) {
      navigation.navigate("Map", { ...selectedMovie });
    }
  };

  const handleClose = () => {
    setSelectedMovie(null);
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
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
        const response = await axios.get("map/v1/intersect-movies", {
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
      }
    } catch (error) {
      console.error("Error fetching or calculating distances:", error);
    }
  }, [userLocation, getUserLocation]);

  useEffect(() => {
    fetchDataAndCalculateDistances();
  }, [fetchDataAndCalculateDistances]);

  const handleReturnToUserLocation = () => {
    // setUserLocation(null);
    getUserLocation();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: INITIAL_COORDINATES.latitude,
          longitude: INITIAL_COORDINATES.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Polyline
          coordinates={[
            { latitude: 10.87134873423389, longitude: 106.77040692662854 },
            { latitude: 10.870249571924859, longitude: 106.77368942486049 },
            { latitude: 10.869353613098099, longitude: 106.7769437067754 },
            { latitude: 10.867940394222146, longitude: 106.77668975992015 },
            { latitude: 10.869067275173663, longitude: 106.77747041136092 },
            { latitude: 10.868485361771278, longitude: 106.77933268829412 },
          ]}
          strokeWidth={12}
          strokeColor="#7f0d00"
        />

        {userLocation && (
          <Marker
            coordinate={userLocation}
            title="Vị trí của bạn"
            pinColor="#f97316"
          >
            <Image
              source={require("../../assets/image/placeholder.png")}
              style={{ width: 40, height: 40 }}
              resizeMode="cover"
            />
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
            onPress={() => setSelectedMovie(movie)}
          >
            <Image
              source={require("../../assets/image/tracking.png")}
              style={{ width: 40, height: 40 }}
              resizeMode="cover"
            />
          </Marker>
        ))}
      </MapView>

      {selectedMovie && (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: 15,
            backgroundColor: "white",
            borderTopWidth: 1,
            borderTopColor: "#ccc",
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <TouchableOpacity onPress={handleClose}>
              <Image
                source={require("../../assets/image/close.png")}
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 5,
                  marginBottom: 10,
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.listItem}>
            <Image source={{ uri: selectedMovie.image }} style={styles.image} />
            <View style={styles.infoContainer}>
              <Text style={styles.cinemaName}>{selectedMovie.cinema_name}</Text>
              <View style={styles.detailsContainer}>
                <Image
                  source={require("../../assets/image/placeholder.png")}
                  style={styles.imgicon}
                />
                <Text style={styles.address}>{selectedMovie.address}</Text>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.rating}>⭐ {selectedMovie.rating}</Text>
                <Text style={styles.distance}>
                  📍 {selectedMovie.distance} km
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
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
});
export default MapPolyline;
