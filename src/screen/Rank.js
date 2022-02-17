import React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
const {height, width} = Dimensions.get('screen')
const Rank = () => {
  return (
    <View style={styles.frame_rank}>
      <View style={styles.bg_opacity}/>
      <View style={styles.body}>
        <Text>PHÁ ĐẢO GAME</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  frame_rank: {
    flex: 1,
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
    backgroundColor: '#FF7F50',
    minHeight: 300,
    width: width - 50,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  }
})
export default Rank
