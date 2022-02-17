import { createSlice } from "@reduxjs/toolkit";

const initState = {
  music: true,
  click: true,
  bell: true,
  vibrate: true,
  alphabet: true,
};
const toastSlice = createSlice({
  name: "setting",
  initialState: initState,
  reducers: {
    setMusic(state, action) { return state = { ...state, ...{ music: action.payload }}},
    setClick(state, action) { return state = { ...state, ...{click:  action.payload }}},
    setBell(state, action) { return state = { ...state, ...{bell:  action.payload }}},
    setVibrate(state, action) { return state = { ...state, ...{vibrate:  action.payload }}},
    setAlphabet(state, action) { return state = { ...state, ...{alphabet:  action.payload }}},
    setSettings(state, action) { return state = { ...state, ...action.payload }},
  },
});
const { actions, reducer } = toastSlice;
export const { setMusic, setClick, setSettings, setBell, setVibrate, setAlphabet } = actions;
export default reducer;
