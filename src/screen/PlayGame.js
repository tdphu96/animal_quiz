import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Linking,
  Dimensions,
  Image,
  Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { setProfile } from "../redux/reducers/profileReducer";
import { useDispatch, useSelector } from "react-redux";
import useMusicSound from "../hookCustom/useMusicSound";
import useClickSound from "../hookCustom/useClickSound";
import play from '../asset/icons/play.png';
import frame_play from '../asset/icons/frame_play.png'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { setClick, setMusic } from "../redux/reducers/settingReducer";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AUTH from "../firebase/auth";
const {height, width} = Dimensions.get('screen')
const PlayGame = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const profile = useSelector(state => state.profile);
  const settings = useSelector(state => state.settings);
  useMusicSound()
  const { soundClick } = useClickSound()

  const openRank = () => {
    if (!AUTH.isLogin()) return Alert.alert(
        "",
        "Bạn chưa lưu tiến trình chơi !",
        [
          {
            text: "Lưu ngay",
            onPress: () => AUTH.loginGoogle().then( res => {
              try {
                if (res.user) navigation.navigate('Rank')
              } catch (e) {
                console.log(e)
              }
            }),
          },
          {
            text: "Không",
            onPress: () => {},
            style: "cancel",
          },
        ],
    );
    navigation.navigate('Rank')
  }

  const PLAY_GAME = () => {
    if(profile.level > 1) return (
      <View>
        <TouchableOpacity onPress={() =>{
          soundClick()
          navigation.navigate('Home')
        }}>
          <ImageBackground resizeMode={'stretch'} source={play} style={styles.button_play}>
            <Text style={styles.txt_play}>{profile.level === 1 ? 'Chơi' : 'Tiếp tục'}</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          soundClick()
          dispatch(setProfile({ level: 1, money: 10, heart: 3,}))
          navigation.navigate('Home')
        }}>
          <ImageBackground resizeMode={'stretch'} source={play} style={styles.button_play}>
            <Text style={styles.txt_play}>Chơi mới</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    )
    else return (
      <TouchableOpacity onPress={() => {
        soundClick()
        dispatch(setProfile({ level: 1, money: 10, heart: 3,}))
        navigation.navigate('Home')
      }}>
        <ImageBackground resizeMode={'stretch'} source={play} style={styles.button_play}>
          <Text style={styles.txt_play}>Chơi</Text>
        </ImageBackground>
      </TouchableOpacity>
    )
  }
  return (
    <ImageBackground source={frame_play} style={styles.frame_play_game}>
      <View style={styles.body}>
        <View style={styles.frame_name_game}>
          <Text style={styles.txt_quiz}>ĐOÁN TÊN</Text>
          <Text style={styles.title_animal}>ĐỘNG VẬT</Text>
        </View>
        {PLAY_GAME()}
      </View>
      <TouchableOpacity onPress={() => {
        soundClick()
        navigation.navigate('OptionGame')
      }}>
        <ImageBackground resizeMode={'stretch'} source={play} style={styles.button_play}>
          <Text style={styles.txt_play}>Thêm</Text>
        </ImageBackground>
      </TouchableOpacity>
      <View style={styles.group_button_action}>
        <TouchableOpacity onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.haithangban.dovuidangian&hl=vi&gl=US&showAllReviews=true')}>
          <ImageBackground resizeMode={'stretch'} style={styles.button_star} source={play}>
            <FontAwesome name={"star"} size={25} color={'#FFF'} />
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity onPress={openRank}>
          <ImageBackground resizeMode={'stretch'} style={styles.button} source={play}>
            <FontAwesome name={"bar-chart"} size={25} color={'#FFF'} />
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(setMusic(!settings.music))}>
          <ImageBackground resizeMode={'stretch'} style={styles.button} source={play}>
            <MaterialCommunityIcons name={settings.music ? "music" : "music-off"} size={25} color={'#FFF'} />
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(setClick(!settings.click))}>
          <ImageBackground resizeMode={'stretch'} style={styles.button_volume} source={play}>
            <MaterialCommunityIcons name={settings.click ? "volume-high" : 'volume-off'} size={25} color={'#FFF'} />
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  frame_play_game: {
    flex: 1,
    backgroundColor: "#f5cb86",
    justifyContent: "center",
    alignItems: "center",
  },
  frame_name_game: {
    top: -30,
    borderWidth: 5,
    borderColor: '#ffad00',
    padding: 30, backgroundColor: '#FFF',
    borderRadius: 10, justifyContent:'center', alignItems:'center'
  },
  body: {
    alignItems:'center',
  },
  txt_quiz: {
    color: "#054818",
    fontSize: 40,
    fontWeight: "bold",
  },
  title_animal: {
    color: "#91181d",
    fontSize: 26,
    fontWeight: "700",
  },
  button_play: {
    marginTop: 15,
    padding: 15,
    width: 140,
    justifyContent: "center",
    alignItems: "center",
  },
  txt_play: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  group_button_action: {
    width: 280,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30
  },
  button_star: {
    top: -30,
    height: 50,
    width: 50,
    justifyContent:'center',
    alignItems:'center',
  },
  button_volume: {
    top: -30,
    height: 50,
    width: 50,
    justifyContent:'center',
    alignItems:'center',
  },
  button: {
    height: 50,
    width: 50,
    justifyContent:'center',
    alignItems:'center',
  },
  grass: {
    position: 'absolute',
    bottom: 0,
    height: height * 0.6,
    width,
  },
});
export default PlayGame;
