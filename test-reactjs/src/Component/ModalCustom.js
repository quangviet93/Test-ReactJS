import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addUser, addMatch } from "../features/Users";

function ModalCustom(props) {
  const userList = useSelector((state) => state.users.users);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [namePlayer, setNamePlayer] = useState("");
  const [limitMatch, setLimitMatch] = useState(0);

  const handleSubmit = () => {
    if (props.name === "Add") {
      dispatch(
        addUser({
          id: userList.length === 0 ? 1 : userList[userList.length - 1].id + 1,
          name: namePlayer,
        })
      );
      props.handleCloseReply();
    } else if (props.name === "Match") {
      dispatch(
        addMatch({
          limitMatch: limitMatch,
        })
      );
      props.handleCloseReply();
      navigate("/GameManagement");
    }
  };
  return (
    <>
      <Modal show={props.props} onHide={props.handleCloseReply}>
        <Modal.Header closeButton>
          <Modal.Title>
            {props.name === "Add" ? "Add New Player" : "Limit Match"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup size="lg">
            <InputGroup.Text id="inputGroup-sizing-lg">
              {props.name}
            </InputGroup.Text>
            <Form.Control
              onChange={(e) => {
                props.name === "Add"
                  ? setNamePlayer(e.target.value)
                  : setLimitMatch(e.target.value);
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
              handleSubmit();
            }}
          >
            Add
          </Button>
          <Button variant="primary" onClick={props.handleCloseReply}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCustom;
