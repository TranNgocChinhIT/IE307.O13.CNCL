import React, { useState } from "react";

import { Text, TouchableOpacity, StyleSheet } from "react-native";

const ShowListHeader = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    paddingHorizontal: "18px",
    flex: 1,
    paddingVertical: "8px",
    paddingHorizontal: "8px",
    flexDirection: "row",
    marginHorizontal:20,
    color:'#FFFAFA',
    fontWeight:'bold'
  },
  container: {
    flex: 1,
    paddingVertical: "8px",
    paddingHorizontal: "8px",
    color: "Black",
  },
  normalText: {
    color: "red",
    //color: "#FFFAFA",
  },
  pressedText: {
    color: "red", // Màu sắc khi được nhấn
  },
});

export default ShowListHeader;
