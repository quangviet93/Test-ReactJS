import React from "react";
import NavBar from "../Component/NavBar";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

function History() {
  const answers = useSelector((state) => state.users.answer);
  console.log("answers", Object.keys(answers));

  return (
    <div className="screenGameManagement">
      <NavBar />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Answer</th>
            <th>Result</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(answers).map((name) =>
            answers[name].answerPlayer.map((anwser, index) => (
              <tr>
                <td>{name}</td>
                <td>{anwser}</td>
                <td>{answers[name].answerApi[index]}</td>
                <td>{anwser === answers[name].answerApi[index] ? 1 : 0}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Summary</th>
            <th>Correct percent</th>
            <th>Total score</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(answers).map((e) => (
            <tr>
              <td>{answers[e].name}</td>
              <td>
                {(100 / answers[e].answerPlayer.length) * answers[e].score}%
              </td>
              <td>{answers[e].score}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default History;
