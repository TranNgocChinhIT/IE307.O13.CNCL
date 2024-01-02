import { View, Text,StyleSheet,Image } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
const ArticleDetail = () => {
  const route = useRoute();
  const { note } = route.params;
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: note.image }}
                        style={{ width: '100%', height: 200, marginBottom: 8 }}>

      </Image>
      <Text style={{marginTop:10}}>{note.infor1}</Text>
      <Text style={{marginTop:10}}>{note.infor2}</Text>
      <Text style={{marginTop:10}}>{note.infor3}</Text>
      <Text style={{marginTop:10}}>{note.infor4}</Text>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container:{

    flex: 1,
    marginHorizontal:5,
    marginTop:40,
  },
  iconTab: {
    width: 27,
    height: 27,
  },
  iconTabOnPress: {
    width: 40,
    height: 40,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    marginTop: 20,

  },
  activeTabBackground: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 100,
  },
});
export default ArticleDetail