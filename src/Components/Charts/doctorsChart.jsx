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
          data: [100, 110, 76, 105, 90, 100, 50, 95, 100, 105, 110, 120],
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
          backgroundColor: "rgba(198, 7, 219,0.7)"
        },
        {
          label: "Male",
          data: [60, 30, 80, 60],
          backgroundColor: "rgba(18, 149, 219,0.5)"
        }
      ]
    },
    recomendedServices: {
      services: ["X-Ray", "Blood CP", "MRI"]
    }
  };
  render() {
    return (
      <div style={{}}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card style={{ height: "250px" }}>
              <CardContent>
                <Line
                  width="1200px"
                  height="220px"
                  options={{
                    responsive: false,
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            max: 130,
                            min: 50,
                            stepSize: 20
                          }
                        }
                      ]
                    }
                  }}
                  data={this.state.data}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card style={{ height: "250px" }}>
              <CardContent style={{ marginLeft: "40px" }}>
                <Pie
                  height="220px"
                  data={this.state.GenderChart}
                  options={{ responsive: false }}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card style={{ height: "250px" }}>
              <CardContent>
                <Bar
                  width="360px"
                  height="230px"
                  options={{
                    responsive: false,
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
          <Grid item xs={4}>
            <Card style={{ height: "250px" }}>
              <CardContent>
                <h3>Most Recomended Services</h3>
                {this.state.recomendedServices.services.map((el, index) => (
                  <h4 key={index}>
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
