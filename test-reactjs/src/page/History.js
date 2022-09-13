import React from "react";
import NavBar from "../Component/NavBar";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

function History() {
  const userList = useSelector((state) => state.users.value);
  const results = useSelector((state) => state.result);
  const answers = useSelector((state) => state.answer);

  return (
    <div className="screenGameManagement">
      <NavBar />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Answer</th>
            <th>Result</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>Otto</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default History;
