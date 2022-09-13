import React from "react";
import NavBar from "../Component/NavBar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { searchPlayerName } from "../features/Users";

function History() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const answers = useSelector((state) => state.users.answer);

  const point = Object.keys(answers).map((e) => {
    return answers[e].score;
  });

  const biggestPoint = point.sort(function (a, b) {
    return a - b;
  });

  const winner = Object.keys(answers).filter((e) => {
    if (answers[e].score === biggestPoint[biggestPoint.length - 1]) {
      return answers[e].name;
    }
  });
  const [searchNamePlayer, setSearchNamePlayer] = useState();

  const handleSearch = () => {
    dispatch(
      searchPlayerName({
        searchNamePlayer,
      })
    );
  };
  useEffect(() => {
    handleSearch();
  }, [searchNamePlayer]);

  return (
    <div className="screenGameManagement">
      <NavBar />
      <div className="inputSearch">
        <InputGroup size="lg">
          <Form.Control
            onChange={(e) => {
              setSearchNamePlayer(e.target.value);
              handleSearch();
            }}
            placeholder="Search by player name"
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
          />
        </InputGroup>
      </div>
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
            answers[name].answerPlayer.map(
              (anwser, index) =>
                answers[name].isValid === true && (
                  <tr key={index}>
                    <td>{name}</td>
                    <td>{anwser}</td>
                    <td>{answers[name].answerApi[index]}</td>
                    <td>{anwser === answers[name].answerApi[index] ? 1 : 0}</td>
                  </tr>
                )
            )
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
          {Object.keys(answers).map(
            (e, index) =>
              answers[e].isValid && (
                <tr key={index}>
                  <td>{answers[e].name}</td>
                  <td>
                    {(
                      (100 / answers[e].answerPlayer.length) *
                      answers[e].score
                    ).toFixed(1)}
                    %
                  </td>
                  <td>{answers[e].score}</td>
                </tr>
              )
          )}
        </tbody>
      </Table>
      <h2 className="titleWinner">The Winner is : {winner[0]}</h2>
      <div className="buttonEndGame">
        <Button
          variant="secondary"
          onClick={() => {
            navigate("/ListPlayer");
          }}
        >
          End Game
        </Button>
      </div>
    </div>
  );
}

export default History;
