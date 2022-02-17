import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import * as Animatable from "react-native-animatable";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../redux/reducers/profileReducer";
import { useNavigation } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
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
        easing="linear"
        style={styles.body}>
        <Text style={{fontSize: 30, color: '#FFF'}}>KẾT THÚC</Text>
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
      </Animatable.View>
      <View style={{
        marginTop: 10,
        borderRadius: 10,
        padding: 10,
        backgroundColor: "#f5cb86",
        minHeight: 100,
        width: width - 50,
      }}>
        <View>
          <FontAwesome5 name={'user'}/>
        </View>
        <Text>Lưu profile</Text>
      </View>
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
    backgroundColor: "#f5cb86",
    minHeight: 300,
    width: width - 50,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 48,
    borderRadius: 5,
    marginBottom: 15,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF'
  }
})
export default GameOver
