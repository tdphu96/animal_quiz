import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, ImageBackground, Image } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setMusic } from "../redux/reducers/settingReducer";
import frame_setting from '../asset/icons/frame_setting.png'
import button1 from '../asset/icons/play.png'
import close from '../asset/icons/close.png'
import label from '../asset/icons/label.png'
import useClickSound from "../hookCustom/useClickSound";
const { width, height } = Dimensions.get("screen");
const Setting = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const settings = useSelector(state => state.settings);
  const { soundClick } = useClickSound()
  return(
    <View style={styles.frame_setting}>
      <View style={styles.bg_opacity}/>
      <Animatable.View
        animation={'zoomIn'}
        duration={200}
        easing="linear"
        source={frame_setting} style={styles.body_setting}>
        <ImageBackground resizeMode={'stretch'} source={label} style={styles.label}>
          <Text style={styles.txt_setting}>Cài đặt</Text>
        </ImageBackground>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{position:"absolute", right: -15, top: -15}}>
          <Image source={close} style={{height: 40, width: 40}}/>
        </TouchableOpacity>
        <View style={{paddingTop: 60}}>
          <TouchableOpacity onPress={() => soundClick()}>
            <ImageBackground resizeMode={"stretch"} source={button1} style={styles.btt_button}>
              <Text style={styles.txt_btt}>Lưu hồ sơ</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => soundClick()}>
            <ImageBackground resizeMode={"stretch"} source={button1} style={styles.btt_button}>
              <Text style={styles.txt_btt}>chia sẻ</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity onPress={() =>{
            soundClick()
            navigation.navigate('PlayGame')
          }}>
            <ImageBackground resizeMode={"stretch"} source={button1} style={styles.btt_button}>
              <Text style={styles.txt_btt}>Home</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View style={{position:"absolute", bottom: -53, flexDirection:'row', justifyContent:'space-between', width: 180}}>
          <TouchableOpacity>
            <ImageBackground resizeMode={'stretch'} source={button1} style={{height: 48, width: 48, justifyContent:"center", alignItems:"center"}}>
              <FontAwesome5 name={'volume-up'} size={20} color={'#FFF'}/>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch(setMusic(!settings.music))}>
            <ImageBackground resizeMode={'stretch'} source={button1} style={{height: 48, width: 48, justifyContent:"center", alignItems:"center"}}>
              <FontAwesome5 name={'music'} size={20} color={'#FFF'}/>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </Animatable.View>
      <View style={{height: 80, width, position: 'absolute', bottom: 0, backgroundColor: '#FFF'}}>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  frame_setting: {
    flex:1,
    justifyContent: 'center',
    alignItems:'center'
  },
  bg_opacity: {
    height,
    width,
    backgroundColor: "#000",
    opacity: 0.7,
    position: "absolute",
    top: 0,
  },
  body_setting: {
    borderWidth: 5,
    borderColor: '#ffad00',
    backgroundColor: "#e7c99e",
    minHeight: 300,
    width: width - 50,
    alignItems: 'center',
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
  btt_button: {
    marginBottom: 15,
    width: 150,
    height: 50,
    justifyContent:"center",
    alignItems:"center"
  },
  txt_btt: {
    color:'#FFF',
    fontSize: 20
  }
})
export default Setting
