import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contents: JSON.parse(localStorage.getItem("contents")) ?? [],
};

const contentsSlice = createSlice({
  name: "contents",
  initialState,
  reducers: {
    loadContents: (state, action) => {
      state.contents = action.payload;
    },
    createContents: (state, action) => {
      state.contents = [...state.contents, action.payload];
    },
    updateContents: (state, action) => {
      state.contents = action.payload;
    },
    deleteContents: (state, action) => {
      state.contents = action.payload;
    },
  },
});

export const { loadContents, createContents, updateContents, deleteContents } =
  contentsSlice.actions;
export default contentsSlice.reducer;
