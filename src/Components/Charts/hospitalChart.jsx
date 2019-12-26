import React, { Component } from "react";
import { Line, Pie, Bar } from "react-chartjs-2";
import { Grid, Typography, ButtonGroup } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import Popup from "reactjs-popup";
import "./popUp.css";
export default class hospitalChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
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
            backgroundColor: "rgb(53, 12, 107)"
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
              "rgba(24,0,50,0.5)",
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
      patientPrediction: {},
      recomendedServices: {
        services: ["X-Ray", "Blood CP", "MRI"]
      }
    };
    this.openMoal = this.openMoal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  openMoal() {
    this.setState({ open: true });
  }
  closeModal() {
    this.setState({ open: false });
  }
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
            <Card style={{ height: "300x" }}>
              <CardContent>
                <Button
                  onClick={this.openMoal}
                  variant="contained"
                  color="primary"
                  style={{
                    float: "right",
                    marginRight: "12px",
                    marginBottom: "5px"
                  }}
                >
                  Prediction
                </Button>
                <Line
                  // width="100vw"
                  height="220px"
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
                      caretPadding: 10
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
        {/* POP UP Components */}
        <Popup
          open={this.state.open}
          closeOnDocumentClick
          onClose={this.closeModal}
          modal
        >
          <Card>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginLeft: "15px",
                marginRight: "15px",
                marginTop: "3px",
                marginBottom: "3px"
              }}
            >
              <Typography variant="h6">Prediction</Typography>
              <ButtonGroup
                variant="text"
                color="primary"
                aria-label="text primary button group"
              >
                <Button selected>1 Month</Button>
                <Button>6 Month</Button>
                <Button>1 Year</Button>
              </ButtonGroup>
            </div>
            <CardContent>
              <Line
                height="220px"
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
                    caretPadding: 10
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
        </Popup>
      </div>
    );
  }
}
