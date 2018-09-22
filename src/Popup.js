import React from "react";
import Popup from "reactjs-popup";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label} from "recharts";

class ControlledPopup extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
          <div>
            {this.props.country + " "}
            <img src={require('./png/' + this.props.abrev+ '.png')} width="20" height="10" />
          </div>
          <div className="modal">
            <a className="close" onClick={this.closeModal}>
              &times;
            </a>
            <LineChart width={750} height={350} data={this.props.dat}
              margin={{top: 5, right: 20, left: 20, bottom: 5}}>
                 <XAxis dataKey="years">
                     <Label value="Years" offset={0} position="insideBottom" />
                 </XAxis>
                 <YAxis>
                     <Label value="Refugees" offset={0} position="insideLeft" angle={90}/>
                 </YAxis>
         <XAxis stroke="#000000" dataKey="years"/>
         <YAxis stroke="#000000"/>
         <CartesianGrid stroke="#000000" strokeDasharray="3 3"/>
         <Tooltip/>
         <Legend />
         <Line type="monotone" dataKey="refCount" stroke="#000000" activeDot={{r: 8}}/>
        </LineChart>
          </div>
          <div>
            {this.props.blurb}
          </div>
      </div>
    );
  }
}
export default ControlledPopup;
