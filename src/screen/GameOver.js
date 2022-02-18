import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, ImageBackground } from "react-native";
import * as Animatable from "react-native-animatable";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../redux/reducers/profileReducer";
import { useNavigation } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import label from "../asset/icons/label.png";
const {height, width} = Dimensions.get('screen')
const GameOver = () => {
  const dispatch = useDispatch()
  const profile = useSelector(state => state.profile);
  const navigation = useNavigation();
  const REPLAY = () => {
    dispatch(setProfile({level: 1,money: 10,heart: 3}))
    navigation.navigate("Home")
  }
  const NEXT_GAME = () => {
    if(profile.money > 300) {
      let newProfile = {lever: profile.lever, money: profile.money - 300, heart: profile.heart + 3}
      dispatch(setProfile(newProfile))
    }else alert('không còn tiền vui long xem quản cáo')
  }
  return (
    <View style={styles.frame_game_over}>
      <View style={styles.bg_opacity}/>
       <Animatable.View
         animation={'zoomIn'}
         duration={200}
         easing="linear">
        <View style={styles.body}>
          <ImageBackground resizeMode={"stretch"} source={label} style={styles.label}>
            <Text style={styles.txt_setting}>KẾT THÚC</Text>
          </ImageBackground>
          <View style={{width: 150, justifyContent:"center", alignItems:"center"}}>
            <Text style={{fontSize: 20, color: '#000'}}>Kết quả</Text>
            <Text style={{fontSize: 35, color: '#000'}}>{profile.level}</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.button}>
              <Text>Tặng 300 xu khi xem quảng cáo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={NEXT_GAME}
              style={styles.button}
            >
              <Text>Dùng 300 xu để chơi tiếp</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={REPLAY}
              style={styles.button}
            >
              <Text>Chơi lại</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.frame_profile_me}>
          <View>
            <FontAwesome5 name={'user'}/>
          </View>
          <Text>Lưu profile</Text>
        </View>
       </Animatable.View>
      <View style={{height: 80, width, position: 'absolute', bottom: 0, backgroundColor: 'green'}}>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  frame_game_over: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
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
    alignItems: "center"
  },
  txt_setting:{
    top: -15,
    fontSize: 30,
    fontWeight: "bold",
    color: "#91181d",
  },
  button: {
    height: 48,
    borderRadius: 5,
    marginBottom: 15,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF'
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
  }
})
export default GameOver
