import { useEffect, useState } from "react";
import "../App.css";
import NavBar from "../Component/NavBar";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { filterAnswer } from "../features/Answer";

function GameManagement() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [question, setQuestion] = useState(0);
  const [result, setResult] = useState();
  const [answer, setAnswer] = useState();
  const [showResult, setShowResult] = useState();
  const [indexPlayer, setIndexPlayer] = useState(0);
  const [finish, setFinish] = useState(false);

  const userList = useSelector((state) => {
    return state.users.value;
  });

  const resultStore = useSelector((state) => {
    return state.result;
  });
  const data = resultStore[question]?.value;

  const [player, setPlayer] = useState(userList);
  const [show, setShow] = useState(true);

  useEffect(() => {
    data === answer ? setResult(true) : setResult(false);
  }, [answer]);
  if (indexPlayer === userList.length) {
    setQuestion(question + 1);
    setIndexPlayer(0);
  }
  function handleAnswer() {
    if (resultStore[question].key < resultStore.length) {
      dispatch(
        filterAnswer({
          key: question,
          name: player[indexPlayer]?.name,
          value: answer,
        })
      );
    }
    setTimeout(() => {
      setShow(!show);
      setShowResult(result);
    }, 2000);
  }
  function handleNext() {
    if (resultStore[question].key === resultStore.length) {
      setFinish(true);
    } else {
      setShow(!show);
      setShowResult("");
      setIndexPlayer(indexPlayer + 1);
    }
  }

  return (
    <div className="screenGameManagement">
      <NavBar />
      <div className="container-screenGameManagement">
        <>
          <div className="match">Match {resultStore[question]?.key}</div>
          <div className="player">Player : {player[indexPlayer]?.name}</div>
          <div className="question">
            <div>Câu {resultStore[question]?.key} : </div>
            <button
              className="buttonAddPlayer"
              onClick={() => {
                setAnswer(true);
              }}
            >
              Yes
            </button>
            <div className="answer">
              answer : <div>{showResult === true && "Correct"}</div>
              <div>{showResult === false && "Incorrect"}</div>
            </div>
            <button
              className="buttonAddPlayer"
              onClick={() => {
                setAnswer(false);
              }}
            >
              No
            </button>
          </div>
        </>
        {finish ? (
          <button
            className="buttonAddPlayer"
            onClick={() => {
              navigate("/History");
            }}
          >
            View
          </button>
        ) : (
          <div>
            {show ? (
              <button
                className="buttonAddPlayer"
                onClick={() => {
                  handleAnswer();
                }}
              >
                Submit
              </button>
            ) : (
              <button
                className="buttonAddPlayer"
                onClick={() => {
                  handleNext();
                }}
              >
                Next
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default GameManagement;
