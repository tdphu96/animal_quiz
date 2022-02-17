import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity, ScrollView } from "react-native";

const OptionGame = () => {
  const listGame = [
    {name: 'Đố vui dân gian', img:'', link: ''},
    {name: 'Đố vui động vật', img:'', link: ''},
    {name: 'Động vật - nhìn hình đoán tên', img:'', link: ''},
    {name: 'Động vật - nhìn chữ đoán hình', img:'', link: ''},
    {name: 'Động vật - nhìn hình ghép chữ', img:'', link: ''},
    {name: 'Động vật - âm thanh đoán con vật', img:'', link: ''},
    {name: 'Đoán tên trái cây', img:'', link: ''},
    {name: 'Đoán tên thực vật', img:'', link: ''},
    {name: 'Trái cây - học tiếng anh', img:'', link: ''},
  ]
  return (
    <View style={styles.frame_option_game}>
      <View style={styles.header}>

      </View>
      <ScrollView style={styles.body_option_game}>
        {listGame.map((e, i) => {
          let {name, img, link} =e
          return (
            <View key={i} style={{height: 50, flexDirection:'row', marginBottom: 2}}>
              <Image source={img}/>
              <Text>{name}</Text>
              <TouchableOpacity>
                <Text>CHƠI</Text>
              </TouchableOpacity>
            </View>
          )
        })}
        <Text>Click quảng cáo để chúng tôi có thêm thu nhập phát triển nhiều game hơn</Text>
        {[...Array(3).keys()].map(e => {
          return (
            <View key={e} style={{height: 80, backgroundColor:'#313212', marginBottom: 2}}>

            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  frame_option_game: {
    flex:1,
    justifyContent:'center',
    backgroundColor: "#f5cb86",
  },
  header: {
    padding: 25,
  },
  body_option_game: {
    flex:1
  }
})
export default OptionGame
