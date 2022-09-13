import React from "react";
import "./NavBar.css";
import Button from "react-bootstrap/Button";

function NavBar() {
  return (
    <div className="navbar">
      <div className="title-game">Yes No WTF GAME</div>
      <div>
        <Button variant="secondary">Player History</Button>
      </div>
    </div>
  );
}

export default NavBar;
