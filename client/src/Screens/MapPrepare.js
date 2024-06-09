import React, { useEffect, useRef } from "react";
import {
  View,
  Image,
  StyleSheet,
  Animated,
  Easing,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function MapPrepare() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        <Image
          source={require("../assets/image/mapload.gif")}
          style={styles.mapImage}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  mapContainer: {
    position: "relative",
  },
  mapImage: {
    height: 200,
    width: 200,
    borderRadius: 10,
  },
});
