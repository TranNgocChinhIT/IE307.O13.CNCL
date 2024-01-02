import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native';
import axios from "axios";
import StarRating from 'react-native-star-rating';
import { ScrollView } from 'react-native-gesture-handler';
const ReviewDetails = () => {
  const route = useRoute();
  const { note } = route.params;
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("/review");
        setReviews(response.data?.datas);

      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [note.user]);
  const filteredReviews = reviews.filter(
    (item) => item.movie === note._id
  );
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("/user");
        setUsers(response.data?.datas);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);
  // useEffect(() => {
  //   const fetchMovies = async () => {
  //     try {
  //       const response = await axios.get(`/${note.user}`);
  //       setUser(response.data?.datas);
  //     } catch (error) {
  //       console.error("Error fetching movies:", error);
  //     }
  //   };

  //   fetchMovies();
  // }, []);
  const getUserName = (userId) => {
    const user = users.find((user) => user._id === userId);
    return user ? user.userName : "Unknown User";
  };
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };
  return (
    <ScrollView style={styles.container}>

      <View style={{ marginTop: 120, }}>
        <View style={styles.imageBG}></View>
        <Image
          source={{ uri: note.imagePath }}
          style={styles.cardImage}
        />
      </View>
      <Text style={{fontWeight:'bold',alignSelf:'center',fontSize:16,marginTop:10,color:'#FF3333'}}>REVIEWS FOR : {note.title}</Text>
      {filteredReviews.map((review) => (
        <View key={review._id}>
          <Text style={{ fontWeight: 'bold', fontSize: 15, marginTop: 5 }}>{getUserName(review.user)}</Text>

          <Text style={{ marginTop: 5 }}>{review.comment}</Text>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Text>{formatDate(review.createdAt)}</Text>
            <View style={styles.verticalDivider} />
            <View >
              <StarRating
                // disabled={false}
                maxStars={10}
                rating={review.rating}

                fullStarColor="#ffd700"
                starSize={17}
                starStyle={{ marginHorizontal: 2 }}
              />
            </View>
          </View>
          <View style={styles.separator}></View>
        </View>

      ))}
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,

  },
  separator: {
    borderBottomColor: '#808080',
    borderBottomWidth: 0.4,
    marginTop: 10,
    width: 370,
    alignSelf: 'center',
  },
  verticalDivider: {
    height: '80%',
    width: 1,
    backgroundColor: 'gray',
    marginHorizontal: 10,
    marginTop: 2,
  },
  imageBG: {
    width: '100%',
    aspectRatio: 3072 / 1900,
  },
  cardImage: {
    width: '60%',
    aspectRatio: 200 / 300,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    marginTop: 500,
    borderRadius: 3,
  },
});
export default ReviewDetails