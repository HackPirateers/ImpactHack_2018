import React, { Component } from "react";
import { render } from "react-dom";
import Map from "./Map";

import "./styles.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      center: [0, 0],
      size: 5,
      turn: 1,
      popData: false,
      markers: [
        {
          markerOffset: -25,
          name: "Buenos Aires",
          coordinates: [-58.3816, -34.6037]
        },
        {
          markerOffset: -25,
          name: "La Paz",
          coordinates: [-68.1193, -16.4897]
        },
        {
          markerOffset: 35,
          name: "Brasilia",
          coordinates: [-47.8825, -15.7942]
        },
        {
          markerOffset: 35,
          name: "Santiago",
          coordinates: [-70.6693, -33.4489]
        },
        { markerOffset: 35, name: "Bogota", coordinates: [-74.0721, 4.711] },
        { markerOffset: 35, name: "Quito", coordinates: [-78.4678, -0.1807] },
        {
          markerOffset: -20,
          name: "Georgetown",
          coordinates: [-58.1551, 6.8013]
        },
        {
          markerOffset: -25,
          name: "Asuncion",
          coordinates: [-57.5759, -25.2637]
        },
        // {
        //   markerOffset: 35,
        //   name: "Paramaribo",
        //   coordinates: [-55.2038, 5.852]
        // },
        // {
        //   markerOffset: 35,
        //   name: "Montevideo",
        //   coordinates: [-56.1645, -34.9011]
        // },
        // {
        //   markerOFfset: 35,
        //   name: "União dos Ventos 2",
        //   coordinates: [-5.0806, -35.8258]
        // },
        // {
        //   markerOFfset: 35,
        //   name: "Elk River Wind",
        //   coordinates: [37.5797, -96.5503]
        // },
        // {
        //   markerOFfset: 35,
        //   name: "Iberafrica I & II (Nairobi south diesel PP)",
        //   coordinates: [-1.2431, 36.8905]
        // },
        // {
        //   markerOFfset: 35,
        //   name: "Aleppo Thermal Power Plant Syria",
        //   coordinates: [36.1763, 37.437]
        // },
        // { markerOFfset: 35, name: "Belding", coordinates: [45.146, -71.8078] },
        // {
        //   markerOFfset: 35,
        //   name: "TROMBAY WORKS",
        //   coordinates: [19.0366, 72.8892]
        // },
        // { markerOFfset: 35, name: "Liu'ao", coordinates: [23.86, 117.49] },
        // {
        //   markerOFfset: 35,
        //   name: "Gommerville",
        //   coordinates: [48.3788, 1.8827]
        // },
        // {
        //   markerOFfset: 35,
        //   name: "Huittinen  Pahkionvuori tv",
        //   coordinates: [61.1833, 22.7]
        // },
        // { markerOFfset: 35, name: "Imboulou", coordinates: [-2.97, 16.08] },
        // {
        //   markerOFfset: 35,
        //   name: "Horton Landfill Site",
        //   coordinates: [50.8985, -0.2878]
        // },
        // {
        //   markerOFfset: 35,
        //   name: "Osečná Solar Power Plant",
        //   coordinates: [50.7236, 14.9176]
        // },
        // {
        //   markerOFfset: 35,
        //   name: "Yonggwang",
        //   coordinates: [35.419, 126.4286]
        // },
        // {
        //   markerOFfset: 35,
        //   name: "Higashiyama Solar Power Plant",
        //   coordinates: [39.0071, 141.2705]
        // },
        // {
        //   markerOFfset: 35,
        //   name: "Ambohimanambola",
        //   coordinates: [-19.8, 46.6167]
        // },
        // {
        //   markerOFfset: 35,
        //   name: "Bacurato",
        //   coordinates: [25.8537, -107.9021]
        // },
        // {
        //   markerOFfset: 35,
        //   name: "PORTO VIRO",
        //   coordinates: [45.0178, 12.2408]
        // },
        // { markerOFfset: 35, name: "Dah-Tarn", coordinates: [25.027, 121.048] },
        // { markerOFfset: 35, name: "Waipapa", coordinates: [-38.292, 175.6835] },
        // {
        //   markerOFfset: 35,
        //   name: "Maple Leaf",
        //   coordinates: [32.9052, 71.6119]
        // },
        // { markerOffset: -15, name: "Caracas", coordinates: [-66.9036, 10.4806] }
      ]
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

  changeData = () => {
    if (this.state.popData){
      this.setState({popData:false})
    }
    else {
        this.setState({popData: true })
    }
  }

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
          <button
            className="btn"
            onClick={this.changeCenter([-122.4194, 37.7749])}
          >
            {"San Francisco"}
          </button>
          <button
            className="btn"
            onClick={this.changeCenter([78.6569, 11.1271])}
          >
            {"Tamil Nadu"}
          </button>
          <button
            className="btn"
            onClick={this.changeCenter([-74.006, 40.7128])}
          >
            {"New York"}
          </button>
          <button
            className="btn"
            onClick={this.changeCenter([151.2093, -33.8688])}
          >
            {"Sydney"}
          </button>
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
        />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
