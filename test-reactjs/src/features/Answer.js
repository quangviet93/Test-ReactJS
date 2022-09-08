import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "answer",
  initialState: [],
  reducers: {
    filterAnswer: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { filterAnswer } = userSlice.actions;
export default userSlice.reducer;
