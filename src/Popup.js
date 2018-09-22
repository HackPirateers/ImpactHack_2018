import React from "react";
// import Warper from "./Warper";
import Popup from "reactjs-popup";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label} from "recharts";

// const data = [
//       {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
//       {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
//       {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
//       {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
//       {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
//       {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
//       {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
// ];
class ControlledPopup extends React.Component {
  constructor() {
    super();
    this.state = { open: false };
  }
  openModal = () => {
    this.setState({ open: true });
  };
  closeModal = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <button className="button" onClick={this.openModal}>
          Controlled Popup
        </button>
        {console.log(this.props.dat)}
        <Popup
          open={this.state.open}
          closeOnDocumentClick
          onClose={this.closeModal}
        >
          <div>
            {this.props.country}
          </div>
          <div className="modal">
            <a className="close" onClick={this.closeModal}>
              &times;
            </a>
            <LineChart width={700} height={350} data={this.props.dat}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
         <XAxis dataKey="years"/>
         <YAxis/>
         <CartesianGrid strokeDasharray="3 3"/>
         <Tooltip/>
         <Legend />
         <Line type="monotone" dataKey="refCount" stroke="#8884d8" activeDot={{r: 8}}/>
        </LineChart>
          </div>
          <div>
            {this.props.blurb}
          </div>
        </Popup>
      </div>
    );
  }
}
export default ControlledPopup;
