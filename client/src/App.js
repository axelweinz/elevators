import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

function App() {

  const [liftsPos, setLiftsPos] = useState("");
  const [liftsDir, setLiftsDir] = useState("");

  useEffect(() => {
    const getLiftPos = async () => {
      const { data } = await axios.get("http://localhost:9000/lift");
      setLiftsPos(data.map(a => a.pos));
      setLiftsDir(data.map(a => a.dir));
    }

    const interval = setInterval(() => {
      getLiftPos();
    }, 2000);
  }, []);

  const callLift = async floor => {
    await axios.put("http://localhost:9000/lift", { floorCalled: parseInt(floor.target.value) });
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          {liftsPos[0]} {liftsPos[1]} {liftsPos[2]} {liftsPos[3]} {liftsPos[4]}
        </p>
        <input type="number" min="0" max="20" onChange={callLift}></input>
      </header>
    </div>
  );
}

export default App;
