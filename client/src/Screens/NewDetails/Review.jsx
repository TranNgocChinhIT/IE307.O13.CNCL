import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import StarRating from 'react-native-star-rating';
import { useRoute } from '@react-navigation/native';
const Review = () => {
  const route = useRoute();
  const { note } = route.params;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleRating = (rating) => {
    setRating(rating);
  };

  const handleSubmit = () => {

    console.log('Rating:', rating);
    console.log('Comment:', comment);

  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Đánh giá</Text>


      <View style={{ marginRight: 20, }}>

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
        <Text style={styles.submitButtonText}>Gửi Đánh Giá</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //  padding: 20,
    marginHorizontal: 10,
    marginTop: 30,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    marginTop:15,
  },
  submitButton: {
    backgroundColor: '#2196f3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

});

export default Review;
