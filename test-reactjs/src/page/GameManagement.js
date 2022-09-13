import "../App.css";
import NavBar from "../Component/NavBar";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { dataAnswer } from "../features/Users";

function GameManagement() {
  const axios = require("axios");
  const [answerApi, setAnswerApi] = useState();
  const [image, SetImage] = useState(null);
  const [isLastPlayer, setIsLastPlayer] = useState(false);
  const [isFinish, setIsFinish] = useState(false);

  const users = useSelector((state) => state.users.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const YES = "yes";
  const NO = "no";
  const [answer, setAnswer] = useState();
  const [match, setMatch] = useState(1);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    axios({
      method: "get",
      url: "https://yesno.wtf/api",
    }).then(function (res, req) {
      setAnswerApi(res.data.answer);
      SetImage(res.data.image);
    });
  }, [match]);

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
  const handleAnswer = () => {
    if (answerApi === answer) {
      setIsCorrect("Correct");
    } else {
      setIsCorrect("InCorrect");
    }
    dispatch(
      dataAnswer({
        namePlayer: player.name,
        answer,
        isCorrect: answerApi === answer,
      })
    );
    if (player.index === users.length - 1) {
      if (match === 5) {
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
  };
  const handleNext = () => {
    setMatch(match + 1);
    setPlayer({
      index: 0,
      name: users[0].name,
    });
    setIsLastPlayer(false);
  };
  return (
    <div className="screenGameManagement">
      <NavBar />
      <div className="container-screenGameManagement">
        <div className="match">Match {match}</div>
        <div className="player">Player : {player?.name}</div>
        <div className="yesOrno">
          <Button
            variant="outline-info"
            onClick={() => {
              handleYes(YES);
            }}
          >
            Yes
          </Button>
          {isCorrect && <img src={image} />}
          <Button
            variant="outline-warning"
            onClick={() => {
              handleNo(NO);
            }}
          >
            No
          </Button>
        </div>
        {isFinish ? (
          <div>
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
          <div>
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
