import { Link } from "react-router-dom";
import TitleGame from "../Component/TitleGame";
import "../App.css";
const StartGame = () => {
  return (
    <div className="screenStartGame">
      <div>
        <TitleGame />
      </div>
      <div>
        <button>
          <Link to="/AddPlayer">Start Game</Link>
        </button>
      </div>
    </div>
  );
};
export default StartGame;
