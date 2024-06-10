import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clickedMonth: new Date().getMonth() + 1,
};

const clickedMonthSlice = createSlice({
  name: "clickedMonth",
  initialState,
  reducers: {
    updateClickedMonth: (state, action) => {
      state.clickedMonth = action.payload;
    },
  },
});

export const { updateClickedMonth } = clickedMonthSlice.actions;
export default clickedMonthSlice.reducer;
