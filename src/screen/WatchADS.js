import React, { useState } from "react";
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Image, ImageBackground } from "react-native";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import close from "../asset/icons/close.png";
import button1 from "../asset/icons/play.png";
const {width, height} = Dimensions.get('window')
const WatchADS = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.frame_watch_ads}>
      <View style={styles.bg_opacity}/>
      <Animatable.View
        animation={'zoomIn'}
        duration={200}
        easing="linear"
        style={styles.body_watch_ads}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{position:"absolute", right: -15, top: -15}}>
          <Image source={close} style={{height: 40, width: 40}}/>
        </TouchableOpacity>
        <Text>Miễn phí xu</Text>
        <Text>Xem video để nhận xu miễn phí</Text>
        <TouchableOpacity onPress={() => alert('xem qc')}>
          <ImageBackground resizeMode={'stretch'} source={button1} style={styles.btt_button}>
            <Text style={{color:'#FFF'}}>XEM</Text>
          </ImageBackground>
        </TouchableOpacity>
      </Animatable.View>
      <View style={{height: 80, width, position: 'absolute', bottom: 0, backgroundColor: 'green'}}>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  frame_watch_ads: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bg_opacity: {
    height,
    width,
    backgroundColor: "#000",
    opacity: 0.7,
    position: "absolute",
    top: 0,
  },
  body_watch_ads: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#ffad00',
    backgroundColor: "#e7c99e",
    minHeight: 300,
    width: width - 50,
    borderRadius: 20,
  },
  btt_button: {
    marginTop: 15,
    height: 50,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
  },
})
export default WatchADS
