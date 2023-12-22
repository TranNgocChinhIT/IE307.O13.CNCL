// MainMovieCard.js
import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';


const MainMovieCard = ({ imagePath, title, props,evaluate,time }) => {

  return (

    <TouchableOpacity onPress={() => { }}>
      <View style={
        styles.container
      }>
        <Image style={[styles.imageCard]} source={{ uri: imagePath }} />
        
        {/* <Text style={styles.text} >fdfdf</Text> */}
       
       <View>
          <View style={styles.contentContainer}>
          <Image
          source={require("../assets/image/star.png")}
          style={{ width: 13, height: 13 }}
        />
        <Text style={styles.vote}>{evaluate}</Text>
        <Image
          source={require("../assets/image/time.png")}
          style={{ width: 11, height: 11, marginLeft:14 }}
        />
        <Text style={styles.vote}>{time}</Text>
          </View>
          <Text style={styles.text} numberOfLines={1}>{title}</Text>
        </View>

      </View>
    </TouchableOpacity>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  text: {
    color: 'black',
    fontSize: 15,

    textAlign: 'center',
    paddingVertical: 10,

  },
  imageCard: {
    borderRadius: 10,
    width: 260,
    height: 350,
    marginRight: 20,
    marginLeft: 20,
    alignSelf: 'center',
    marginTop: 20,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  icon: {
    fontSize: 20,
    color: 'yellow',
  },
  vote: {
    color: 'black',
    fontSize: 15,
    marginLeft:7,

    textAlign: 'center',
    paddingVertical: 10,

  },
});

export default MainMovieCard;
