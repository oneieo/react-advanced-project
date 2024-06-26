import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {
    userId: "",
    nickName: "",
    profileImg: "",
  },
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    changeValue: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { changeValue } = userInfoSlice.actions;
export default userInfoSlice.reducer;
