import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {
    userId: "",
    password: "",
    nickName: "",
    profileImg: "",
  },
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    changeValue: (state, action) => {
      state[action.payload.type] = action.payload.content;
      //console.log(action.payload.content);
    },
  },
});

export const { changeValue } = userInfoSlice.actions;
export default userInfoSlice.reducer;
