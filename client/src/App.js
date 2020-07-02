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
      console.log(data.globalQueue);
      if (data.globalQueue.length !== 0 && data.globalLifts.map(a => a.dir).includes(0)) {
        console.log("THE Q" + data.globalQueue[0]);
        callLift(data.globalQueue[0]);
      }
    }

    setInterval(() => {
      getLifts();
    }, 2000);
  }, []);

  // const callLift = floor => {
  //   console.log(Number.isInteger(floor));
  //   if (!Number.isInteger.floor) {
  //     floor = parseInt(document.getElementById("floorSelection").value);
  //   }
  //   if (floor <=20 && floor >= 0) {
  //     axios.put("http://localhost:9000/lift", { floorCalled: floor });
  //   } else {
  //     alert("Floor N/A")
  //   }
  // }

  const callLift = floor => {
    if (Number.isInteger(floor)) {
      axios.put("http://localhost:9000/lift", { floorCalled: floor });  
    } else {
      axios.put("http://localhost:9000/lift", { floorCalled: parseInt(document.getElementById("floorSelection").value) });
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>
          Top row represents elevator positions. <br/>
          Bottom row represent elevator direction.
        </h2>
        <h1>
          {lifts.pos[0]} {lifts.pos[1]} {lifts.pos[2]} {lifts.pos[3]} {lifts.pos[4]}
        </h1>
        <h1>
          {lifts.dir[0]} {lifts.dir[1]} {lifts.dir[2]} {lifts.dir[3]} {lifts.dir[4]}
        </h1>
        <input id="floorSelection" type="number" min="0" max="20" defaultValue="0"></input>
        <button onClick={callLift} style={{padding: "4px", margin: "8px"}}>Call Elevator</button>
      </header>
    </div>
  );
}

export default App;
