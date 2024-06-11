import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Dimensions, ScrollView, TextInput, Modal, TurboModuleRegistry } from 'react-native';
import React, { useState, useEffect } from 'react';
import MapView, { Marker, Polyline, Polygon, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import cinemaData from './data/db.json';
import axios from 'axios';
import districtData from './data/districtPolygons.json';
import jsonData from './data/export2.json';
import jsonTrafficData from './data/updated_data.json'
import { parseData, dijkstra } from './Dijkstra';

const { nodes, edges } = parseData(jsonData);
const customIcon = require('../assets/placeholder.png'); //Icon Map
const cinemaIcon = require('../assets/cinema.png'); //Icon Map
const trafficIcon = require('../assets/traffic-lights.png'); //Icon Map


export default function Home({ route, navigation }) {

  const defaultLocation = () => {
    return {
      latitude: 10.859313791905437,
      longitude: 106.60419726148713,
      latitudeDelta: 0.722,
      longitudeDelta: 0.421,
    };
  };

  const defaultUserLocation = {
    latitude: 10.847388306318624,
    longitude: 106.83729892481165,
  };

  const [currentLocation, setCurrentLocation] = useState(null); // No default location
  const [region, setRegion] = useState(defaultLocation());
  const [formattedAddress, setFormattedAddress] = useState('');
  const [nearestCinema, setNearestCinema] = useState(null);
  const [theaterMarkers, setTheaterMarkers] = useState([]);
  const [showDirections, setShowDirections] = useState(false);
  const [routeCoords, setRouteCoords] = useState([]);
  const [district, setDistrict] = useState(''); // State để lưu quận được nhập
  const [cinemasInDistrict, setCinemasInDistrict] = useState([]); // State để lưu các rạp phim trong quận
  const [districtBoundary, setDistrictBoundary] = useState(null);
  const [searchAddress, setSearchAddress] = useState(''); // New state for search input
  const [radius, setRadius] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [modalVisible4, setModalVisible4] = useState(false);
  const [roadName, setRoadName] = useState('');
  const [ratingThreshold, setRatingThreshold] = useState('');
  const [functionX, setFunctionX] = useState(false);
  const [optimalRouteCoords, setOptimalRouteCoords] = useState([]);
  const [showOptimizedDirections, setShowOptimizedDirections] = useState(false);
  const [trafficLights, setTrafficLights] = useState([]);
  const [trafficShow, setTrafficShow] = useState(false);
  const [showCircle, setShowCircle] = useState(false);

  //
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
      } else {
        const location = await Location.getCurrentPositionAsync({});
        setCurrentLocation(location.coords);
      }
    })();
  }, []);

  //Lấy vị trí tự chọn
  useEffect(() => {
    if (route.params?.selectedLocation) {
      const { selectedLocation } = route.params;
      setCurrentLocation(selectedLocation);
      setRegion({
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [route.params?.selectedLocation]);

  //Lấy vị trí sau khi tìm kiếm rạp phim
  useEffect(() => {
    if (route.params?.coordinates_2) {
      const { coordinates_2 } = route.params;
      setNearestCinema(coordinates_2);
    }
  }, [route.params?.coordinates_2]);

  //Function: Lấy vị trí hiện tại
  const getCurrentLocation = async () => {
    setShowDirections(false);

    // lấy vị trí mặc định nếu xài máy ảo 
    setCurrentLocation(defaultUserLocation);
    setRegion({
      latitude: defaultUserLocation.latitude,
      longitude: defaultUserLocation.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });

    //Lấy vị trí hiện tại của user nếu xài điện thoại
    // const { status } = await Location.requestForegroundPermissionsAsync();
    // if (status === 'granted') {
    //   const location = await Location.getCurrentPositionAsync({});
    //   const { latitude, longitude } = location.coords;
    //   setCurrentLocation(location.coords);

    //   setRegion({
    //     latitude: latitude,
    //     longitude: longitude,
    //     latitudeDelta: 0.0922,
    //     longitudeDelta: 0.0421,
    //   });
    // }

    try {
      const address = await Location.reverseGeocodeAsync(defaultUserLocation);
      const newFormattedAddress = address
        .map(
          (address) =>
            `${address.streetNumber} ${address.street}, ${address.city}, ${address.region}, ${address.country}`
        )
        .join(', ');

      setFormattedAddress(newFormattedAddress);
      console.log('Current Address:', newFormattedAddress);
    } catch (error) {
      console.error('Error getting address:', error);
    }
  };

  useEffect(() => {
    // Assuming jsonTrafficData is an array of traffic light objects
    setTrafficLights(jsonTrafficData);
  }, []);

  //Function: Tìm rạp phim gần nhất
  const handleFindNearestCinema = async () => {
    setNearestCinema(null);
    setTheaterMarkers([]);
    setShowCircle(false);
    setShowDirections(false);
    setDistrictBoundary(null);
    try {
      if (currentLocation) {
        let nearestCinema = null;
        let nearestDistance = Infinity;

        cinemaData.forEach(cinema => {
          const { coordinates } = cinema.location;
          const distance = calculateDistance(currentLocation.latitude, currentLocation.longitude, coordinates[1], coordinates[0]);
          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestCinema = cinema;
          }
        });

        if (nearestCinema) {
          setNearestCinema(nearestCinema);

          setRegion({
            latitude: nearestCinema.location.coordinates[1],
            longitude: nearestCinema.location.coordinates[0],
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });

          const address = await Location.reverseGeocodeAsync({
            latitude: nearestCinema.location.coordinates[1],
            longitude: nearestCinema.location.coordinates[0],
          });

          const newFormattedAddress = address
            .map(
              (address) =>
                `${address.streetNumber} ${address.street}, ${address.city}, ${address.region}, ${address.country}`
            )
            .join(', ');

          setFormattedAddress(newFormattedAddress);
          console.log('Nearest Cinema Address:', newFormattedAddress);
        } else {
          console.log('No cinema found');
        }
      } else {
        console.log('Current location not available');
      }
    } catch (error) {
      console.error('Error finding nearest cinema:', error);
    }
  };

  //Function 1: Tìm các rạp phim gần nhất trong bán kính nhất định
  const handleFindNearbyMovieTheaters = async () => {
    setNearestCinema(null);
    setTheaterMarkers([]);
    setShowCircle(false);
    setShowDirections(false);
    setDistrictBoundary(null);
    try {
      if (currentLocation && radius) {
        const radiusInKm = parseFloat(radius);
        const nearbyTheaters = [];

        cinemaData.forEach(cinema => {
          const { coordinates } = cinema.location;
          const distance = calculateDistance(currentLocation.latitude, currentLocation.longitude, coordinates[1], coordinates[0]);
          if (distance <= (radiusInKm * 500)) { // Check if distance is less than or equal to entered km
            nearbyTheaters.push(cinema);
          }
        });

        if (nearbyTheaters.length > 0) {
          const theaterMarkers = nearbyTheaters.map(cinema => ({
            coordinate: { latitude: cinema.location.coordinates[1], longitude: cinema.location.coordinates[0] },
            title: cinema.cinema_name,
            description: cinema.location_name,
          }));

          setTheaterMarkers(theaterMarkers);
          setShowCircle(true);

          const addresses = await Promise.all(nearbyTheaters.map(async (cinema) => {
            const address = await Location.reverseGeocodeAsync({
              latitude: cinema.location.coordinates[1],
              longitude: cinema.location.coordinates[0],
            });
            return address.map(addr =>
              `${addr.streetNumber} ${addr.street}, ${addr.city}, ${addr.region}, ${addr.country}`
            ).join(', ');
          }));

          const formattedAddresses = addresses.join('\n');
          console.log('Nearby Movie Theaters Addresses:', formattedAddresses);
        } else {
          console.log('No nearby movie theaters found');
        }
      } else {
        console.log('Current location or radius not available');
        setRadius('');
      }
    } catch (error) {
      console.error('Error finding nearby movie theaters:', error);
      setRadius('');
    }
  };

  // Function to calculate distance between two coordinates
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // metres
    const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres
    return d;
  };

  //Function: Tìm đường đi ngắn nhất 
  const handleShowDirections = () => {
    setTheaterMarkers([]);
    setShowCircle(false);
    setShowDirections(false);
    setDistrictBoundary(null);
    if (nearestCinema && currentLocation) {
      const fetchRoute = async () => {
        const apiKey = '5b3ce3597851110001cf62484ed9d53e837c4fc695df13f6acd4455a'; // Thay YOUR_API_KEY bằng API key của bạn
        const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${currentLocation.longitude},${currentLocation.latitude}&end=${nearestCinema.location.coordinates[0]},${nearestCinema.location.coordinates[1]}`;

        try {
          const response = await axios.get(url);
          console.log('Đã lấy thông tin đường đi');

          // Kiểm tra xem response.data có tồn tại và có chứa features hay không
          if (response.data && response.data.features && response.data.features.length > 0) {
            const features = response.data.features[0];

            // Kiểm tra xem features.geometry có tồn tại
            if (features.geometry && features.geometry.coordinates) {
              const coords = features.geometry.coordinates.map(point => ({
                latitude: point[1], // latitude
                longitude: point[0], // longitude
              }));
              setRouteCoords(coords);
            } else {
              console.error('Missing geometry in features:', features);
            }
          } else {
            console.error('No features found in response:', response.data);
          }
        } catch (error) {
          console.error('Error fetching route:', error);
        }
      };

      fetchRoute();
      setShowDirections(true);
    } else {
      console.log('Nearest cinema or current location not available');
    }
  };

  //Fucntion: Tìm đường đi ngắn nhất (có tối ưu đèn giao thông)
  const countTrafficLights = (route) => {
    return route.reduce((count, point) => {
      const lat = point[1];
      const lon = point[0];
      return count + trafficLights.filter(light =>
        Math.abs(light.latitude - lat) < 0.0005 && Math.abs(light.longitude - lon) < 0.0005
      ).length;
    }, 0);
  };
  const handleFindOptimizedPath = () => {
    setTheaterMarkers([]);
    setShowCircle(false);
    setShowDirections(false);
    setDistrictBoundary(null);
    if (nearestCinema && currentLocation) {
      const fetchRoute = async () => {
        const apiKey = '5b3ce3597851110001cf62484ed9d53e837c4fc695df13f6acd4455a'; // Thay YOUR_API_KEY bằng API key của bạn
        const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${currentLocation.longitude},${currentLocation.latitude}&end=${nearestCinema.location.coordinates[0]},${nearestCinema.location.coordinates[1]}`;

        try {
          const response = await axios.get(url);
          console.log('Đã lấy thông tin đường đi (đèn giao thông)');
          if (response.data && response.data.features && response.data.features.length > 0) {
            const routes = response.data.features;
            let minTrafficLights = Infinity;
            let bestRoute = [];

            routes.forEach(route => {
              if (route.geometry && route.geometry.coordinates) {
                const numTrafficLights = countTrafficLights(route.geometry.coordinates);
                if (numTrafficLights < minTrafficLights) {
                  minTrafficLights = numTrafficLights;
                  bestRoute = route.geometry.coordinates;
                }
              }
            });

            if (bestRoute.length > 0) {
              const coords = bestRoute.map(point => ({
                latitude: point[1], // latitude
                longitude: point[0], // longitude
              }));
              setRouteCoords(coords);
            } else {
              console.error('No suitable route found');
            }
          } else {
            console.error('No features found in response:', response.data);
          }
        } catch (error) {
          console.error('Error fetching route:', error);
        }
      };

      fetchRoute();
      setShowDirections(true);
    } else {
      console.log('Nearest cinema or current location not available');
    }
  };

  //Function 2: Tìm các rạp phim nằm trong 1 khu vực quận 
  const handleFindCinemasInDistrict = () => {
    setNearestCinema(null);
    setTheaterMarkers([]);
    setShowCircle(false);
    setShowDirections(false);
    setDistrictBoundary(null);
    if (district) {
      const cinemas = cinemaData.filter(cinema => cinema.address.includes(district));
      setCinemasInDistrict(cinemas);

      const districtInfo = districtData.features.find(feature => feature.properties.Ten_Huyen === district);
      if (districtInfo) {
        setDistrictBoundary(districtInfo.geometry.coordinates[0]);
      }

      if (cinemas.length > 0) {
        const districtMarkers = cinemas.map(cinema => ({
          coordinate: { latitude: cinema.location.coordinates[1], longitude: cinema.location.coordinates[0] },
          title: cinema.cinema_name,
          description: cinema.address,
        }));
        setTheaterMarkers(districtMarkers);
        setRegion({
          latitude: cinemas[0].location.coordinates[1],
          longitude: cinemas[0].location.coordinates[0],
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } else {
        console.log('No cinemas found in the district');
      }
      setDistrict('');
    } else {
      setDistrict('');
      console.log('Please enter a district');
    }
  };

  //Function 3: Tìm các rạp phim có rating cao 
  const handleFindCinemasInDistrict2 = () => {
    setNearestCinema(null);
    setTheaterMarkers([]);
    setShowCircle(false);
    setShowDirections(false);
    setDistrictBoundary(null);
    if (ratingThreshold) {
      const cinemas = cinemaData.filter(cinema => cinema.address.includes(district) && cinema.rating > ratingThreshold);
      setCinemasInDistrict(cinemas);

      const districtInfo = districtData.features.find(feature => feature.properties.Ten_Huyen === district);
      if (districtInfo) {
        setDistrictBoundary(districtInfo.geometry.coordinates[0]);
      }

      if (cinemas.length > 0) {
        const districtMarkers = cinemas.map(cinema => ({
          coordinate: { latitude: cinema.location.coordinates[1], longitude: cinema.location.coordinates[0] },
          title: cinema.cinema_name,
          description: cinema.address,
        }));
        setTheaterMarkers(districtMarkers);
        setRegion({
          latitude: cinemas[0].location.coordinates[1],
          longitude: cinemas[0].location.coordinates[0],
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } else {
        console.log('No cinemas found in the district');
      }
      setRatingThreshold('');
    } else {
      setRatingThreshold('');
      console.log('Please enter a district');
    }
  };

  //Function 4: Tìm các rạp phim nằm trong trung tâm thương mai
  const handleFindCinemasInMall = () => {
    setNearestCinema(null);
    setTheaterMarkers([]);
    setShowCircle(false);
    setShowDirections(false);
    setDistrictBoundary(null);
    if (true) {
      console.log(district);
      const cinemas = cinemaData.filter(cinema => cinema.cinema_name.includes('CGV'));
      setCinemasInDistrict(cinemas);

      if (cinemas.length > 0) {
        const districtMarkers = cinemas.map(cinema => ({
          coordinate: { latitude: cinema.location.coordinates[1], longitude: cinema.location.coordinates[0] },
          title: cinema.cinema_name,
          description: cinema.address,
        }));
        setTheaterMarkers(districtMarkers);
        setRegion({
          latitude: cinemas[0].location.coordinates[1],
          longitude: cinemas[0].location.coordinates[0],
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } else {
        console.log('No cinemas found in the district');
      }
      setDistrict('');
    }
  };

  //Function 6: Tìm kiếm rạp phim gần một đoạn đường
  const handleFindCinemasNearRoad = async () => {
    console.log('F6');
  };
  
  //Function x: Thuật toán Dijkstra
  const [start, setStart] = useState('106.8021132,10.870311');
  const [end, setEnd] = useState('106.8000559,10.8752837');
  const [path, setPath] = useState([]);

  const handleFindPath = () => {
    if (nodes[start] && nodes[end]) {
      const shortestPath = dijkstra(start, end, nodes, edges);
      setPath(shortestPath);
      setFunctionX(true);
    } else {
      Alert.alert('Invalid start or end point');
    }
  };

  //Xóa
  const handleDeleteAll = () => {
    setCurrentLocation(null);
    setNearestCinema(null);
    setTheaterMarkers([]);
    setShowCircle(false);
    setShowDirections(false);
    setDistrictBoundary(null);
    setFunctionX(false);
  };

  const handleShowTrafficLights = () => {
    setTrafficShow(!trafficShow);
    setTrafficLights(jsonTrafficData);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View >
          <View>
            {region ? (
              <View style={{ width: 400, height: 850 }}>
                <MapView style={{ width: 400, height: 850 }} region={region}>
                  {/* Hiển thị Marker cho vị trí hiện tại */}
                  {currentLocation && (
                    <Marker
                      coordinate={{ latitude: currentLocation.latitude, longitude: currentLocation.longitude }}
                      title="Vị trí của bạn"
                      description="Ở đây!"
                    >
                      <Image source={customIcon} style={{ width: 50, height: 50 }} />
                    </Marker>
                  )}
                  {showCircle && (
                    <Circle
                      center={currentLocation}
                      radius={radius * 500}
                      strokeColor="#FF0000"
                      fillColor="rgba(255,0,0,0.3)"
                    />
                  )}
                  {/* Hiển thị Markers cho các rạp chiếu phim gần đó */}
                  {theaterMarkers.map((marker, index) => (
                    <Marker
                      key={index}
                      coordinate={marker.coordinate}
                      title={marker.title}
                      description={marker.description}
                    >
                      <Image source={cinemaIcon} style={{ width: 50, height: 50 }} />
                    </Marker>
                  ))}

                  {/* Hiển thị Marker cho rạp chiếu phim gần nhất */}
                  {nearestCinema && (
                    <Marker
                      coordinate={{ latitude: nearestCinema.location.coordinates[1], longitude: nearestCinema.location.coordinates[0] }}
                      title={nearestCinema.cinema_name}
                      description={nearestCinema.location_name}
                    >
                      <Image source={cinemaIcon} style={{ width: 50, height: 50 }} />
                    </Marker>
                  )}
                  {/* Hiển thị các rạp phim trong một quận */}
                  {districtBoundary && (
                    <Polygon
                      coordinates={districtBoundary.map(coord => ({ latitude: coord[1], longitude: coord[0] }))}
                      strokeColor="#FF0000"
                      fillColor="rgba(255,0,0,0.2)"
                      strokeWidth={2}
                    />
                  )}

                  {/* Hiển thị tuyến đường đến rạp chiếu phim gần nhất */}
                  {showDirections && (
                    <Polyline coordinates={routeCoords} strokeColor="#7f0d00" strokeWidth={3} />
                  )}

                  {/* Hiển thị tuyến đường */}
                  {showOptimizedDirections && (
                    <Polyline
                      coordinates={optimalRouteCoords}
                      strokeColor="#7f0d00"
                      strokeWidth={3}
                    />
                  )}

                  {/* Hiển thị tuyến đường đến rạp chiếu phim gần nhất UIT*/}
                  {functionX && (<Polyline
                    coordinates={path.map(coord => ({ latitude: coord[1], longitude: coord[0] }))}
                    strokeColor="#7f0d00"
                    strokeWidth={3}
                  />)}
                  {functionX && (
                    <Marker
                      coordinate={{ latitude: 10.870311, longitude: 106.8021132 }}
                      title="Vị trí của bạn"
                      description="You are here"
                    >
                      <Image source={customIcon} style={{ width: 50, height: 50 }} />
                    </Marker>
                  )}
                  {functionX && (
                    <Marker
                      coordinate={{ latitude: 10.8752837, longitude: 106.8000559 }}
                      title="Vị trí của rạp phim"
                    >
                      <Image source={cinemaIcon} style={{ width: 50, height: 50 }} />
                    </Marker>
                  )}
                  {/*Hiển thị đèn giao thông*/}
                  {trafficShow && (trafficLights.map((light, index) => (
                    <Marker
                      key={index}
                      coordinate={{ latitude: light.latitude, longitude: light.longitude }}
                      title={`Đèn giao thông ${light.id}`}
                    >
                      <Image source={trafficIcon} style={{ width: 25, height: 25 }} />
                    </Marker>
                  )))}
                  {routeCoords.length > 0 && (
                    <Polyline
                      coordinates={routeCoords}
                      strokeWidth={4}
                      strokeColor="blue"
                    />
                  )}
                </MapView>
              </View>
            ) : (
              <View>
                <View style={styles.noImageContainer}>
                  <Text>No location picked yet</Text>
                </View>
              </View>
            )}
          </View>
          <View style={{ position: 'absolute', width: '100%', top: '3%', flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              style={styles.input}
              onPress={() => {
                setNearestCinema(null);
                setTheaterMarkers([]);
                setShowCircle(false);
                setShowDirections(false);
                setDistrictBoundary(null);
                navigation.navigate('Screen1')
              }}
            >
              <Text style={{ paddingTop: 3 }}>Tìm rạp phim...</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.greenBorder} onPress={handleFindNearestCinema}><Image source={require('../assets/cinema_icon.png')} style={styles.image2} /></TouchableOpacity>
            <TouchableOpacity style={styles.greenBorder} onPress={() => { trafficShow ? handleFindOptimizedPath() : handleShowDirections() }}><Image source={require('../assets/destination.png')} style={styles.image2} /></TouchableOpacity>

          </View>
          <View style={{ position: 'absolute', bottom: '16%', right: 10 }}>
            <TouchableOpacity style={styles.greenBorder} onPress={getCurrentLocation}><Image source={require('../assets/placeholder.png')} style={styles.image2} /></TouchableOpacity>
          </View>
          <View style={{ position: 'absolute', bottom: '16%', flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15, marginTop: 5 }}>
            <TouchableOpacity onPress={() => navigation.navigate('Locate')}>
              <View style={styles.greenBorder}>
                <Image source={require('../assets/google-maps.png')} style={styles.image2} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', padding: 10, position: 'absolute', top: '10%' }}>
            <ScrollView horizontal>
              <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.menu}>
                <Text style={{ color: "white", fontWeight: 'bold' }}>Các rạp chiếu phim gần bạn nhất</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible2(true)} style={styles.menu}>
                <Text style={{ color: "white", fontWeight: 'bold' }}>Tìm rạp phim trong khu vực quận</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible3(true)} style={styles.menu}>
                <Text style={{ color: "white", fontWeight: 'bold' }}>Tìm các rạp phim có đánh giá tốt nhất</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleFindCinemasInMall} style={styles.menu}>
                <Text style={{ color: "white", fontWeight: 'bold' }}>Tìm các rạp phim thuộc trung tâm thương mại</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleShowTrafficLights} style={styles.menu}>
                <Text style={{ color: "white", fontWeight: 'bold' }}>{trafficShow ? 'Ẩn đèn giao thông' : 'Hiển thị đèn giao thông'}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleFindCinemasNearRoad} style={styles.menu}>
                <Text style={{ color: "white", fontWeight: 'bold' }}>Tìm rạp phim gần đoạn đường</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleFindPath} style={styles.menu}>
                <Text style={{ color: "white", fontWeight: 'bold' }}>Tìm rạp phim gần UIT</Text>
              </TouchableOpacity>
              {/* Thêm tùy chọn khác nếu cần */}
            </ScrollView>
          </View>
          <View style={{ position: 'absolute', bottom: '16%', left: '40%', backgroundColor: '#7f0d00', borderRadius: 10, width: 100, height: 30 }}>
            <TouchableOpacity title="xóa" onPress={handleDeleteAll} >
              <Text style={{ color: "white", fontWeight: 'bold', padding: 5, alignSelf: 'center' }}>Xóa</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={handleShowTrafficLights} style={styles.menu}>
              <Text style={{ color: "white", fontWeight: 'bold' }}>Hiển thị đèn giao thông</Text>
            </TouchableOpacity> */}

          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible2}
          onRequestClose={() => {
            setModalVisible2(!modalVisible2);
          }}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalView}>
              <TextInput
                style={{
                  borderWidth: 2,
                  borderColor: '#7f0d00',
                  backgroundColor: '#eee',
                  padding: 10,
                  marginTop: 10,
                  width: '95%',
                  borderRadius: 10,
                  height: 50,
                }}
                placeholder="Nhập khu vực quận"
                value={district}
                onChangeText={setDistrict}
              />
              <TouchableOpacity title="Xác nhận" onPress={() => {
                setModalVisible2(false);
                handleFindCinemasInDistrict();
              }} >
                <Text style={{ color: "white", fontWeight: 'bold', marginTop: 10, marginBottom: 5, alignSelf: 'center' }}>Xác Nhận</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible3}
          onRequestClose={() => {
            setModalVisible3(!modalVisible3);
          }}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalView}>
              {/* <TextInput
                style={
                  styles.input2
                }
                placeholder="Nhập khu vực quận"
                value={district}
                onChangeText={setDistrict}
              /> */}
              <TextInput
                style={styles.input2}
                placeholder="Nhập chất lượng đánh giá"
                value={String(ratingThreshold)}
                onChangeText={setRatingThreshold}
                keyboardType="numeric"
              />
              <TouchableOpacity title="Xác nhận" onPress={() => {
                setModalVisible3(false);
                handleFindCinemasInDistrict2();
              }} >
                <Text style={{ color: "white", fontWeight: 'bold', marginTop: 10, marginBottom: 5, alignSelf: 'center' }}>Xác Nhận</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible4}
          onRequestClose={() => setModalVisible4(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalView}>
              <TextInput
                style={styles.input}
                placeholder="Nhập tên đường đi"
                value={roadName}
                onChangeText={setRoadName}
              />
              <Button title="Tìm kiếm" onPress={handleFindCinemasNearRoad} />
              <Button title="Đóng" onPress={() => setModalVisible4(false)} />
            </View>
          </View>
        </Modal> */}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalView}>
              <TextInput
                style={styles.input2}
                placeholder="Nhập bán kính km"
                keyboardType="numeric"
                value={radius}
                onChangeText={setRadius}
              />
              <TouchableOpacity title="Xác nhận" onPress={() => {
                setModalVisible(false);
                handleFindNearbyMovieTheaters();
              }} >
                <Text style={{ color: "white", fontWeight: 'bold', marginTop: 10, marginBottom: 5, alignSelf: 'center' }}>Xác Nhận</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 340,
    height: 210,
    marginBottom: 20,
  },
  noImageContainer: {
    width: 340,
    height: 210,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e1dd',
    marginHorizontal: 10,
  },
  greenBorder: {
    borderWidth: 2,
    borderColor: '#7f0d00',
    width: 50,
    height: 50,
    backgroundColor: '#eee',
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 5,
    alignItems: 'center',
  },
  greenBorder1: {
    width: 50,
    height: 50,
    backgroundColor: '#eee',
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 5,
    alignItems: 'center',
  },
  text: {
    justifyContent: 'center',
    fontSize: 13,
    textAlignVertical: 'center',
    marginRight: 20,
  },
  image2: {
    width: 30,
    height: 30,
    marginTop: 10,
  },
  input: {
    borderWidth: 2,
    borderColor: '#7f0d00',
    backgroundColor: '#eee',
    padding: 10,
    width: '68%',
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 10,
    height: 50,
  },
  input2: {
    borderWidth: 2,
    borderColor: '#7f0d00',
    backgroundColor: '#eee',
    padding: 10,
    marginTop: 10,
    width: '95%',
    borderRadius: 10,
    height: 50,
  },
  menu: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    backgroundColor: '#7f0d00',
    borderRadius: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#7f0d00',
    borderRadius: 20,
    padding: 5,
    paddingHorizontal: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền mờ
  },
});
