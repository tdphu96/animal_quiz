import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PlayGame from "./screen/PlayGame";
import Home from "./screen/Home";
import Setting from "./screen/Setting";
import { setProfile } from "./redux/reducers/profileReducer";
import { setSettings } from "./redux/reducers/settingReducer";
import useReduxStorage from "./hookCustom/useReduxStorage";
import WinGame from "./screen/WinGame";
import GameOver from "./screen/GameOver";
import WatchADS from "./screen/WatchADS";
import OptionGame from "./screen/OptionGame";
import Rank from "./screen/Rank";
const Stack = createStackNavigator();
const Router = () => {

  useReduxStorage({ key: "profile", setStateKey: setProfile})
  useReduxStorage({ key: "settings", setStateKey: setSettings})

  return (
      <Stack.Navigator
          initialRouteName={"PlayGame"}
          screenOptions={{backgroundColor:'transparent', headerShown: false, animationEnabled: false }}
      >
        <Stack.Screen name="PlayGame" component={PlayGame}  options={{presentation:'transparentModal'}}/>
        <Stack.Screen name="Home" component={Home} options={{presentation:'transparentModal'}}/>
        <Stack.Screen name="WatchADS" component={WatchADS}  options={{presentation:'transparentModal'}}/>
        <Stack.Screen name="Setting" component={Setting}  options={{presentation:'transparentModal'}}/>
        <Stack.Screen name="WinGame" component={WinGame}  options={{presentation:'transparentModal'}}/>
        <Stack.Screen name="GameOver" component={GameOver}  options={{presentation:'transparentModal'}}/>
        <Stack.Screen name="OptionGame" component={OptionGame}  options={{presentation:'transparentModal'}}/>
        <Stack.Screen name="Rank" component={Rank}  options={{presentation:'transparentModal'}}/>
      </Stack.Navigator>
  )
}

export default Router
