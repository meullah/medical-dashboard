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
          borderWidth: 2,
          backgroundColor: "rgb(97, 1, 107)"
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
  setGradientColor = canvas => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 10, 100);
    gradient.addColorStop(0, "#20f08b");
    gradient.addColorStop(0.5, "#20f08b");
    gradient.addColorStop(1, "#07dfb1");
  };
  getChartData = canvas => {
    const data = this.state.data;
    if (data.datasets) {
      // let color = "rgba(255, 1, 107,0.5)";
      const ctx = canvas.getContext("2d");
      // const gradient = ctx.createLinearGradient(0, 100, 0, 50);
      var gradient = ctx.createLinearGradient(0, 170, 0, 50);
      gradient.addColorStop(0, "rgba(128, 182, 244, 0.02)");
      gradient.addColorStop(1, "rgba(97, 1, 107, 0.40)");
      
      data.datasets.forEach((set, i) => {
        set.backgroundColor = gradient;
      });
      // data.datasets.backgroundColor = this.setGradientColor(canvas, color);
    }
    return data;
  };
  render() {
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card style={{ height: "250px" }}>
              <CardContent>
                <Line
                  // width="100vw"
                  height="220px"
                  options={{
                    legend: {
                      display: false
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            // max: 130,
                            beginAtZero: true
                            // stepSize: 10
                          },
                          gridLines: {
                            display: false
                          },
                          scaleLabel: {
                            display: true,
                            labelString: "Total Expenses"
                          }
                        }
                      ],
                      xAxes: [
                        {
                          gridLines: {
                            display: false
                          }
                        }
                      ]
                    }
                  }}
                  data={this.getChartData}
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
