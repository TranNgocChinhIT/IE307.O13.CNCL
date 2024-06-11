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
import cinemaData from "./data/db.json";

const Screen1 = ({ route, navigation }) => {
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
        setUserLocation(location.coords);
      } else {
        console.log("Permission to access location was denied");
      }
    } catch (error) {
      console.error("Error getting user location:", error);
    }
  }, []);

  const fetchDataAndCalculateDistances = useCallback(() => {
    if (userLocation) {
      const updatedMovies = cinemaData.map((movie) => {
        const distance = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          movie.location.coordinates[1],
          movie.location.coordinates[0]
        ).toFixed(2);
        return { ...movie, distance };
      });

      setNearbyMovies(updatedMovies);
      setFilteredMovies(updatedMovies);
      setShowMovies(true); // Show the movie list after fetching data
    }
  }, [userLocation]);

  useEffect(() => {
    getUserLocation();
  }, [getUserLocation]);

  useEffect(() => {
    fetchDataAndCalculateDistances();
  }, [userLocation, fetchDataAndCalculateDistances]);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = nearbyMovies.filter(
      (movie) =>
        movie.cinema_name.toLowerCase().includes(query) ||
        movie.address.toLowerCase().includes(query)
    );
    setFilteredMovies(filtered);
  };

  const handlePressItem = (coordinates_2) => {
    navigation.navigate("HomeScreen", { coordinates_2 });
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Tìm kiếm rạp phim</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("HomeScreen")}
          style={styles.headerButton}
        >
          <Text style={styles.headerButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm rạp phim hoặc địa chỉ..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Tìm Kiếm</Text>
        </TouchableOpacity>
      </View>
      {showMovies && (
        <FlatList
          style={styles.movieList}
          data={filteredMovies}
          keyExtractor={(item) => item._id.$oid}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePressItem(item)}>
              <View style={styles.listItem}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.infoContainer}>
                  <Text style={styles.cinemaName}>{item.cinema_name}</Text>
                  <View style={styles.detailsContainer}>
                    <Image
                      source={require("../assets/map.png")}
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
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default Screen1;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#7f0d00",
    padding: 15,
    paddingTop: 40, // Để tránh trùng với status bar trên iOS
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  headerButton: {
    backgroundColor: "#fff",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  headerButtonText: {
    color: "#7f0d00",
    fontSize: 16,
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginVertical: 10,
    marginTop: 30,
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
    marginHorizontal: 5,
    padding: 5,
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
