import React, { Component } from "react";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import { Grid, Typography, ButtonGroup } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import Popup from "reactjs-popup";
import "./popUp.css";
import Select from "react-select";
import CustomCard from "../CustomCard";
import Carousel from "../Craousel/Mui_Craousel";

let date = new Date();
const options = [
  { value: date.getFullYear() - 1, label: date.getFullYear() - 1 },
  { value: date.getFullYear() - 2, label: date.getFullYear() - 2 },
  { value: date.getFullYear() - 3, label: date.getFullYear() - 3 },
  { value: date.getFullYear() - 4, label: date.getFullYear() - 4 },
  { value: date.getFullYear() - 5, label: date.getFullYear() - 5 },
];

export default class hospitalChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      // genderYear: null,
      selectedOption: null,
      YearlyTransation: {
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
          "DEC",
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
            pointRadius: 4,
          },
        ],
      },
      YearlyTransation_PREDICTION: {
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
          "DEC",
        ],
        datasets: [
          {
            label: "Total Expenses",
            data: [],
            borderColor: "#1f8ef1",
            borderWidth: 2,
            pointBackgroundColor: "#1f8ef1",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#1f8ef1",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
          },
        ],
      },
      GenderChart: {
        labels: ["Male", "Female", "Others"],
        datasets: [
          {
            label: "Total Patients",
            data: [2300, 3000, 500],
            backgroundColor: ["#1f8ef1", "#d048b6", "#00d6b4"],
            pointStyle: "line",
          },
        ],
      },
      AgeGroupChart: {
        labels: ["0-18", "18-40", "40+"],
        datasets: [
          {
            label: "Total Patients",
            data: [2300, 3000, 500],
            backgroundColor: ["#1f8ef1", "#d048b6", "#00d6b4"],
          },
        ],
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
          "Radiotherapy",
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
              1485,
            ],
            borderColor: "#d048b6",
            borderWidth: 2,
          },
        ],
      },
      patientPrediction: {},
      recomendedServices: {
        services: ["X-Ray", "Blood CP", "MRI"],
      },
    };
    this.openMoal = this.openMoal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  openMoal() {
    this.setState({ open: true });
    this.getPredictionData();
  }
  closeModal() {
    this.setState({ open: false });
  }

  getYearlyTransactionChartData = (canvas) => {
    const data = this.state.YearlyTransation;
    if (data.datasets) {
      const ctx = canvas.getContext("2d");
      var gradient = ctx.createLinearGradient(0, 230, 0, 50);

      gradient.addColorStop(1, "rgba(29,140,248,0.2)");
      gradient.addColorStop(0.4, "rgba(29,140,248,0.0)");
      gradient.addColorStop(0, "rgba(29,140,248,0)");
      data.datasets.forEach((set) => {
        set.backgroundColor = gradient;
      });
    }
    return data;
  };
  getDepartmentalChartData = (canvas) => {
    const data = this.state.departmentalExpensesChart;
    if (data.datasets) {
      const ctx = canvas.getContext("2d");
      var gradient = ctx.createLinearGradient(0, 230, 0, 50);
      gradient.addColorStop(1, "rgba(72,72,176,0.1)");
      gradient.addColorStop(0.4, "rgba(72,72,176,0.0)");
      gradient.addColorStop(0, "rgba(119,52,169,0)");

      data.datasets.backgroundColor = gradient;
      data.datasets.forEach((set) => {
        set.backgroundColor = gradient;
      });
    }
    return data;
  };
  getPredictionData = () => {
    console.log("here");

    fetch(`http://localhost:5000/hospitalYearlyPrediction/12`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data.pridicted_values);
        var previousStates = this.state.YearlyTransation_PREDICTION.datasets[0];
        previousStates.data = data.pridicted_values;
        // console.log(previousStates.data);
        this.setState({ previousStates });
        // console.log("new states", this.state.GenderChart.datasets[0].data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  get_Gender_Chart_Data = (handle) => {
    // this.setState({ genderYear: handle.value });
    // console.log("Handle Value", handle.value);
    fetch(`http://localhost:5000/genderData/year/${handle.value}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data.genderCounts);
        var previousStates = this.state.GenderChart.datasets[0];
        previousStates.data = data.genderCounts;
        // console.log(previousStates.data);
        this.setState({ previousStates });
        // console.log("new states", this.state.GenderChart.datasets[0].data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  get_Age_Group_Data = (handle) => {
    // console.log("Handle Value", handle.value);
    fetch(`http://localhost:5000/ageGroupData/year/${handle.value}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data.ageData);
        var previousStates = this.state.AgeGroupChart.datasets[0];
        previousStates.data = data.ageData;
        // console.log(previousStates.data);
        this.setState({ previousStates });
        // console.log("new states", this.state.GenderChart.datasets[0].data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getDepartmentsData = (handle) => {
    console.log("Handle Value", handle.value);
    fetch(`http://localhost:5000/departmentalExpensesData/year/${handle.value}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data.dept_exp_data);
        var previousStates = this.state.departmentalExpensesChart.datasets[0];
        previousStates.data = data.dept_exp_data.expenses; // data
        this.setState({ previousStates });
        // console.log(previousStates.data);
        var another_previousState = this.state.departmentalExpensesChart;
        another_previousState.labels = data.dept_exp_data.departments; // labels
        this.setState({ another_previousState });
        // console.log("new states", this.state.GenderChart.datasets[0].data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  get_yearly_transation_data = (handle) => {
    // console.log("Handle Value", handle.value);
    fetch(`http://localhost:5000/yearlyTransactionData/year/${handle.value}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data.yearlyTransaction);
        var previousStates = this.state.YearlyTransation.datasets[0]; // Y capital
        previousStates.data = data.yearlyTransaction; // data
        this.setState({ previousStates });
        // console.log(previousStates.data);
        // console.log("new states", this.state.GenderChart.datasets[0].data);
      })
      .catch((error) => {
        console.log(error);
      });
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
      alignItems: "center",
    };
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <CustomCard
              label_1="Expenses"
              label_2="Today"
              amount="30000"
              trend="+15%"
              data={[250, 322, 644, 190, 991, 502, 755, 501, 534, 237, 83, 313]}
              borderColor="#1f8ef1"
              backgroundColor="rgba(29,140,248,0.2)"
            />
          </Grid>

          <Grid item xs={4}>
            <CustomCard
              label_1="Expenses"
              label_2="(Exp 2019)"
              amount="15000"
              trend="-5%"
              data={[709, 144, 149, 522, 40, 125, 62, 268, 826, 755, 106, 773]}
              borderColor="#d048b6"
              backgroundColor="rgba(72,72,176,0.1)"
            />
          </Grid>

          <Grid item xs={4}>
            <CustomCard
              label_1="Expenses"
              label_2="(Exp 2020)"
              amount="50000"
              trend="+30%"
              data={[
                107,
                845,
                129,
                474,
                685,
                304,
                146,
                687,
                574,
                569,
                782,
                740,
              ]}
              borderColor="#00d6b4"
              backgroundColor="rgba(66,134,121,0.15)"
            />
          </Grid>

          <Grid item xs={12}>
            <Card style={{ height: "300px" }}>
              <div style={myStyles}>
                <Typography variant="h6">Amount Transaction</Typography>
                <div className="chart_menubar_1">
                  <Select
                    options={options}
                    placeholder="Year..."
                    onChange={this.get_yearly_transation_data}
                  />
                  <Button
                    onClick={this.openMoal}
                    variant="contained"
                    color="primary"
                    style={{
                      float: "right",
                      marginRight: "12px",
                      marginBottom: "5px",
                    }}
                  >
                    Prediction
                  </Button>
                </div>
              </div>
              <CardContent>
                <Line
                  // width="100vw"
                  height="220px"
                  options={{
                    legend: {
                      display: false,
                    },
                    tooltips: {
                      backgroundColor: "#f5f5f5",
                      titleFontColor: "#333",
                      bodyFontColor: "#666",
                      bodySpacing: 4,
                      xPadding: 12,
                      mode: "nearest",
                      intersect: 0,
                      position: "nearest",
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
                            zeroLineColor: "transparent",
                          },
                          ticks: {
                            suggestedMin: 60,
                            suggestedMax: 125,
                            padding: 20,
                            fontColor: "#9a9a9a",
                          },
                        },
                      ],
                      xAxes: [
                        {
                          barPercentage: 1.6,
                          gridLines: {
                            drawBorder: false,
                            color: "rgba(29,140,248,0.1)",
                            zeroLineColor: "transparent",
                          },
                          ticks: {
                            padding: 20,
                            fontColor: "#9a9a9a",
                          },
                        },
                      ],
                    },
                  }}
                  data={this.getYearlyTransactionChartData}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card style={{ height: "320px" }}>
              <div style={myStyles}>
                <Typography variant="h6">Departmental Expenses</Typography>
                <div className="chart_menubar">
                  <Select
                    options={options}
                    placeholder="Year..."
                    onChange={this.getDepartmentsData}
                  />
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
              </div>
              <CardContent>
                <Bar
                  height="250px"
                  options={{
                    legend: {
                      display: false,
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
                      position: "nearest",
                    },

                    scales: {
                      yAxes: [
                        {
                          gridLines: {
                            drawBorder: false,
                            color: "rgba(225,78,202,0.1)",
                            zeroLineColor: "transparent",
                          },
                          ticks: {
                            suggestedMin: 60,
                            suggestedMax: 120,
                            padding: 20,
                            fontColor: "#9e9e9e",
                          },
                        },
                      ],
                      xAxes: [
                        {
                          gridLines: {
                            drawBorder: false,
                            color: "rgba(225,78,202,0.1)",
                            zeroLineColor: "transparent",
                          },
                          ticks: {
                            padding: 20,
                            fontColor: "#9e9e9e",
                          },
                        },
                      ],
                    },
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

                <Select
                  options={options}
                  onChange={this.get_Gender_Chart_Data}
                  placeholder="Year..."
                />
              </div>
              <CardContent>
                <Doughnut
                  height="150px"
                  data={this.state.GenderChart}
                  options={{
                    responsive: true,
                    legend: {
                      position: "right",
                      align: "middle",
                      labels: {
                        usePointStyle: true,
                      },
                    },
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card style={{ height: "300px" }}>
              <div style={myStyles}>
                <Typography variant="h6">Age Group</Typography>
                <Select
                  options={options}
                  onChange={this.get_Age_Group_Data}
                  placeholder="Year..."
                />
              </div>
              <CardContent>
                <Doughnut
                  height="150px"
                  data={this.state.AgeGroupChart}
                  options={{
                    responsive: true,
                    legend: {
                      position: "right",
                      align: "middle",
                      labels: {
                        usePointStyle: true,
                      },
                    },
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card style={{ height: "300px" }}>
              <CardContent>
                <Carousel />
              </CardContent>
            </Card>
            {/* {this.state.recomendedServices.services.map((el, index) => (
                    <p key={index}>
                      {index + 1}. {el}
                    </p>
                  ))} */}
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
              {/* <ButtonGroup
                variant="text"
                color="primary"
                n
                aria-label="text primary button group"
              >
                <Button selected>1 Month</Button>
                <Button>6 Month</Button>
                <Button>1 Year</Button>
              </ButtonGroup> */}
            </div>
            <CardContent>
              <Line
                height="220px"
                options={{
                  legend: {
                    display: false,
                  },
                  tooltips: {
                    bodySpacing: 4,
                    mode: "nearest",
                    intersect: 0,
                    position: "nearest",
                    xPadding: 10,
                    yPadding: 10,
                    caretPadding: 10,
                  },
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    yAxes: [
                      {
                        ticks: {
                          // max: 130,
                          beginAtZero: true,
                          // stepSize: 10
                        },
                        gridLines: {
                          display: false,
                        },
                        scaleLabel: {
                          display: true,
                          labelString: "Total Expenses",
                        },
                      },
                    ],
                    xAxes: [
                      {
                        gridLines: {
                          display: false,
                        },
                      },
                    ],
                  },
                }}
                data={this.state.YearlyTransation_PREDICTION}
              />
            </CardContent>
          </Card>
        </Popup>
      </div>
    );
  }
}
