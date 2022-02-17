import reducer from './reducer.js';
import { configureStore } from '@reduxjs/toolkit'
const store = configureStore(
  {  reducer }
)
export default store;

