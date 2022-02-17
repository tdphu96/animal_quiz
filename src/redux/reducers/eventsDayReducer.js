import { createSlice } from "@reduxjs/toolkit";

// status: 0,1,2 [ dong,  mo, mo va da nhan ]
const initState = {
  events: [
    { key: 1, nameEvent: "Đăng nhập mỗi ngày", reward: 30, levelAmount: 0, status: 0 },
    { key: 2, nameEvent: "Vược qua 10 vòng", reward: 30, levelAmount: 10, status: 0 },
    { key: 3, nameEvent: "Vược qua 25 vòng", reward: 40, levelAmount: 25, status: 0 },
    { key: 4, nameEvent: "Vược qua 50 vòng", reward: 40, levelAmount: 50, status: 0 },
  ],
  currents: { date: new Date().getDate(), level:0 }
}


const slide = createSlice({
  name: "events_day",
  initialState: initState,
  reducers: {
    setDataEventsDayDefault(state, action) { return state = { ...initState }},
    setDataEventsDay(state, action) { return state = { ...state, ...action.payload }},
    updateEventsDay(state, action) {
      const { key } = action.payload
      let events = [...state.events]
      const index = events.findIndex( e => e.key === key)
      if (index >= 0) {
        events[index] = action.payload
        state = { ...state, ...{ events }}
      }
      return state;
    },
    updateEventsDayCurrent(state, action) {
      const { date,level } = action.payload
      let currents = { ...state.currents }
      if (date) currents = { ...currents, ...{ date }}
      if (level) currents = { ...currents, ...{ level }}
      state = { ...state, ...{ currents }}
      return state;
    }
  },
});
const { actions, reducer } = slide;
export const { setDataEventsDayDefault, setDataEventsDay, updateEventsDay , updateEventsDayCurrent } = actions;
export default reducer;
