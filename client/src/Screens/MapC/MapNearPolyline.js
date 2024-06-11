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

const routeCoordinates = [
  { latitude: 10.88452370136126, longitude: 106.7800316577081 },
  { latitude: 10.88316990325859, longitude: 106.78116079373672 },
  { latitude: 10.88368563659445, longitude: 106.78181726817166 },
  { latitude: 10.882705742493116, longitude: 106.78265755544942 },
  { latitude: 10.881983713199205, longitude: 106.78268381442564 },
  { latitude: 10.880565436279753, longitude: 106.78474514415348 },
];

const MapNearPolyline = () => {
  const navigation = useNavigation();
  const [userLocation, setUserLocation] = useState(INITIAL_COORDINATES);
  const [closestMovie, setClosestMovie] = useState(null);

  const handleOrderNow = () => {
    if (closestMovie) {
      navigation.navigate("Map", { ...closestMovie });
    }
  };

  const handleClose = () => {
    setClosestMovie(null);
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
        const response = await axios.get(
          "http://10.0.131.131:8000/api/map/v1/intersect-near-movies",
          {
            params: {
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            },
          }
        );
        console.log(response);
        const movie = response.data.closestMovie;

        if (movie) {
          const distance = calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            movie.location.coordinates[1],
            movie.location.coordinates[0]
          ).toFixed(2);

          const movieWithDistance = { ...movie, distance };
          setClosestMovie(movieWithDistance);
        }
      }
    } catch (error) {
      console.error("Error fetching or calculating distances:", error);
    }
  }, [userLocation, getUserLocation]);

  useEffect(() => {
    fetchDataAndCalculateDistances();
  }, [fetchDataAndCalculateDistances]);

  const handleReturnToUserLocation = () => {
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
          coordinates={routeCoordinates}
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

        {closestMovie && (
          <Marker
            coordinate={{
              latitude: closestMovie.location.coordinates[1],
              longitude: closestMovie.location.coordinates[0],
            }}
            title={closestMovie.cinema_name}
            onPress={() => setClosestMovie(closestMovie)}
          >
            <Image
              source={require("../../assets/image/tracking.png")}
              style={{ width: 40, height: 40 }}
              resizeMode="cover"
            />
          </Marker>
        )}
      </MapView>

      {closestMovie && (
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
            <Image source={{ uri: closestMovie.image }} style={styles.image} />
            <View style={styles.infoContainer}>
              <Text style={styles.cinemaName}>{closestMovie.cinema_name}</Text>
              <View style={styles.detailsContainer}>
                <Image
                  source={require("../../assets/image/placeholder.png")}
                  style={styles.imgicon}
                />
                <Text style={styles.address}>{closestMovie.address}</Text>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.rating}>⭐ {closestMovie.rating}</Text>
                <Text style={styles.distance}>
                  📍 {closestMovie.distance} km
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

export default MapNearPolyline;
