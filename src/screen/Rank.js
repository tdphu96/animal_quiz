import React from "react";
import { Text, View, StyleSheet, Dimensions, ImageBackground, TouchableOpacity, Image, ScrollView } from "react-native";
import * as Animatable from "react-native-animatable";
import label from "../asset/icons/label.png";
import close from "../asset/icons/close.png";
import { useNavigation } from "@react-navigation/native";
import man from "../asset/icons/man_1.png";
import button from '../asset/icons/play.png'
import FIRESTORE from "../firebase/firestore";
import useBannerAds from "../hookCustom/useBannerAds";
const { height, width } = Dimensions.get("screen");
const Rank = () => {
  const navigation = useNavigation();
  const users = FIRESTORE.USER.useUsers()
  const AdBanner = useBannerAds();
  const UserRank = (e, i) => {
    let { name, bestLevel, photoURL } = e;
    return (
      <View key={i} style={styles.frame_user}>
        <Text style={{fontSite: 13, color: '#000', width: 25}}>{i+1}</Text>
        <Image source={{ uri: photoURL}} style={{ height: 40, width: 40, marginRight: 15 }} />
        <View>
          <Text style={{ color: '#21460e', fontWeight: "bold", fontSize: 16}}>{name}</Text>
          <Text style={{ color: '#497a2d'}}>lv.{bestLevel}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.frame_rank}>
      <View style={styles.bg_opacity} />
      <Animatable.View
        animation={"zoomIn"}
        duration={200}
        easing="linear">
        <View style={styles.body}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: "absolute", right: -15, top: -15 }}>
            <Image source={close} style={{ height: 40, width: 40 }} />
          </TouchableOpacity>
          <ImageBackground resizeMode={"stretch"} source={label} style={styles.label}>
            <Text style={styles.txt_setting}>Hạng</Text>
          </ImageBackground>
          <ScrollView style={styles.list_user_rank}>
            {users.map((e, i) => {
              return (
                UserRank(e, i)
              );
            })}
          </ScrollView>
        </View>
        {/*<View style={styles.frame_profile_me}>*/}
        {/*  <Text style={{fontSite: 13, color: '#000'}}>30</Text>*/}
        {/*  <Image source={man} style={{ height: 40, width: 40, marginHorizontal: 15 }} />*/}
        {/*  <View style={{flexGrow: 1,}}>*/}
        {/*    <Text>Kỹ lục mới</Text>*/}
        {/*    <Text>20</Text>*/}
        {/*  </View>*/}
        {/*  <TouchableOpacity onPress={() => alert('lưu profile lại')}>*/}
        {/*    <ImageBackground*/}
        {/*      resizeMode={'stretch'} source={button}*/}
        {/*     style={{height: 35, width: 70, justifyContent:"center", alignItems:"center"}}*/}
        {/*    >*/}
        {/*      <Text style={{color: '#FFF'}}>Lưu</Text>*/}
        {/*    </ImageBackground>*/}
        {/*  </TouchableOpacity>*/}
        {/*</View>*/}
      </Animatable.View>
      <View style={{ width, position: "absolute", bottom: 0 }}>
        <AdBanner />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  frame_rank: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bg_opacity: {
    height,
    width,
    backgroundColor: "#000",
    opacity: 0.7,
    position: "absolute",
    top: 0,
  },
  body: {
    borderWidth: 5,
    borderColor: "#ffad00",
    backgroundColor: "#e7c99e",
    minHeight: 300,
    width: width - 50,
    alignItems: "center",
    borderRadius: 20,
  },
  label: {
    width: 300,
    height: 90,
    position: "absolute",
    top: -60,
    justifyContent: "center",
    alignItems: "center",
  },
  txt_setting: {
    top: -15,
    fontSize: 30,
    fontWeight: "bold",
    color: "#91181d",
  },
  list_user_rank: {
    maxHeight: 300,
    width: width - 50,
    paddingHorizontal: 40,
    marginTop: 40
  },
  frame_profile_me: {
    marginTop: 10,
    borderWidth: 5,
    borderRadius: 10,
    borderColor: "#ffad00",
    backgroundColor: "#e7c99e",
    height: 90,
    width: width - 50,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  frame_user: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 50,
    marginBottom: 10,
  },
});
export default Rank;
