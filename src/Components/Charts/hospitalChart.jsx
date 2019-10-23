import React, { Component } from "react";
import { Line, Pie, Bar } from "react-chartjs-2";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

export default class hospitalChart extends Component {
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
          label: "Total Expenses",
          data: [100, 110, 76, 105, 50, 100, 90, 95, 100, 75, 110, 120],
          borderColor: "rgb(97, 1, 107)",
          borderWidth: 1,
          backgroundColor: "rgba(97, 1, 107,0.1)"
        }
      ]
    },
    GenderChart: {
      labels: ["Male", "Female", "Others"],
      datasets: [
        {
          label: "Total Patients",
          data: [2300, 3000, 500],
          backgroundColor: [
            "rgba(224,0,50,0.5)",
            "rgba(24,178,255,0.5)",
            "rgba(255,178,000,0.5)"
          ]
        }
      ]
    },
    trendingServicesChart: {
      labels: ["Cardiology", "Nephrology", "Haematology", "Ophthalmology"],
      datasets: [
        {
          label: "Departmental Expenses",
          data: [4300, 6500, 2900, 5000],
          backgroundColor: ["#d9ed00", "#7aed6f", "#607b99", "#34263b"]
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
                  options={{ responsive: false }}
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
                  width="350px"
                  height="250px"
                  options={{ responsive: false }}
                  data={this.state.trendingServicesChart}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card style={{ height: "250px" }}>
              <CardContent>
                <h3>Trending Services</h3>
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
