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
            data: props.data,
            borderColor: props.borderColor,
            backgroundColor: props.backgroundColor,
            pointRadius: "0",
            borderWidth: 2
          }
        ]
      }
    };
  }
  render() {
    return (
      <div>
        <Card style={{ height: "auto" }}>
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography
                  variant="h6"
                  style={{ float: "inherit", marginLeft: "8px" }}
                >
                  {this.props.label_1}
                </Typography>

                <Typography
                  variant="h6"
                  style={{ float: "inherit", marginLeft: "8px" }}
                >
                  PKR: {this.props.amount}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="h6" style={{ float: "right" }}>
                  {this.props.label_2}
                </Typography>

                <Typography
                  variant="h6"
                  style={{ float: "right", clear: "right" }}
                >
                  {this.props.trend}
                </Typography>
              </Grid>
              <br />
              <Grid item xs={12}>
                {/* <CardContent> */}
                <div>
                  <Line
                    //width="8px"
                    height="60px"
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
                {/* </CardContent> */}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default CustomCard;
