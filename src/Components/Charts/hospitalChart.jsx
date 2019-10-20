import React, { Component } from "react";
import { Line } from "react-chartjs-2";
export default class hospitalChart extends Component {
  state = {
    data: {
      labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thurs", "Fri"],
      datasets: [
        {
          label: "Daily Income",
          data: [100, 110, 120, 105, 90, 100, 85],
          backgroundColor: "rgba(0,255,0,0.4)"
        },
        {
          label: "Daily Expenses",
          data: [90, 100, 140, 135, 150, 90, 95],
          backgroundColor: "rgba(255,0,0,0.6)"
        }
      ]
    }
  };
  render() {
    return (
      <div
        style={{
          position: "relative",
          height: "550px",
          width: "600px",
          marginLeft: "100px",
          marginTop: "40px"
        }}
      >
        <h3>Charts Related to Hospitals</h3>
        <Line options={{ responsive: true }} data={this.state.data} />
      </div>
    );
  }
}
