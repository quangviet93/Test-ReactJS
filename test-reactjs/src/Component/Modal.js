import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../features/Users";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./Modal.css";
import { toast } from "react-toastify";

function Modal({ setOpenModal }) {
  const navigate = useNavigate();

  const error = () =>
    toast.error("🦄 Wow so easy!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const success = () => {
    toast.success("🦄 Wow so easy!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setOpenModal(false);
    navigate("/ListPlayer");
  };

  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.users.users);

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="title">
          <h3>Please enter a new game</h3>
        </div>
        <div className="body">
          <p>New game :</p>
          <input
            type="text"
            placeholder="Name..."
            onChange={(event) => {
              setName(event.target.value);
            }}
          ></input>
        </div>
        <div className="footer">
          <Button
            variant="success"
            onClick={() => {
              dispatch(
                addUser({
                  id:
                    userList.length === 0
                      ? 1
                      : userList[userList.length - 1].id + 1,
                  name,
                })
              );
              success();
            }}
          >
            Ok
          </Button>{" "}
          <Button
            variant="danger"
            onClick={() => {
              error();
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
