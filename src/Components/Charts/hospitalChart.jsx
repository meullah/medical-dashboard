import React, { Component } from "react";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import { Grid, Typography, ButtonGroup } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import Popup from "reactjs-popup";
import "./popUp.css";
import Select from "../Select/select";
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
            borderWidth: 3,
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
      departmentalExpensesChart: {
        labels: [
          "Admissions",
          "Anesthetics",
          "Burn Center",
          "Cardiology",
          "Chaplaincy",
          "Imaging",
          "Emergency",
          "Gastroenterology",
          "General",
          "Surgery",
          "Gynecology",
          "Haematology",
          "ICU",
          "Infection",
          "Maternity",
          "Microbiology",
          "Neonatal",
          "Nephrology",
          "Neurology",
          "Obstetrics",
          "Therapy",
          "Oncology",
          "Ophthalmology",
          "Orthopaedics",
          "Otolaryngology",
          "Physiotherapy",
          "Radiology",
          "Radiotherapy"
        ],
        datasets: [
          {
            label: "Departmental Expenses",
            data: [
              3179,
              1744,
              2416,
              4232,
              3668,
              1734,
              1241,
              3033,
              3247,
              2875,
              3427,
              2368,
              598,
              2916,
              974,
              2187,
              3281,
              3328,
              418,
              4227,
              4565,
              1360,
              3475,
              2737,
              1085,
              507,
              2663,
              1485
            ],
            backgroundColor: "yellow",
            borderColor: "rgb(97, 1, 107)",
            borderWidth: 3
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
  getChartData = canvas => {
    const data = this.state.data;
    if (data.datasets) {
      const ctx = canvas.getContext("2d");
      var gradient = ctx.createLinearGradient(0, 170, 0, 50);
      gradient.addColorStop(0, "rgba(128, 182, 244, 0.00)");
      gradient.addColorStop(1, "rgba(97, 1, 107, 0.20)");
      data.datasets.forEach(set => {
        set.backgroundColor = gradient;
      });
    }
    return data;
  };
  getDepartmentalChartData = canvas => {
    const data = this.state.departmentalExpensesChart;
    if (data.datasets) {
      const ctx = canvas.getContext("2d");
      var gradient = ctx.createLinearGradient(0, 170, 0, 50);
      gradient.addColorStop(0, "rgba(128, 182, 244, 0.00)");
      gradient.addColorStop(1, "rgba(97, 1, 107, 0.25)");
      data.datasets.backgroundColor = gradient;
      data.datasets.forEach(set => {
        set.backgroundColor = gradient;
      });
    }
    return data;
  };

  render() {
    const myStyles = {
      display: "flex",
      justifyContent: "space-between",
      marginLeft: "15px",
      marginRight: "15px",
      marginTop: "3px",
      marginBottom: "3px",
      paddingTop: "10px"
    };
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card style={{ height: "300x" }}>
              <div style={myStyles}>
                <Typography variant="h6">Amount Transaction</Typography>
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
              </div>
              <CardContent>
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
          <Grid item xs={12}>
            <Card style={{ height: "320px" }}>
              <div style={myStyles}>
                <Typography variant="h6">Departmental Expenses</Typography>
                <ButtonGroup
                  variant="contained"
                  color="primary"
                  aria-label="contained primary button group"
                >
                  <Button selected>1 Month</Button>
                  <Button>6 Month</Button>
                  <Button>1 Year</Button>
                </ButtonGroup>
              </div>
              <CardContent>
                <Bar
                  height="250px"
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
                            beginAtZero: true,
                            stepSize: 1000
                          },
                          gridLines: {
                            display: false
                          },
                          scaleLabel: {
                            display: true,
                            labelString: "Departmental Expenses"
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
                  data={this.getDepartmentalChartData}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card style={{ height: "250px" }}>
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
                <Typography variant="h6">Gender</Typography>
                <Select />
              </div>
              <CardContent>
                <Doughnut
                  height="150px"
                  data={this.state.GenderChart}
                  options={{
                    responsive: true,
                    legend: {
                      position: "right",
                      align: "middle"
                    }
                  }}
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
        {/* POP UP Component */}
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
