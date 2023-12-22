import React, { useState, useEffect } from 'react';
import { View, Image, Button, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const Account = () => {
  const [image, setImage] = useState();

  const [modalVisible, setModalVisible] = useState(false);

  const uploadImage = async () => {
    try {
      await ImagePicker.
        ImagePicker.requestCameraPermissionsAsync();
      let result = await ImagePicker.
        launchCameraAsync({
          cameraType: ImagePicker.CameraType.front,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      if (!result.canceled) {

        await saveImage(result.assets[0].uri);
      }
    } catch (error) {
      alert("Eroor uploading iamge: " + error.message);
      setModalVisible(false);
    }
  }
  const saveImage = async () => {
    try {
      setImage(image);
      setModalVisible(false);
    } catch (error) {
      throw error;
    }
  }
  return (
    <View style={styles.container}>
      <View style={{marginTop:20,}}>
        <Image
          source={require("../assets/image/panda.png")}
          style={{ width: 100, height: 100, borderRadius:100, }}
        />
      </View>
      <Button title="Chọn ảnh" onPress={uploadImage} />
      {image && <Image source={{ uri: { image } }} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginTop: 10,
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
});

export default Account;
