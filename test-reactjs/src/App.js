// import "./App.css";
// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer } from "react-toastify";
// import { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { addUser, deleteUser, updateUsername } from "./features/Users";
// import Modal from "./Component/Modal";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartGame from "./page/StartGame";
import AddPlayer from "./page/AddPlayer";
import ListPlayer from "./page/ListPlayer";
import GameManagement from "./page/GameManagement";
import History from "./page/History";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartGame />}></Route>
        <Route path="/StartGame" element={<StartGame />}></Route>
        <Route path="/AddPlayer" element={<AddPlayer />}></Route>
        <Route path="/ListPlayer" element={<ListPlayer />}></Route>
        <Route path="/GameManagement" element={<GameManagement />}></Route>
        <Route path="/History" element={<History />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
