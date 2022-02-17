import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Vibration, Dimensions, ImageBackground } from "react-native";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { dong_vat_co_vu } from "../data/amimal";
import { shuffle } from "../mFun";
import { setHeart } from "../redux/reducers/profileReducer";
import useClickSound from "../hookCustom/useClickSound";
import frame_money from '../asset/icons/frame_money.png';
import setting_group from '../asset/icons/setting_group.png';
import FontAwesome from "react-native-vector-icons/FontAwesome";
const { width } = Dimensions.get("screen");
const Home = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const profile = useSelector(state => state.profile);
  const settings = useSelector(state => state.settings)
  const [question, setQuestion] = useState(dong_vat_co_vu[profile.level]);
  const [option, setOption] = useState([])
  const [replies, setReplies] = useState([])
  const { soundClick } = useClickSound()
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      let q = { ...dong_vat_co_vu[profile.level] }
      setQuestion(q);
      let temp = dong_vat_co_vu.filter(e => e.answer !== question.answer)
      let array_new = shuffle([...shuffle(temp).slice(0, 3), dong_vat_co_vu[profile.level]])
      setOption([...array_new])
      setReplies([])
    })
    return unsubscribe
  }, [profile.level])
  const CHOOSE_ANSWER = (e) => {
    soundClick()
    if(profile.heart === 0) return;
    setReplies([...replies, e.answer])
    if(e.answer === question.answer) {
      let abc = setTimeout(() => {
        navigation.navigate("WinGame", { answer: question.answer, profile });
        clearTimeout(abc)
      }, 100)
    }else {
      settings.vibrate && Vibration.vibrate(500)
      const newHeart = profile.heart - 1
      dispatch(setHeart(newHeart));
    }
  }
  const image_animal = useRef()
  const frame_option = useRef()
  useEffect(() => {
    image_animal.current.zoomIn()
    frame_option.current.slideInRight()
  }, [profile.level])
  useEffect(() => {
    if(profile.heart === 0) return navigation.navigate('GameOver')
  }, [profile.heart])
  return (
    <View style={styles.frame_home}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() =>{
          soundClick()
          navigation.navigate('Setting')
        }} >
          <ImageBackground
            resizeMode={'contain'} source={setting_group}
           style={styles.image_setting_button}
          >
            <Text style={{fontSize: 13, color:'#FFF'}}>Câu {profile.level}</Text>
          </ImageBackground>
        </TouchableOpacity>
        <View style={styles.frame_heart}>
          {[...Array(3).keys()].map(e=> {
            return (
              <FontAwesome key={e} style={{marginHorizontal: 5}} name={'heart'} color={profile.heart > e ? 'red' : 'gray'} size={25}/>
            )
          })}
        </View>
        <TouchableOpacity onPress={() => {
          soundClick()
          navigation.navigate('WatchADS')
        }}>
          <ImageBackground resizeMode={'contain'} source={frame_money} style={styles.image_button_money}>
              <Text style={{fontSize: 13, color:'#FFF'}}>{profile.money}</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
      <View style={styles.frame_image_question}>
        <Animatable.Image
          ref={image_animal}
          duration={500}
          easing="linear"
          style={styles.image_question}
          source={question.image}
          resizeMode={"contain"}
        />
      </View>
      <Animatable.View
        ref={frame_option}
        duration={500}
        easing="linear"
        style={styles.group_option}>
        {option.map((e, i) => {
          return (
            <TouchableOpacity
              onPress={() => CHOOSE_ANSWER(e)}
              key={i}
              style={[styles.item_option, {backgroundColor: replies.includes(question.answer) ? (e.answer === question.answer && 'green') : replies.includes(e.answer) ? 'red' : 'oldlace' }]}
            >
              <Text style={[styles.txt_option, {color: replies.includes(question.answer) ? (e.answer === question.answer && '#FFF') : replies.includes(e.answer) ? '#FFF' : 'coral'}]}> {e.answer} </Text>
            </TouchableOpacity>
          );
        })}
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  frame_home: {
    flex: 1,
    backgroundColor: "#f5cb86",
  },
  header: {
    top: -10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image_setting_button: {
    width: 150,
    height: 70,
    left:-15,flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"center",
  },
  frame_heart: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"center"
  },
  image_button_money:{
    width: 150,
    height: 70,
    right:-10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"center"
  },
  frame_image_question: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center",
  },
  image_question: {
    backgroundColor: '#FFF',
    borderWidth: 0.1,
    borderColor: '#FFF',
    borderRadius: 1,
    width,
    maxHeight: 300,
  },
  group_option: {
    marginVertical: 50,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  item_option: {
    paddingHorizontal: 8,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: 'oldlace',
    marginHorizontal: "1%",
    marginBottom: 6,
    maxWidth: "48%",
    minWidth: "48%",
  },
  txt_option: {
    fontSize: 20,
    fontWeight: "500",
    color: "coral",
    textAlign: 'center'
  }
});
export default Home;
