import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import TitleGame from "../Component/TitleGame";
import "../App.css";

const StartGame = () => {
  const navigate = useNavigate();

  return (
    <div className="screenStartGame">
      <div>
        <TitleGame />
      </div>
      <div>
        <Button
          className="buttonAddPlayer"
          variant="primary"
          onClick={() => {
            navigate("/AddPlayer");
          }}
        >
          Start Game
        </Button>{" "}
      </div>
    </div>
  );
};
export default StartGame;
