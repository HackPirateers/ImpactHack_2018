import React, { Component } from "react";
import { render } from "react-dom";
import Map from "./Map";
import axios from "axios";
import "./styles.css";
import ControlledPopup from "./Popup.js";
import Recharts from "recharts";
// import Warper from "./Warper";
import Popup from "reactjs-popup";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from "recharts";
const data = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];
class App extends Component {
  constructor() {
    super();
    this.state = {
      country: "",
      open: false,
      graph: [],
      years: [],
      refCount: [],
      showMap: false,
      center: [0, 0],
      size: 5,
      turn: 1,
      popData: false,
      api_data: [],
      text_stub: ""
    };
  }
  changeCenter = center => () => {
    this.setState({ center });
  };
  startTurning = () => {
    this.setState({ turn: 1 });
  };


  changeTurning = () => {
    if (this.state.turn === 1) {
      this.setState({ turn: 0 });
    } else {
      this.setState({ turn: 1 });
    }

  };

  updateCountry = (country1) =>{
    this.setState({
      country: country1
    }, function(){
      console.log(this.state.country);
      // console.log(this.post);
      this.post();
    });
  }

  makeText = () => {
    var x = "Unable to Determine";
    if (this.state.api_data[3] === "NF"){
      x = "Not Free";
    }
     if (this.state.api_data[3] === "PF"){
      x = "Partly Free";
    }
     if (this.state.api_data[3] === "F"){
      x = "Free";
    }
    // console.log(this.state.api_data);
    return this.state.country + " has freedom rating " + this.state.api_data[2] + " and is thus deemed as "  + x;
  }

  changeData = () => {
    if (this.state.popData){
      this.setState({popData:false})
    }
    else {
        this.setState({popData: true })
    }
  }


  async post(){
    const test = await axios.put("http://641a3deb.ngrok.io",{"list" : [this.state.country]}).then(async(response) =>{
      // console.log(response["data"]["output"]);
      this.setState({api_data: response["data"]["output"]});
      this.setState({years: response["data"]["output"][0]});
      this.setState({refCount: response["data"]["output"][1]});
      this.setState({text_stub : this.makeText()});

      // console.log(this.state.text_stub);
      var graph1 = [];
      for (var x = 0; x <response["data"]["output"][0].length; x++) {
            graph1.push({  years: this.state.years[x],
                           refCount: this.state.refCount[x]});
        }
        this.setState({graph: graph1});
        console.log(this.state.graph);

    }).catch(error => {
      alert(error);
    });
    return test;
  };

  stopTurning = () => {
    this.setState({ turn: 0 });
    // this.changeCenter([0, 0]);
  };
  componentDidMount() {
    this.interval = setInterval(
      () =>
        this.setState({
          center: [
            this.state.center[0] + (this.state.turn/1.12),
            this.state.center[1]
          ]
        }),
    1
    );
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  // the coordinate system is E, N, not the conventional N,E. - denotates south or west.
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ padding: "1rem 0" }}>
          <button className="btn" onClick={this.changeTurning}>
            {"Toggle Spin"}
          </button>
          <button className="btn" onClick={this.changeData}>
  {"Toggle Data"}
</button>
        </div>
        <Map
          center={this.state.center}
          csize={this.state.size}
          markers={this.state.markers}
          popData={this.state.popData}
          updateCountry = {this.updateCountry}
        />
        // {console.log(this.state.graph)}
        <ControlledPopup data ={data}/>
      </div>

    );
  }
}

render(<App />, document.getElementById("root"));
