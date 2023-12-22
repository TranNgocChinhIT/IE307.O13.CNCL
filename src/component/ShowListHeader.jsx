import React, { useState } from "react";

import { Text, View, StyleSheet } from "react-native";

const ShowListHeader = (props) => {
  return <Text style={styles.text}>{props.title}</Text>;
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
});

export default ShowListHeader;
