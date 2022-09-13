import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    awnser: {
      // name: {
      //   name: "",
      //   awnserPlayer: [],
      //   score: 0,
      // },
    },
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    dataAnswer: (state, action) => {
      const data = action.payload;
      const isCorrect = data.isCorrect;
      console.log(data);
      if (!state.awnser[data.namePlayer]) {
        state.awnser[data.namePlayer] = {
          name: "",
          awnserPlayer: [],
          score: 0,
        };
      }
      state.awnser[data.namePlayer].name = data.namePlayer;
      state.awnser[data.namePlayer].awnserPlayer.push(data.answer);
      if (isCorrect === true) {
        state.awnser[data.namePlayer].score =
          state.awnser[data.namePlayer].score + 1;
      }
    },
  },
});

export const { addUser, dataAnswer } = userSlice.actions;
export default userSlice.reducer;
