import "../App.css";
import NavBar from "../Component/NavBar";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { dataAnswer, addResult } from "../features/Users";

function GameManagement() {
  const axios = require("axios");
  const [answerApi, setAnswerApi] = useState();
  const [image, SetImage] = useState(null);
  const [contentResult, SetContentResult] = useState(null);
  const [isLastPlayer, setIsLastPlayer] = useState(false);
  const [isFinish, setIsFinish] = useState(false);

  const users = useSelector((state) => state.users.users);
  const limitMatch = useSelector((state) => state.users.limitMatch);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const YES = "yes";
  const NO = "no";
  const [answer, setAnswer] = useState(null);
  const [match, setMatch] = useState(1);
  const [isCorrect, setIsCorrect] = useState(null);
  const [player, setPlayer] = useState();

  useEffect(() => {
    setPlayer({
      index: 0,
      name: users[0].name,
    });
  }, []);

  const handleYes = (value) => {
    setAnswer(value);
  };
  const handleNo = (value) => {
    setAnswer(value);
  };
  const handleAnswer = async () => {
    await axios({
      method: "get",
      url: "https://yesno.wtf/api",
    }).then(function (res, req) {
      setAnswerApi(res.data.answer);
      SetImage(res.data.image);
      if (res.data.answer === answer) {
        setIsCorrect(true);
      } else {
        setIsCorrect(false);
      }
      setTimeout(() => {
        if (res.data.answer === answer) {
          setIsCorrect("Correct");
        } else {
          setIsCorrect("InCorrect");
        }
      }, 2000);
      dispatch(
        dataAnswer({
          namePlayer: player.name,
          answer,
          answerApi: res.data.answer,
          isCorrect: res.data.answer === answer,
        })
      );
      setAnswer(null);
      if (player.index === users.length - 1) {
        if (match === limitMatch) {
          setIsFinish(true);
          setPlayer();
        }
        setIsLastPlayer(true);
        return;
      }
      setPlayer({
        index: player.index + 1,
        name: users[player.index + 1].name,
      });
    });
  };
  const handleNext = () => {
    if (player.index === users.length - 1) {
      setMatch(match + 1);
    }
    setPlayer({
      index: 0,
      name: users[0].name,
    });
    setIsLastPlayer(false);
    setIsCorrect(null);
    setAnswer(null);
  };
  return (
    <div className="screenGameManagement">
      <NavBar />
      <div className="container-screenGameManagement">
        <div className="match">Match {match}</div>
        <div className="player">Player : {player?.name}</div>
        <div className="yesOrno">
          <Button
            className={answer === "yes" && "backgroup-yes"}
            variant="outline-info"
            onClick={() => {
              handleYes(YES);
            }}
          >
            Yes
          </Button>
          {/* {isCorrect && setTimeout(() => {return <img className="gif-image" src={image}},2000) />} */}
          <div className="defaultDiv">
            {isCorrect != null &&
              (typeof isCorrect === "boolean" ? (
                <img className="gif-image" src={image} />
              ) : (
                <div
                  className={`result ${
                    isCorrect === "Correct"
                      ? "backgroup-correct"
                      : "backgroup-incorrect"
                  }`}
                >
                  <h3>{isCorrect}</h3>
                </div>
              ))}
          </div>
          <Button
            className={answer === "no" && "backgroup-no"}
            variant="outline-warning"
            onClick={() => {
              handleNo(NO);
            }}
          >
            No
          </Button>
        </div>
        {isFinish ? (
          <div className="image-answer">
            <Button
              variant="primary"
              onClick={() => {
                navigate("/History");
              }}
            >
              View
            </Button>
          </div>
        ) : isLastPlayer ? (
          <div className="image-answer">
            <Button
              variant="secondary"
              onClick={() => {
                handleNext();
              }}
            >
              Next
            </Button>
          </div>
        ) : (
          <div className="image-answer">
            <Button
              variant="primary"
              onClick={() => {
                handleAnswer();
              }}
            >
              Submit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default GameManagement;
