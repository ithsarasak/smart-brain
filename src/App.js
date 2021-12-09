import "./App.css";
import Navigation from "./components/Navigation/navigation";
import SignIn from "./components/Signin/signin";
import Register from "./components/Register/register";
import Logo from "./components/Logo/logo";
import ImageLinkForm from "./components/ImageLinkForm/imagelinkform";
import Rank from "./components/Rank/rank";
import FaceRecognition from "./components/FaceRecognition/facerecognition";
import "tachyons";
import Particles from "react-tsparticles";
import React, { useState } from "react";

const particlesOptions = {
  fpsLimit: 144,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 150,
        duration: 0.3,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 0.5,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        value_area: 800,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      random: true,
      value: 5,
    },
  },
  detectRetina: true,
};

const App = () => {
  const [input, setInput] = useState("");
  const [imgUrl, setUrl] = useState("");
  const [faceBoxs, setFaceBoxs] = useState([]);
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  });

  const particlesInit = (main) => {};

  const particlesLoaded = (container) => {};

  const calculateFaceLocation = (data) => {
    const face = data.region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: face.left_col * width,
      topRow: face.top_row * height,
      rightCol: width - face.right_col * width,
      bottomRow: height - face.bottom_row * height,
    };
  };

  const displayFaceBox = (Boxs) => {
    setFaceBoxs(Boxs);
  };

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setUrl(input);
    try {
      let response = await fetch("https://calm-ravine-67559.herokuapp.com/imageurl", {
        method: "post",
        headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              input: input,
            }),
      });
      response = await response.json();
      if (response) {
        try {
          let userEntries = await fetch("https://calm-ravine-67559.herokuapp.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user.id,
              inc: response.outputs[0].data.regions.length,
            }),
          });
          userEntries = await userEntries.json();
          console.log("NO", userEntries);
          setUser(Object.assign(user, { entries: userEntries }));
        } catch (e) {
          console.log("Error");
        }
        const Boxs = response.outputs[0].data.regions.map((region) =>
          calculateFaceLocation(region)
        );
        displayFaceBox(Boxs);
      }
    } catch (e) {
      console.log("Error");
    }
  }

  async function loadUser(user) {
    setUser(user);
  }

  const reset = () => {
    setUrl("");
    setInput("");
    setFaceBoxs([]);
    setSignedIn(false);
    setUser({
      id: "",
      name: "",
      email: "",
      entries: 0,
      joined: "",
    });
  };

  const onRouteChange = (route) => {
    if (route === "signin") {
      reset();
    } else if (route === "home") {
      setSignedIn(true);
    }
    setRoute(route);
  };

  return (
    <div className="App">
      <Particles
        className="particles"
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={particlesOptions}
      />
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      {route === "home" ? (
        <>
          <Logo />
          <Rank user={user} />
          <ImageLinkForm onChange={handleChange} onSubmit={handleSubmit} />
          <FaceRecognition imgUrl={imgUrl} faceBoxs={faceBoxs} />
        </>
      ) : route === "signin" ? (
        <SignIn onRouteChange={onRouteChange} loadUser={loadUser} />
      ) : (
        <Register onRouteChange={onRouteChange} loadUser={loadUser} />
      )}
    </div>
  );
};

export default App;
