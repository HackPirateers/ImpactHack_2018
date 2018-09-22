

// Imports. We use axios for interacting with the backend REST api, reactjs-popups for the country popup,
//  and Recharts for the line graph.

import React, { Component } from "react";
import { render } from "react-dom";
import Map from "./Map";
import axios from "axios";
import "./styles.css";
import ControlledPopup from "./Popup.js";
import Recharts from "recharts";
import Popup from "reactjs-popup";



// App brings all the components(Map, Popup, etc.) together to be rendered.
class App extends Component {
  constructor() {
    super();
    // These values are states that are used to track what teh user is doing at a given time.
    this.state = {
      countrylist: [],
      open: false,
      graph: [],
      years: [],
      refCount: [],
      open: false,
      center: [0, 0],
      size: 5,
      turn: 1,
      popData: false,
      api_data: [],
      text_stub: "",
      abr: "usa"
    };
  }

// set turn which is used to render rotation
  startTurning = () => {
    this.setState({ turn: 1 });
  };

// uses state to see if user has toggled rotation and acts accordingly
  changeTurning = () => {
    if (this.state.turn === 1) {
      this.setState({ turn: 0 });
    } else {
      this.setState({ turn: 1 });
    }

  };


// the function used to handle a click on a country in the globe.
// This function pushes data to state space and calls post function.
  updateCountry = (country1,country2,abrev) =>{

    this.setState({
      countrylist: [country1, country2],
      abr:abrev.toString().toLowerCase(),
    }, function(){
      console.log(this.state.abr);
      // console.log(this.post);
      this.post();

    });
  }

//This function creates the "blurb" of text in the popup that gives a general idea to the user.
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
    return this.state.countrylist[0] + " has freedom rating " + this.state.api_data[2] + " and is thus deemed as "  + x + "."+"\n As analyzed using the Grid cell population over 20 years (GeoEconomic Data), the slope very clearly corresponds with the number of refugees per country.";
  }

// function that determines what dataset or color scheme the user would like(see map.js)
  changeData = () => {
    if (this.state.popData){
      this.setState({popData:false})
    }
    else {
        this.setState({popData: true })
    }
  }

// Popup function that determines if the popup opens.
  openModal = () => {
    this.setState({ open: true });
  };

  // Popup function that determines if the popup closes.
  closeModal = () => {
  this.setState({ open: false });
  };

// This is where some of the magic happens. Using axois, we connect and request to a backend REST API to
// get the data realtime based on the country clicked. After getting the response,
//which comprises of years vs refugee count with freedom index,freedom rating,
//and individualized projected geogrpahical data, we preprocess all the responses for visualization
// and set action-determining states accodingly.
  async post(){
    const test = await axios.put("http://localhost:5000/",{"list" : [this.state.countrylist]}).then(async(response) =>{

      this.setState({api_data: response["data"]["output"]});
      this.setState({years: response["data"]["output"][0]});
      this.setState({refCount: response["data"]["output"][1]});
      //this.setState({showMap : true});
      this.setState({text_stub : this.makeText()});

      var graph1 = [];
      for (var x = 0; x <response["data"]["output"][0].length; x++) {
            graph1.push({  years: this.state.years[x],
                           refCount: this.state.refCount[x]});
        }
      this.setState({graph: graph1});
      this.setState({showMap: true});
      this.setState({ open: true });

    }).catch(error => {
alert(error);
    });
    return test;
  };

//sets state that determines the stopping of globe rotation.
  stopTurning = () => {
    this.setState({ turn: 0 });
  };

// Refreshes render every 1ms and changes center to simulate 3d rotation.
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

//Clears the interval to avoid state cache problems.
  componentWillUnmount() {
    clearInterval(this.interval);
  }

// SIDE NOTE: the coordinate system of this globe is E, N, not the conventional N,E. - denotates south or west.

//This render simply renders all the process and refined visualizations
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
          <Popup
            open={this.state.open}
            closeOnDocumentClick
            onClose={this.closeModal}
            contentStyle = {{background: "#D3D3D3"}}
          >
            <ControlledPopup
              dat ={this.state.graph}
              blurb = {this.state.text_stub}
              country = {this.state.countrylist[0]}
              abrev = {this.state.abr}/>
          </Popup>

      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
