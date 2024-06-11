import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import axios from "axios";

const MapList = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyMovies, setNearbyMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [showMovies, setShowMovies] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
        const response = await axios.get("/map");
        console.log(response);
        const moviesWithDistance = response.data.datas.map((movie) => {
          const distance = calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            movie.location.coordinates[1],
            movie.location.coordinates[0]
          ).toFixed(2);
          return { ...movie, distance };
        });

        setNearbyMovies(moviesWithDistance);
        setFilteredMovies(moviesWithDistance);
        setShowMovies(true); // Show the movie list after fetching data
        console.log(nearbyMovies);
      }
    } catch (error) {
      console.error("Error fetching or calculating distances:", error);
    }
  }, [userLocation, getUserLocation]);

  useEffect(() => {
    fetchDataAndCalculateDistances();
  }, [fetchDataAndCalculateDistances]);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = nearbyMovies.filter(
      (movie) =>
        movie.cinema_name.toLowerCase().includes(query) ||
        movie.address.toLowerCase().includes(query)
    );
    setFilteredMovies(filtered);
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search cinema or address"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      {showMovies && (
        <FlatList
          style={styles.movieList}
          data={filteredMovies}
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

export default MapList;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginVertical: 10,
    marginTop: 40,
    marginBottom: 30,
  },
  searchInput: {
    flex: 1,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 40,
  },
  searchButton: {
    backgroundColor: "#7f0d00",
    marginLeft: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    height: 40,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
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
});
