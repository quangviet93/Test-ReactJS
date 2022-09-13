import "../App.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { addUser } from "../features/Users";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TitleGame from "../Component/TitleGame";

function AddPlayer() {
  const navigate = useNavigate();

  // const error = () =>
  //   toast.error("🦄 Wow so easy!", {
  //     position: "top-right",
  //     autoClose: 1000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });
  // const success = () => {
  //   toast.success("🦄 Wow so easy!", {
  //     position: "top-right",
  //     autoClose: 1000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });
  //   navigate("/ListPlayer");
  // };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.users.users);
  return (
    <div className="screenAddPlayer">
      <div>
        <TitleGame />
      </div>
      <div>
        <Button className="buttonAddPlayer" onClick={handleShow}>
          AddPlayer
        </Button>
        <ToastContainer />
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup size="lg">
              <InputGroup.Text id="inputGroup-sizing-lg">
                Name Player :
              </InputGroup.Text>
              <Form.Control
                onChange={(e) => {
                  setName(e.target.value);
                }}
                aria-label="Large"
                aria-describedby="inputGroup-sizing-sm"
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
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
                handleClose();
                navigate("/ListPlayer");
              }}
            >
              Add
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
export default AddPlayer;
