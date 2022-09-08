import React from "react";
import "../App.css";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import TitleGame from "../Component/TitleGame";
function ListPlayer() {
  const navigate = useNavigate();

  const userList = useSelector((state) => state.users.value);
  return (
    <div>
      <div className="displayUsers">
        <TitleGame />
        <div>
          <table>
            <tbody>
              <tr>
                <th>#</th>
                <th>Name</th>
              </tr>
              {userList.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                  </tr>
                );
              })}
            </tbody>
            <div className="buttonListPlayer">
              <button
                onClick={() => {
                  navigate("/AddPlayer");
                }}
              >
                Add More Player
              </button>
              <button
                onClick={() => {
                  navigate("/GameManagement");
                }}
              >
                Start The Game
              </button>
            </div>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ListPlayer;
