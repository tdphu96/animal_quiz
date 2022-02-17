import React from "react";
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, ImageBackground } from "react-native";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { setLevel, setMoney } from "../redux/reducers/profileReducer";
import { useDispatch } from "react-redux";
import button1 from "../asset/icons/play.png";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import label_win from "../asset/icons/label_win.png";
const { width, height } = Dimensions.get("screen");
const WinGame = ({ route }) => {
  const { answer, profile } = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const next = () => {
    const newLevel = profile.level + 1;
    const newMoney = profile.money + 1;
    dispatch(setLevel(newLevel));
    dispatch(setMoney(newMoney));
    navigation.navigate("Home");
  };
  return (
    <View style={styles.frame_win}>
      <View style={styles.bg_opacity} />
      <Animatable.View
        animation={'zoomIn'}
        duration={200}
        easing="linear"
      >
      <View style={styles.body_win_game}>
        <ImageBackground resizeMode={'stretch'} source={label_win} style={styles.label}>
          <Text style={styles.txt_setting}>Chính Xác</Text>
        </ImageBackground>
        <View style={{paddingTop: 40, justifyContent:'center', alignItems:'center'}}>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#91181d", }}>Câu: {profile.level}</Text>
          <View style={{justifyContent:"center", alignItems:'center', marginTop: 25}}>
            <Text style={{ fontSize: 20, fontWeight:'bold', color: "#ad2fc1" }}>Đáp án</Text>
            <Text style={{ fontSize: 50, fontWeight:'bold', color: "#ad2fc1" }}>{answer}</Text>
          </View>
          <TouchableOpacity onPress={next}>
            <ImageBackground resizeMode={'stretch'} source={button1} style={styles.btt_button}>
              <FontAwesome5 name={"forward"} size={25} color={'#FFF'}/>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
      </Animatable.View>
      <View style={{ height: 80, width, position: "absolute", bottom: 0, backgroundColor: "#FFF" }}>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  frame_win: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bg_opacity: {
    height,
    width,
    backgroundColor: "#000",
    opacity: 0.9,
    position: "absolute",
    top: 0,
  },
  body_win_game: {
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
    height: 140,
    position: "absolute",
    top: -110,
    justifyContent: "center",
    alignItems: "center"
  },
  txt_setting:{
    top: 15,
    fontSize: 30,
    fontWeight: "bold",
    color: "#91181d",
  },
  next_question: {
    borderRadius: 20,
    fontSize: 20,
    padding: 10,
    backgroundColor: "green",
  },
  btt_button: {
    marginTop: 15,
    height: 50,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default WinGame;
