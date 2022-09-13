import "../App.css";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import TitleGame from "../Component/TitleGame";
import ModalCustom from "../Component/ModalCustom";

function ListPlayer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [showReply, setShowReply] = useState(false);

  const handleCloseReply = () => setShowReply(false);
  const handleShowReply = () => setShowReply(true);

  const [showDelete, setShowDelete] = useState(false);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [limitMatch, setLimitMatch] = useState(0);
  const userList = useSelector((state) => state.users.users);
  return (
    <div>
      <div className="displayUsers">
        <TitleGame />
        <div className="tableUserList">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Stt</th>
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
            <Button variant="warning" onClick={handleShowReply}>
              Add More Player
            </Button>
            {showReply && (
              <ModalCustom
                name={"Add"}
                props={showReply}
                handleCloseReply={() => {
                  handleCloseReply();
                }}
              />
            )}
            <Button variant="primary" onClick={handleShowDelete}>
              Start The Game
            </Button>
            {showDelete && (
              <ModalCustom
                name={"Match"}
                props={showDelete}
                handleCloseReply={() => {
                  handleCloseDelete();
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListPlayer;
