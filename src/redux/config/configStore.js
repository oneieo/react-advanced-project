// 중앙 관리소인 store를 만드는 설정 코드를 담을 곳
//import { combineReducers, createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import contentsSlice from "../slices/contentsSlice";
import clickedMonthSlice from "../slices/clickedMonthSlice";

// 1. rootReducer를 만들기
//const rootReducer = combineReducers({
//   date,
// }); modules 폴더 안에 있는 값들이 파라미터로 들어가게 됨

// 2. store를 조합하기
// const store = createStore(rootReducer); // rootReducer를 파라미터로 넣어주기
const store = configureStore({
  reducer: {
    contents: contentsSlice,
    clickedMonth: clickedMonthSlice,
  },
});
// 3. 만든 store 내보내기
export default store;
