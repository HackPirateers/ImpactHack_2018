import React from "react";
//This is the module we used to create the react-popup
import Popup from "reactjs-popup";
//This is the module we used to create the Linechart.
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label} from "recharts";

class ControlledPopup extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        {/* //This is the header, which includes the country name and flag */}
          <div>
            {this.props.country + " "}
            <img src={require('./png/' + this.props.abrev+ '.png')} width="20" height="10" />
          </div>
          <div className="modal">
            <a className="close" onClick={this.closeModal}>
              &times;
            </a>
          {/* //This is the Linechart, in data={}, this is where we put in the array */}
            <LineChart width={750} height={350} data={this.props.dat}
              margin={{top: 5, right: 20, left: 20, bottom: 5}}>
         <XAxis stroke="#000000" dataKey="years"/>
         <YAxis stroke="#000000"/>
         <CartesianGrid stroke="#000000" strokeDasharray="3 3"/>
         <Tooltip/>
         <Legend />
         <Line type="monotone" dataKey="refCount" stroke="#000000" activeDot={{r: 8}}/>
        </LineChart>
          </div>
          <div>
            {/* //This includes the blurb for a person twist */}
            {this.props.blurb}
          </div>
      </div>
    );
  }
}
export default ControlledPopup;
