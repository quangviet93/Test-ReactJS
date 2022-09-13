import "../App.css";
import Spinner from "react-bootstrap/Spinner";
import NavBar from "../Component/NavBar";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { dataAnswer } from "../features/Users";

function GameManagement() {
  const axios = require("axios");

  const [isLoading, setIsLoading] = useState(false);

  const [image, SetImage] = useState(null);
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
    console.log("answer", answer);
    if (answer) {
      setIsLoading(true);
      await axios({
        method: "get",
        url: "https://yesno.wtf/api",
      }).then(function (res, req) {
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
        setIsLoading(false);
      });
    }
    return;
  };
  const handleNext = () => {
    setIsLoading(false);
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
      <div className="containerScreenGameManagement">
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
                <img className="gifImage" src={image} />
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
          <div className="imageAnswer">
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
          <div className="imageAnswer">
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
          <div className="imageAnswer">
            {!isLoading ? (
              <Button
                variant="primary"
                onClick={() => {
                  handleAnswer();
                }}
              >
                Submit
              </Button>
            ) : (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default GameManagement;
