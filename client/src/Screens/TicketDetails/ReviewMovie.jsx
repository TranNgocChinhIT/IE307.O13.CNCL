import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import StarRating from 'react-native-star-rating';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const ReviewMovie = () => {
  const route = useRoute();
  const { note } = route.params;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { user, logout } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const userId = note.user.toString();

  const movieId = note.movieScheduleRelationship.movie._id.toString();

  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const handleRating = (rating) => {
    setRating(rating);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/review", {
        user: userId,
        movie: movieId,
        rating: rating,
        comment: comment,
      });
      setLoading(false);
      setPosts([...posts, data?.post]);
      //console.log('Review submitted successfully:', response.data.datas);
    } catch (error) {
      console.error('Error submitting review:', error.message);
    }
    console.log('userID:', userId);
    console.log('movieID:', movieId);
    console.log('Rating:', rating);
    console.log('Comment:', comment);
  };

  return (
    <View style={styles.container}>
      <View style={styles.infor}>
        <Image source={{ uri: note.movieScheduleRelationship.movie.imagePath }} style={styles.cardImage} />
        <Text style={{ marginTop: 10, fontWeight: 'bold', fontSize: 18 }}>{note.movieScheduleRelationship.movie.title}</Text>
      </View>
      <View style={{ marginRight: 20, marginTop: 5 }}>
        <StarRating
          disabled={false}
          maxStars={10}
          rating={rating}
          selectedStar={(rating) => handleRating(rating)}
          fullStarColor="#ffd700"
        />
      </View>
      {/* Comment Input */}
      <TextInput
        style={styles.commentInput}
        placeholder="Nhập ý kiến của bạn..."
        multiline
        numberOfLines={4}
        value={comment}
        onChangeText={(text) => setComment(text)}
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Review</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 30,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    marginTop: 15,
  },
  submitButton: {
    backgroundColor: '#FF3333',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 15,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  cardImage: {
    width: 300,
    height: 400,
  },
  infor: {
    alignItems: 'center',
  },
});

export default ReviewMovie;
