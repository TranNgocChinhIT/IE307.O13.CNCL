import { View, Text, StyleSheet, Dimensions, Image, FlatList,TouchableOpacity,Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import { dataTheater } from '../../data/dataTheater';
import { ScrollView } from 'react-native-gesture-handler';
import Casousel from 'react-native-snap-carousel';
const { width: screenWidth } = Dimensions.get('window');
import MapView from 'react-native-maps';
const Theater = () => {
  const [mapHeight, setMapHeight] = useState(200);
  const sliderWidth = screenWidth;
  const itemWidthHeader = screenWidth * 1;

  const renderItemHeader = ({ item }) => (
    <View style={styles.itemHeaderContainer}>
      <Image source={{ uri: item.images }} style={styles.itemHeader}></Image>
    </View>
  );

  const openGoogleMaps = () => {
    const latitude = 10.827815; 
    const longitude = 106.72123; 
    const label = "Googleplex"; 

    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=driving&dir_action=navigate`;

    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.error("Cannot open Google Maps");
      }
    });
  };
  return (
    <ScrollView style={styles.container}>
      <View style={{ marginTop: 15, marginHorizontal: 10, flexDirection: 'row' }}>
        <Text style={{ color: '#7f0d00', fontSize: 18 }}>CGV</Text>
        <Text style={{ fontSize: 18, marginLeft: 5 }}>Giga Mall Thủ Đức</Text>
      </View>
      <View >
        <Casousel

          autoplay={true}
          autoplayTimeout={10}
          data={dataTheater}
          renderItem={renderItemHeader}
          sliderWidth={sliderWidth}
          itemWidth={itemWidthHeader}
          loop
        />
      </View>
      <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', marginHorizontal: 10 }}>
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require("../../assets/image/dollar.png")}
            style={styles.imageIcon}

          />
          <Text style={{ fontSize: 16, justifyContent: 'center', alignSelf: 'center' }}>
            Ticket price
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require("../../assets/image/showtime.png")}
            style={styles.imageIcon}

          />
          <Text style={{ fontSize: 16, justifyContent: 'center', alignSelf: 'center' }}>
            Showtime
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require("../../assets/image/call.png")}
            style={styles.imageIcon}

          />
          <Text style={{ fontSize: 16, justifyContent: 'center', alignSelf: 'center', }}>
            Call
          </Text>
        </View>
      </View>
      <View style={styles.separator}></View>
      <View>
        <TouchableOpacity onPress={openGoogleMaps}>
          <Text> Mở Map</Text>
         
        </TouchableOpacity>
        <MapView
        style={{width:'100%',height:mapHeight }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemHeaderContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  itemHeader: {
    width: 400,
    height: 200,
    marginHorizontal: 10,
    borderRadius: 8,
    resizeMode: 'cover',
    borderWidth: 3,
  },
  imageIcon: {
    width: 23,
    height: 23,
    margin: 5,
  },
  separator: {
    borderBottomColor: '#CDCDC1',
    borderBottomWidth: 2.5,
    marginTop: 10,
    width: 390,

    alignSelf: 'center',
  },
});

export default Theater;
