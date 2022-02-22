import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Image,
  Linking,
  Share
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {setClick, setMusic} from "../redux/reducers/settingReducer";
import frame_setting from '../asset/icons/frame_setting.png'
import button1 from '../asset/icons/play.png'
import close from '../asset/icons/close.png'
import label from '../asset/icons/label.png'
import useClickSound from "../hookCustom/useClickSound";
import useBannerAds from "../hookCustom/useBannerAds";
import AUTH from "../firebase/auth";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const { width, height } = Dimensions.get("screen");
const Setting = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const AdBanner = useBannerAds()
  const settings = useSelector(state => state.settings);
  const { soundClick } = useClickSound()
  const user = AUTH.useUserCurrent();
  const save = async () => {
    try {
      soundClick();
      if (!user) await AUTH.loginGoogle();
      else await AUTH.logout();
    } catch (e) {
      console.log(e)
    }
  };
  const share = async () => {
    try {
      await Share.share(
          {
            message: 'https://play.google.com/store/apps/details?id=com.haithangban.dongvatnhinhinhdoanten&hl=vi&gl=US',
            title:'Chia sẻ'
          },
          {
            dialogTitle:'ĐỐ VUI DÂN GIAN'
          }
      )
    } catch (error) {
      console.log(error)
    }

  }
  const Volume = () => {
    dispatch(setClick(!settings.click));
    soundClick();
  }
  const Music = () => {
    dispatch(setMusic(!settings.music))
    soundClick()
  }
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
          <TouchableOpacity onPress={save}>
            <ImageBackground resizeMode={"stretch"} source={button1} style={styles.btt_button}>
              <Text style={styles.txt_btt}>
                {user ? "Đăng xuất" : "Lưu hồ sơ"}
              </Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity onPress={share}>
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
          <TouchableOpacity onPress={Volume}>
            <ImageBackground resizeMode={'stretch'} source={button1} style={{height: 48, width: 48, justifyContent:"center", alignItems:"center"}}>
              <MaterialCommunityIcons name={settings.click ? 'volume-high':'volume-off'} size={20} color={'#FFF'}/>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity onPress={Music}>
            <ImageBackground resizeMode={'stretch'} source={button1} style={{height: 48, width: 48, justifyContent:"center", alignItems:"center"}}>
              <MaterialCommunityIcons name={settings.music ? 'music':'music-off'} size={20} color={'#FFF'}/>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </Animatable.View>
      <View style={{ width, position: "absolute", bottom: 0 }}>
        <AdBanner />
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
