import React,{useState} from "react";
import { View, Text,Alert, Image, StyleSheet,Switch,TextInput,Button } from "react-native";


const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [faqs, setFaqs] =useState([]);

  const handleOnDarkModeChange = () => {
    setDarkMode(!darkMode);
  };
  const handleOnNotifications = () => {
    setNotifications(!notifications);
  };
  const handleOnSendFeedbackClick = () => {
    if (feedback.trim() === ''){
      return;
    }
    if (notifications){
      Alert.alert('Message','Thank you for your feedback');
    }
    const newFaqs = [ feedback,...faqs];
    setFaqs(newFaqs);
    setFeedback('');
  }
  return (
      <View style={[styles.container,
          darkMode && styles.darkContainer]}>
        <View style={styles.Appcontainer}>
          <Image
            source={{ uri: 'https://i.pinimg.com/736x/ab/cb/a3/abcba3c2d536db24e37c308fb69221d0.jpg' }}
            style={styles.logo}
          />
      
        <Text style={[styles.textBold,
        darkMode && styles.darkColor]}>Sukuna</Text>
        </View>
        <View style={styles.switch}>
          <Text style={[styles.text,
          darkMode && styles.darkColor]}>Dark mode</Text>
          <Switch
            value={darkMode}
            onValueChange={handleOnDarkModeChange}
          />
        </View>
        <View style={styles.switch}>
          <Text style={[styles.text,
          darkMode && styles.darkColor]}>Notifications</Text>
          <Switch
            value={notifications}
            onValueChange={handleOnNotifications}
          />
        </View>
        <Text style={[styles.textBold,
         darkMode && styles.darkColor]}>Feedback</Text>
        <TextInput
          placeholder="Type your feedback here..."
          multiline
          numberOfLines={5}
          style={[styles.feedbackInput,
          darkMode && styles.feedbackInputDark]}
          value={feedback}
          onChangeText={(text) =>setFeedback(text)
          }
        />
        <Button title="SEND FEEDBACK" onPress={handleOnSendFeedbackClick } />
        <Text style={[styles.textBold,
         darkMode && styles.darkColor]}>Frequently Asked Questions:</Text>
        <View>
          {faqs.map((faq,index) => (
            <Text key={(index)} style={[styles.text,
              darkMode && styles.darkColor]}>Q : {faq}</Text>
          ))}
        </View>
      </View>
    );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:15,
    paddingTop:50,
  },
  Appcontainer:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  switch:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  feedbackInput:{
    borderWidth:1,
    borderRadius:5,
    padding:5,
    marginVertical:10,
  },
  feedbackInputDark:{
    borderWidth:1,
    borderRadius:5,
    padding:5,
    marginVertical:10,
    borderColor:'#fff',
    color:'#fff',
    backgroundColor:'#696969',
  },
  textBold:{
    fontWeight:'bold',
    fontSize:18,
    marginVertical:10,
    color:'#000',
  },
  darkContainer:{
    backgroundColor:"#000",
  },
  text:{
    color:'#000',
    fontSize:14,
  },
  darkColor:{
    color:"#fff",
  },
});
