import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    users: JSON.parse(localStorage.getItem("listUser")) || [],
    limitMatch: 0,
    answer: {
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
      localStorage.setItem("listUser", JSON.stringify(state.users));
    },
    addMatch: (state, action) => {
      const limit = Number(action.payload.limitMatch);
      state.limitMatch = state.limitMatch + limit;
    },
    dataAnswer: (state, action) => {
      const data = action.payload;
      const isCorrect = data.isCorrect;
      if (!state.answer[data.namePlayer]) {
        state.answer[data.namePlayer] = {
          name: "",
          answerPlayer: [],
          answerApi: [],
          score: 0,
          isValid: true,
        };
      }
      state.answer[data.namePlayer].name = data.namePlayer;
      state.answer[data.namePlayer].answerPlayer.push(data.answer);
      state.answer[data.namePlayer].answerApi.push(data.answerApi);
      if (isCorrect === true) {
        state.answer[data.namePlayer].score =
          state.answer[data.namePlayer].score + 1;
      }
    },
    searchPlayerName: (state, action) => {
      Object.keys(state.answer).forEach((name) => {
        if (
          action.payload.searchNamePlayer === undefined ||
          action.payload.searchNamePlayer === "" ||
          name === action.payload.searchNamePlayer
        ) {
          state.answer[name].isValid = true;
        } else {
          state.answer[name].isValid = false;
        }
      });
    },
  },
});

export const { addUser, addMatch, dataAnswer, searchPlayerName } =
  userSlice.actions;
export default userSlice.reducer;
