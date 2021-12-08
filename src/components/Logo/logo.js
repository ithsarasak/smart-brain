import React from "react";
import Tilt from "react-parallax-tilt";
import brain from "./brain.png";
import "./logo.css";

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt
        className="tilt br2 shadow-2"
        tiltMaxAngleX={30}
        tiltMaxAngleY={30}
        style={{ height: "150px", width: "150px" }}
      >
        <img style={{ padding: "25px" }} alt="logo" src={brain} />
      </Tilt>
    </div>
  );
};

export default Logo;
