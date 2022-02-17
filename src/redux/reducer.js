import { combineReducers } from 'redux';
import settings from './reducers/settingReducer';
import profile from './reducers/profileReducer';
import eventsDay from './reducers/eventsDayReducer';
const reducer = combineReducers({
  profile: profile,
  settings: settings,
  eventsDay: eventsDay
});

export default reducer;
