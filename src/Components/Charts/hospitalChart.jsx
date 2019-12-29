import React, { Component } from "react";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import { Grid, Typography, ButtonGroup } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import Popup from "reactjs-popup";
import "./popUp.css";
import Select from "../Select/select";
import CustomCard from "../CustomCard";
export default class hospitalChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openMorePopUp: false,
      data: {
        labels: [
          "JAN",
          "FEB",
          "MAR",
          "APR",
          "MAY",
          "JUN",
          "JUL",
          "AUG",
          "SEP",
          "OCT",
          "NOV",
          "DEC"
        ],
        datasets: [
          {
            label: "Total Expenses",
            data: [100, 110, 76, 105, 50, 100, 90, 95, 100, 75, 110, 120],
            borderColor: "#1f8ef1",
            borderWidth: 2,
            pointBackgroundColor: "#1f8ef1",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#1f8ef1",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4
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
      AgeGroupChart: {
        labels: ["0-18", "18-40", "40+"],
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
            borderColor: "#d048b6",
            borderWidth: 2
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
    this.openPopUp_more = this.openPopUp_more.bind(this);
    this.closePopUp_more = this.closePopUp_more.bind(this);
  }
  openMoal() {
    this.setState({ open: true });
  }
  closeModal() {
    this.setState({ open: false });
  }
  openPopUp_more() {
    this.setState({ openMorePopUp: true });
  }
  closePopUp_more() {
    this.setState({ openMorePopUp: false });
  }
  getChartData = canvas => {
    const data = this.state.data;
    if (data.datasets) {
      const ctx = canvas.getContext("2d");
      var gradient = ctx.createLinearGradient(0, 230, 0, 50);

      gradient.addColorStop(1, "rgba(29,140,248,0.2)");
      gradient.addColorStop(0.4, "rgba(29,140,248,0.0)");
      gradient.addColorStop(0, "rgba(29,140,248,0)");
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
      var gradient = ctx.createLinearGradient(0, 230, 0, 50);
      gradient.addColorStop(1, "rgba(72,72,176,0.1)");
      gradient.addColorStop(0.4, "rgba(72,72,176,0.0)");
      gradient.addColorStop(0, "rgba(119,52,169,0)");

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
      paddingTop: "10px",
      alignItems: "center"
    };
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <CustomCard label_1="Expenses" label_2="(Current)" amount="30000" />
          </Grid>

          <Grid item xs={4}>
            <CustomCard
              label_1="Expenses"
              label_2="(Exp 2019)"
              amount="15000"
            />
          </Grid>

          <Grid item xs={4}>
            <CustomCard
              label_1="Expenses"
              label_2="(Exp 2020)"
              amount="50000"
            />
          </Grid>
          <Grid item xs={12}>
            <Card style={{ height: "300px" }}>
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
                      backgroundColor: "#f5f5f5",
                      titleFontColor: "#333",
                      bodyFontColor: "#666",
                      bodySpacing: 4,
                      xPadding: 12,
                      mode: "nearest",
                      intersect: 0,
                      position: "nearest"
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      yAxes: [
                        {
                          barPercentage: 1.6,
                          gridLines: {
                            drawBorder: false,
                            color: "rgba(29,140,248,0.0)",
                            zeroLineColor: "transparent"
                          },
                          ticks: {
                            suggestedMin: 60,
                            suggestedMax: 125,
                            padding: 20,
                            fontColor: "#9a9a9a"
                          }
                        }
                      ],
                      xAxes: [
                        {
                          barPercentage: 1.6,
                          gridLines: {
                            drawBorder: false,
                            color: "rgba(29,140,248,0.1)",
                            zeroLineColor: "transparent"
                          },
                          ticks: {
                            padding: 20,
                            fontColor: "#9a9a9a"
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
                    tooltips: {
                      backgroundColor: "#f5f5f5",
                      titleFontColor: "#333",
                      bodyFontColor: "#666",
                      bodySpacing: 4,
                      xPadding: 12,
                      mode: "nearest",
                      intersect: 0,
                      position: "nearest"
                    },

                    scales: {
                      yAxes: [
                        {
                          gridLines: {
                            drawBorder: false,
                            color: "rgba(225,78,202,0.1)",
                            zeroLineColor: "transparent"
                          },
                          ticks: {
                            suggestedMin: 60,
                            suggestedMax: 120,
                            padding: 20,
                            fontColor: "#9e9e9e"
                          }
                        }
                      ],
                      xAxes: [
                        {
                          gridLines: {
                            drawBorder: false,
                            color: "rgba(225,78,202,0.1)",
                            zeroLineColor: "transparent"
                          },
                          ticks: {
                            padding: 20,
                            fontColor: "#9e9e9e"
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
            <Card style={{ height: "300px" }}>
              <div style={myStyles}>
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
            <Card style={{ height: "300px" }}>
              <div style={myStyles}>
                <Typography variant="h6">Age Group</Typography>
                <Select />
              </div>
              <CardContent>
                <Doughnut
                  height="150px"
                  data={this.state.AgeGroupChart}
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
            <Card style={{ height: "300px" }}>
              <div style={myStyles}>
                <Typography variant="h6">Trending Services</Typography>
                <Button
                  onClick={this.openPopUp_more}
                  variant="contained"
                  color="primary"
                  style={{
                    float: "right",
                    marginRight: "12px",
                    marginBottom: "5px"
                  }}
                >
                  more
                </Button>
              </div>
              <CardContent>
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
            <div style={myStyles}>
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
        <Popup
          open={this.state.openMorePopUp}
          closeOnDocumentClick
          onClose={this.closePopUp_more}
          modal
        >
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Card>
                    <div style={myStyles}>
                      <Typography variant="h6">Doctors</Typography>
                      <Select />
                    </div>
                    <CardContent>
                      {this.state.recomendedServices.services.map(
                        (el, index) => (
                          <h4 key={index}>
                            {index + 1}. {el}
                          </h4>
                        )
                      )}
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card>
                    <CardContent>
                      {this.state.recomendedServices.services.map(
                        (el, index) => (
                          <h4 key={index}>
                            {index + 1}. {el}
                          </h4>
                        )
                      )}
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card>
                    <CardContent>
                      {this.state.recomendedServices.services.map(
                        (el, index) => (
                          <h4 key={index}>
                            {index + 1}. {el}
                          </h4>
                        )
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Popup>
      </div>
    );
  }
}
