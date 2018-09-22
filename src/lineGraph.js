import React, {Component} from "react";
import Part2 from "./part2";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,Label} from "recharts";
const x = 0;
var graph_data = [];
var colorCode = "";
export default class Graph extends Component{

  findColor = (scoreF) =>{

console.log(colorCode);
    if(0 <=scoreF && scoreF <= 54 ){
      colorCode = "#b71414";
    }
    else if(55 <= scoreF && scoreF <= 109){
      colorCode = "#d16625";

    }
    else if(110 <= scoreF && scoreF <= 164){
      colorCode = "#d1ab25";

    }
    else if(165 <= scoreF && scoreF <= 219){
      colorCode = "#ced125";
    }
    else if(220 <= scoreF && scoreF <= 273){
      colorCode = "#11aa28";
    }
  };

render(){
    return (

      <div>
      <div>

      <div>
        <section class="tm-section-intro">
                <div class="tm-wrapper-center">
                    <h1 class="tm-section-intro-title">Diplomatic Relations</h1>
                    <p class="tm-section-intro-text">Smart Application that predicts Dipolmatic Relations of a country<br/>
                       the day zero of a specific county<br/>
                    </p>
                </div>

        </section>

        <div class="tm-wrapper-center" >
          <h1>{this.props.country1} and {this.props.country2}</h1>
          <LineChart width={1000} height={400} data={this.props.data}
                    margin={{top: 5, right: 30, left: 20, bottom: 15}}>
                <XAxis dataKey="year">
                <Label value="year" position="bottom" offset={10}/>
                </XAxis>
                <YAxis label={{ value: 'Diplomatic Exchanges', angle: -90, position: 'insideLeft' }} dataKey="de" />
               <CartesianGrid strokeDasharray="3 3"/>
               <Tooltip/>
               <Legend />
               {  this.findColor(this.props.score)}
               <Line type="monotone" strokeWidth = {4} dataKey="de" stroke={colorCode} activeDot={{r: 4}}/>
              </LineChart>
            <h2>Score: {this.props.score}</h2>

        </div>
      </div>
      </div>
{/* } */}
</div>

    );
  }
}
