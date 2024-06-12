import { configureStore } from "@reduxjs/toolkit";
import contentsSlice from "../slices/contentsSlice";
import clickedMonthSlice from "../slices/clickedMonthSlice";
import userInfoSlice from "../slices/userInfo.slice";

const store = configureStore({
  reducer: {
    contents: contentsSlice,
    clickedMonth: clickedMonthSlice,
    userInfo: userInfoSlice,
  },
});

export default store;
