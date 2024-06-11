import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
const Map = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate("MapList")}
        >
          <View style={styles.iconContainer}>
            <Image
              source={require("../../assets/image/news.png")}
              style={styles.icon}
            />
          </View>
          <Text style={styles.label}>Danh Sách Các Rạp</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate("Map2d")}
        >
          <View style={styles.iconContainer}>
            <Image
              source={require("../../assets/image/news.png")}
              style={styles.icon}
            />
          </View>
          <Text style={styles.label}>Tìm Rạp Gần Nhất</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate("MapPolyLine")}
        >
          <View style={styles.iconContainer}>
            <Image
              source={require("../../assets/image/news.png")}
              style={styles.icon}
            />
          </View>
          <Text style={styles.label}>Xem Vị Trí Rạp Trên Bản Đồ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate("MapNearPolyline")}
        >
          <View style={styles.iconContainer}>
            <Image
              source={require("../../assets/image/news.png")}
              style={styles.icon}
            />
          </View>
          <Text style={styles.label}>Tìm Kiếm Rạp Theo Địa Điểm</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.item}>
          <View style={styles.iconContainer}>
            <Image
              source={require("../../assets/image/news.png")}
              style={styles.icon}
            />
          </View>
          <Text style={styles.label}>Các Rạp Gần Tốt Nhất</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <View style={styles.iconContainer}>
            <Image
              source={require("../../assets/image/news.png")}
              style={styles.icon}
            />
          </View>
          <Text style={styles.label}>Các Rạp Có Bình Luận Tốt Nhất</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f3f1",
    padding: 16,
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  item: {
    flex: 1,
    alignItems: "center",
    margin: 8,
  },
  iconContainer: {
    backgroundColor: "#fff", // White background for icon container
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  icon: {
    width: 40,
    height: 40,
  },
  label: {
    fontSize: 16,
    textAlign: "center",
    backgroundColor: "#7f0d00", // Background color for the label
    color: "#fff", // White text color
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: "100%",
  },
});

export default Map;
