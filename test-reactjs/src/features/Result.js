import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "result",
  initialState: [
    {
      key: 1,
      value: false,
    },
    {
      key: 2,
      value: true,
    },
  ],
});

export default userSlice.reducer;
