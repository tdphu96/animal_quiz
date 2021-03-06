import { createSlice } from "@reduxjs/toolkit";

const initState = {
  level: 1,
  money: 10,
  heart: 3,
};
const slide = createSlice({
  name: "profile",
  initialState: initState,
  reducers: {
    setLevel(state, action) { return state = { ...state, ...{ level: action.payload }}},
    setMoney(state, action) { return state = { ...state, ...{ money: action.payload }}},
    setHeart(state, action) { return state = { ...state, ...{ heart: action.payload }}},
    setProfile(state, action) {
      const { level, money, heart } = action.payload
      if (level) state = { ...state, ...{ level }}
      if (money) state = { ...state, ...{ money }}
      if (heart) state = { ...state, ...{ heart }}
      return state
    },

  },
});
const { actions, reducer } = slide;
export const {setProfile,setMoney, setLevel, setHeart} = actions;
export default reducer;
