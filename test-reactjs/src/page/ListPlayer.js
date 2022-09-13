import React from "react";
import "../App.css";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import TitleGame from "../Component/TitleGame";
function ListPlayer() {
  const navigate = useNavigate();

  const userList = useSelector((state) => state.users.users);
  return (
    <div>
      <div className="displayUsers">
        <TitleGame />
        <div className="tableUserList">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <div className="buttonListPlayer">
            <Button
              variant="warning"
              onClick={() => {
                navigate("/AddPlayer");
              }}
            >
              Add More Player
            </Button>
            <Button
              onClick={() => {
                navigate("/GameManagement");
              }}
            >
              Start The Game
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListPlayer;
