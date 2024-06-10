import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signUpData: {
    userId: "",
    password: "",
    nickName: "",
  },
};

const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    changeValue: (state, action) => {
      state[action.payload.type] = action.payload.content;
      console.log(action.payload.content);
    },
    changeUserInfo: (state, action) => {
      state.userId = action.payload.userId;
      state.password = action.payload.password;
      state.nickName = action.payload.nickName;
      //   console.log(
      //     action.payload.userId,
      //     action.payload.password,
      //     action.payload.nickName
      //   );
    },
  },
});

export const { changeValue, changeUserInfo } = signUpSlice.actions;
export default signUpSlice.reducer;
