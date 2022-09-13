import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    limitMatch: 0,
    answer: {
      // name: {
      //   name: "",
      //   awnserPlayer: [],
      //   score: 0,
      // },
    },
    result: {
      // api: {
      //   name: "",
      //   resultApi: [],
      // },
    },
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
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
    addResult: (state, action) => {
      const data = action.payload;
      if (!state.result[data.namePlayer]) {
        state.result[data.namePlayer] = {
          name: "",
          resultApi: [],
        };
      }
      state.result[data.namePlayer].name = data.namePlayer;
      state.result[data.namePlayer].resultApi.push(data.api);
    },
  },
});

export const { addUser, addMatch, dataAnswer, addResult } = userSlice.actions;
export default userSlice.reducer;
