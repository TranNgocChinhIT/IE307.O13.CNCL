import React, { useState } from "react";
import { StyleSheet, View, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function Locate({ navigation }) {
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 10.766967628536952,
    longitude: 106.69242225169049,
  });

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  };

  const handleSaveLocation = () => {
    if (selectedLocation) {
      navigation.navigate("HomeScreen", { selectedLocation });
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        onPress={handleMapPress}
        initialRegion={{
          latitude: 10.766967628536952,
          longitude: 106.69242225169049,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {selectedLocation && <Marker coordinate={selectedLocation} />}
      </MapView>
      <View style={styles.buttonContainer}>
        <Button
          title="Save Location"
          onPress={handleSaveLocation}
          color="#7f0d00" // Đặt màu nút tại đây
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    margin: 10,
    borderRadius: 10,
    overflow: "hidden", // Để đảm bảo nút
  },
});
