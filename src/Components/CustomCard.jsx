import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { Grid, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

class CustomCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
            data: [0, 0, 500, 0, 0, 0, 100, 25, 75, 0, 0, 0, 500, 0, 500, 500],
            borderColor: "rgb(97, 1, 107)",
            backgroundColor: "#fff",
            pointRadius: "0"
          }
        ]
      }
    };
  }
  render() {
    return (
      <div>
        <Card style={{ height: "115px" }}>
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="h6" style={{ float: "inherit" }}>
                  {this.props.label_1}
                </Typography>
                {/* <br /> */}
                <Typography variant="h7" style={{ float: "inherit" }}>
                  {this.props.label_2}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                {/* style={{ float: "right" }} */}
                <Typography variant="h6" style={{ float: "right" }}>
                  PKR: {this.props.amount}
                </Typography>

                <br />

                {/* <Card style={{ height: "auto" }} boxshadow="0">
                  <CardContent> */}

                <div>
                  <Line
                    //width="8px"
                    height="40px"
                    options={{
                      legend: {
                        display: false
                      },
                      tooltips: {
                        bodySpacing: 4,
                        mode: "nearest",
                        intersect: 0,
                        position: "nearest",
                        xPadding: 10,
                        yPadding: 10,
                        caretPadding: 10,
                        enabled: false
                      },
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        yAxes: [
                          {
                            ticks: {
                              // max: 130,
                              beginAtZero: true,
                              display: false
                              // stepSize: 10
                            },
                            gridLines: {
                              display: false
                            },
                            scaleLabel: {
                              display: false,
                              labelString: "Total Expenses"
                            }
                          }
                        ],
                        xAxes: [
                          {
                            ticks: {
                              // max: 130,
                              display: false
                              // stepSize: 10
                            },
                            gridLines: {
                              display: false
                            }
                          }
                        ]
                      }
                    }}
                    data={this.state.data}
                  />
                </div>
                {/* </CardContent>
                </Card> */}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default CustomCard;
