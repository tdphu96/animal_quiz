import React, { useState } from "react";
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Image, ImageBackground } from "react-native";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import close from "../asset/icons/close.png";
import button1 from "../asset/icons/play.png";
import useBannerAds from "../hookCustom/useBannerAds";
import useRewardedAds from "../hookCustom/useRewardedAds";
import {setMoney} from "../redux/reducers/profileReducer";
import label from '../asset/icons/label.png'
const {width, height} = Dimensions.get('window')
const WatchADS = () => {
  const navigation = useNavigation()
  const { showRewardedAds } = useRewardedAds({ key: 'money', setStateKey: setMoney});
  const AdBanner = useBannerAds()
  const ads = () => {
    showRewardedAds()
  }

  return (
    <View style={styles.frame_watch_ads}>
      <View style={styles.bg_opacity}/>
      <Animatable.View
        animation={'zoomIn'}
        duration={200}
        easing="linear"
        style={styles.body_watch_ads}>
        <ImageBackground resizeMode={'stretch'} source={label} style={styles.label}>
          <Text style={styles.txt_setting}>Thêm xu</Text>
        </ImageBackground>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{position:"absolute", right: -15, top: -15}}>
          <Image source={close} style={{height: 40, width: 40}}/>
        </TouchableOpacity>
        <Text style={{ color: '#91181d', fontSize: 20, fontWeight: "bold" }}>Miễn phí xu</Text>
        <Text style={{ color: '#91181d', fontSize: 20, }}>Xem video để nhận xu miễn phí</Text>
        <TouchableOpacity onPress={ads}>
          <ImageBackground resizeMode={'stretch'} source={button1} style={styles.btt_button}>
            <Text style={{color:'#FFF'}}>XEM</Text>
          </ImageBackground>
        </TouchableOpacity>
      </Animatable.View>
      <View style={{ width, position: "absolute", bottom: 0 }}>
        <AdBanner />
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
  label: {
    width: 300,
    height: 90,
    position: "absolute",
    top: -60,
    justifyContent: "center",
    alignItems: "center"
  },
  txt_setting:{
    top: -15,
    fontSize: 30,
    fontWeight: "bold",
    color: "#91181d",
  },
})
export default WatchADS
