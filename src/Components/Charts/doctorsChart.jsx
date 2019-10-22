import React, { Component } from "react";
import { Line, Pie, Bar } from "react-chartjs-2";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

export default class doctorsChart extends Component {
  state = {
    data: {
      labels: [
        "Jan",
        "Feb",
        "March",
        "April",
        "May",
        "June",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
      datasets: [
        {
          label: "Number of patients checked",
          data: [100, 110, 120, 105, 90, 100, 85, 95, 100, 105, 110, 120],
          borderColor: "rgb(255,0,0)",
          borderWidth: 1,
          backgroundColor: "rgba(255,0,0,0.1)"
        }
      ]
    },
    GenderChart: {
      labels: ["Male", "Female", "Others"],
      datasets: [
        {
          label: "Gender",
          data: [100, 60, 5],
          backgroundColor: [
            "rgb(224,0,50)",
            "rgb(24,178,255)",
            "rgb(255,178,000)"
          ]
        }
      ]
    },
    AgeBarChart: {
      labels: ["Child", "Teen", "Middle", "Old"],
      datasets: [
        {
          label: "Female",
          data: [30, 70, 120, 50],
          backgroundColor: "rgb(224,0,50)"
        },
        {
          label: "Male",
          data: [60, 30, 80, 60],
          backgroundColor: "rgb(255,178,000)"
        }
      ]
    },
    recomendedServices: {
      services: ["X-Ray", "Blood CP", "MRI"]
    }
  };
  render() {
    return (
      <div
        style={{
          position: "relative",
          height: "100%",
          maxHeight: "100%",
          width: "680px",
          marginLeft: "100px",
          marginTop: "0px",
          paddingTop: "30px"
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <Card style={{ height: "250px" }}>
              <CardContent>
                {/* <h3>Charts Related to Doctors</h3> */}
                <Line options={{ responsive: true }} data={this.state.data} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={5}>
            <Card style={{ height: "250px" }}>
              <CardContent>
                <h3>Charts Related to Doctors</h3>
                <Pie
                  options={{ responsive: true }}
                  data={this.state.GenderChart}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={7}>
            <Card style={{ height: "250px" }}>
              <CardContent>
                {/* <h3>Charts Related to Doctors</h3> */}
                <Bar
                  options={{
                    responsive: true,
                    scales: {
                      xAxes: [{ stacked: true }],
                      yAxes: [{ stacked: true }]
                    }
                  }}
                  data={this.state.AgeBarChart}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={5}>
            <Card style={{ height: "250px" }}>
              <CardContent>
                <h3>Most Recomended Services</h3>
                {this.state.recomendedServices.services.map((el, index) => (
                  <h4>
                    {index + 1}. {el}
                  </h4>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}
