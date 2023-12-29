import React, { useState } from 'react';

import { Text, View,StyleSheet,TouchableOpacity,Image } from 'react-native';

const Header = ({imagePath})=>{
    return(
        <TouchableOpacity onPress={()=>{}}>
        <View style={styles.container}>
        
        <Image style={[styles.imageCard]} source={{uri:imagePath}}/>
        
        </View>
      </TouchableOpacity>
    )
};
const styles= StyleSheet.create({
    container:{
        flex:1,
        paddingVertical: '8px',
        paddingHorizontal: '8px',

    },
    text:{
        alignSelf:'center',
        fontSize: 21,
        fontWeight:'bold',
        
    },
    imageCard:{
        borderRadius:10,
        //aspectRatio:2/3,
        width:200,
        height:100,
        marginRight:20,
        marginLeft:20,
        alignSelf:'center',
        marginTop:10,
      },
});

export default Header;
