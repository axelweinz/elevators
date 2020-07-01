import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

function App() {

  const [lifts, setLifts] = useState({
    pos: "",
    dir: ""
  });

  useEffect(() => {
    const getLifts = async () => {
      const { data } = await axios.get("http://localhost:9000/lift");
      setLifts({pos: data.globalLifts.map(a => a.pos), dir: data.globalLifts.map(a => a.dir)});
      if (data.globalQueue.length !== 0 && data.globalLifts.map(a => a.dir).includes(0)) {
        callLift(data.globalQueue[0]);
      }
    }

    const interval = setInterval(() => {
      getLifts();
    }, 2000);
  }, []);

  const callLift = floor => {
    if (Number.isInteger(floor)) {
      axios.put("http://localhost:9000/lift", { floorCalled: floor });  
    } else {
      axios.put("http://localhost:9000/lift", { floorCalled: parseInt(floor.target.value) });
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          {lifts.pos[0]} {lifts.pos[1]} {lifts.pos[2]} {lifts.pos[3]} {lifts.pos[4]}
        </h1>
        <h1>
          {lifts.dir[0]} {lifts.dir[1]} {lifts.dir[2]} {lifts.dir[3]} {lifts.dir[4]}
        </h1>
        <input type="number" min="0" max="20" onChange={callLift}></input>
      </header>
    </div>
  );
}

export default App;
