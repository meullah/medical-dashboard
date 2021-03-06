import React, { Component } from "react";
import { Bar, Bubble, Doughnut } from "react-chartjs-2";
import { Grid, Typography } from "@material-ui/core";
// import Table from "@material-ui/core/Table";
import Card from "@material-ui/core/Card";
// import { makeStyles, withStyles } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import WarningIcon from "@material-ui/icons/Warning";
// import Button from "@material-ui/core/Button";
// import TableCell from "@material-ui/core/TableCell";
// import TableBody from "@material-ui/core/TableBody";
// import TableContainer from "@material-ui/core/TableContainer";
// import TableHead from "@material-ui/core/TableHead";
// import Paper from "@material-ui/core/Paper";
// import TableRow from "@material-ui/core/TableRow";
import Popup from "reactjs-popup";

import "./popUp.css";
// import axios from "axios";
// const StyledTableCell = withStyles((theme) => ({
//   head: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   body: {
//     fontSize: 14,
//   },
// }))(TableCell);

// const StyledTableRow = withStyles((theme) => ({
//   root: {
//     "&:nth-of-type(odd)": {
//       backgroundColor: theme.palette.background.default,
//     },
//   },
// }))(TableRow);

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

// const classes = makeStyles({
//   table: {
//     minWidth: 700,
//   },
// });

export default class doctorsChart extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
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
          "DEC",
        ],
        datasets: [
          {
            label: "Number of Patients",
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

      bubbleChart: {
        labels: ["Scatter"],
        yLabels: [],
        xLabels: [0, 1, 2, 3, 4, 5, 6, 7],

        datasets: [
          {
            label: "Services VS Age Group",
            fill: false,
            backgroundColor: "rgba(75,192,192,0.6)",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#f00",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 10,
            pointHitRadius: 10,
            data: [
              // { x: 0, y: 75, r: 10 },
              // { x: 1, y: 49, r: 10 },
              // { x: 2, y: 90, r: 150 },
              // { x: 3, y: 29, r: 30 },
              // { x: 4, y: 36, r: 10 },
              // { x: 5, y: 25, r: 50 },
              // { x: 6, y: 18, r: 16 },
            ],
          },
        ],
      },
      ageGroupChart: {
        labels: [
          "Less than 5",
          "Between 5 and 18",
          "Between 18 and 34",
          "Between 34 and 65",
          "65 and Above",
        ],
        datasets: [
          {
            label: "female",
            data: [],
            borderColor: "#d048b6",
            backgroundColor: "#d048b6",
            borderWidth: 2,
          },
          {
            label: "males",
            data: [],

            borderColor: "#1f8ef1",
            backgroundColor: "#1f8ef1",
            borderWidth: 2,
          },
        ],
      },
      patientGender: {
        labels: ["Female", "Male", "Others"],
        datasets: [
          {
            label: "Total Patients",
            data: [],
            backgroundColor: ["#d048b6", "#1f8ef1", "#00d6b4"],
            pointStyle: "line",
          },
        ],
      },
    };
  }

  componentDidMount() {
    console.log("doctors props", this.props);
    if (this.props.selectedYear !== null && this.props.doc_id !== null) {
      fetch(
        `https://stormy-shore-15606.herokuapp.com/doctorsPatientEarlyRecord/year/${this.props.selectedYear}/doc_id/${this.props.doc_id}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // console.log(data);
          var previousStates = this.state.data.datasets[0]; // Y capital
          previousStates.data = data; // data
          this.setState({ previousStates });
          // console.log("previous states", previousStates.data);
          // console.log("new states", this.state.GenderChart.datasets[0].data);
        })
        .catch((error) => {
          console.log(error);
        });

      // Fetch Patients Gender info
      fetch(
        `https://stormy-shore-15606.herokuapp.com/doctorsPatientGenderRecord/year/${this.props.selectedYear}/doc_id/${this.props.doc_id}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // console.log("gender data", data);
          let info = [];
          if ("F" in data) {
            info.push(data.F);
            if ("M" in data) {
              info.push(data.M);
            }
          } else if ("M" in data) {
            info.push(0);
            info.push(data.M);
          }

          var previousStates = this.state.patientGender.datasets[0]; // Y capital
          previousStates.data = info; // data
          this.setState({ previousStates });
          // console.log("previous states", previousStates.data);
          // console.log("new states", this.state.GenderChart.datasets[0].data);
        })
        .catch((error) => {
          console.log(error);
        });

      // fetch age group gender data

      fetch(
        `https://stormy-shore-15606.herokuapp.com/doctorsPatientGenderAgeRecord/year/${this.props.selectedYear}/doc_id/${this.props.doc_id}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log("gender Age data", data);
          // Y capital
          var states = this.state.ageGroupChart;
          var previousStates_female = states.datasets[0];
          var previousStates_male = states.datasets[1];
          previousStates_female.data = data.female;
          previousStates_male.data = data.male;
          this.setState({ states });
          // this.setState({ previousStates_male });

          // console.log("previous states", previousStates.data);
          // console.log("new states", this.state.GenderChart.datasets[0].data);
        })
        .catch((error) => {
          console.log(error);
        });

      //  get bubble chart data

      fetch(
        `https://stormy-shore-15606.herokuapp.com/doctorbubblechart/doc_id/${this.props.doc_id}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log("bubble chart data", data);
          var previousStates = this.state.bubbleChart.datasets[0];
          let newDict = [];
          let ageGroup = data.age_group;
          let freq = data.frequency;
          let service = data.service;
          console.log(ageGroup, freq, service, ageGroup.length);

          var i;
          for (i = 0; i < ageGroup.length; i++) {
            let temp = { x: ageGroup[i], y: service[i], r: freq[i] };
            newDict.push(temp);
          }
          previousStates.data = newDict;
          this.setState({ previousStates });

          console.log("previous states", previousStates.data);
          console.log("new states", this.state.bubbleChart.datasets[0].data);

          function compareNumbers(a, b) {
            return b - a;
          }

          let temp = this.state.bubbleChart;
          service = Array.from(new Set(service)).sort(compareNumbers);
          console.log(service);
          temp.yLabels = service;
          this.setState({ temp });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  updateAndNotify = () => {
    let year = this.props.selectedYear;
    let doctorID = this.props.doc_id;
    // let perviousStates = this.state.data.datasets[0];
    console.log("props changed");
    console.log("year = ", year, "doc id", doctorID);

    // async function getChartsData() {
    //   const patients_per_month = await axios.get(
    //     `https://stormy-shore-15606.herokuapp.com/doctorsPatientEarlyRecord/year/${year}/doc_id/${doctorID}`
    //   );
    //   console.log(patients_per_month);
    //   perviousStates.data = patients_per_month.data;
    // }
    // getChartsData();
    // this.setState({ perviousStates });
  };

  // check if props have changed or not
  // componentDidUpdate has previous props as a parameter

  componentDidUpdate(prevProps) {
    if (
      (prevProps.selectedYear !== this.props.selectedYear &&
        prevProps.doc_id !== null) ||
      (prevProps.doc_id !== this.props.doc_id &&
        prevProps.selectedYear !== null)
    ) {
      // Fetch Patients per month

      fetch(
        `https://stormy-shore-15606.herokuapp.com/doctorsPatientEarlyRecord/year/${this.props.selectedYear}/doc_id/${this.props.doc_id}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // console.log(data);
          var previousStates = this.state.data.datasets[0]; // Y capital
          previousStates.data = data; // data
          this.setState({ previousStates });
          // console.log("previous states", previousStates.data);
          // console.log("new states", this.state.GenderChart.datasets[0].data);
        })
        .catch((error) => {
          console.log(error);
        });

      // Fetch Patients Gender info
      fetch(
        `https://stormy-shore-15606.herokuapp.com/doctorsPatientGenderRecord/year/${this.props.selectedYear}/doc_id/${this.props.doc_id}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // console.log("gender data", data);
          let info = [];
          if ("F" in data) {
            info.push(data.F);
            if ("M" in data) {
              info.push(data.M);
            }
          } else if ("M" in data) {
            info.push(0);
            info.push(data.M);
          }

          var previousStates = this.state.patientGender.datasets[0]; // Y capital
          previousStates.data = info; // data
          this.setState({ previousStates });
          // console.log("previous states", previousStates.data);
          // console.log("new states", this.state.GenderChart.datasets[0].data);
        })
        .catch((error) => {
          console.log(error);
        });

      // fetch age group gender data

      fetch(
        `https://stormy-shore-15606.herokuapp.com/doctorsPatientGenderAgeRecord/year/${this.props.selectedYear}/doc_id/${this.props.doc_id}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log("gender Age data", data);
          // Y capital
          var states = this.state.ageGroupChart;
          var previousStates_female = states.datasets[0];
          var previousStates_male = states.datasets[1];
          previousStates_female.data = data.female;
          previousStates_male.data = data.male;
          this.setState({ states });
          // this.setState({ previousStates_male });

          // console.log("previous states", previousStates.data);
          // console.log("new states", this.state.GenderChart.datasets[0].data);
        })
        .catch((error) => {
          console.log(error);
        });

      //  get bubble chart data

      fetch(
        `https://stormy-shore-15606.herokuapp.com/doctorbubblechart/doc_id/${this.props.doc_id}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log("bubble chart data", data);
          var previousStates = this.state.bubbleChart.datasets[0];
          let newDict = [];
          let ageGroup = data.age_group;
          let freq = data.frequency;
          let service = data.service;
          console.log(ageGroup, freq, service, ageGroup.length);

          var i;
          for (i = 0; i < ageGroup.length; i++) {
            let temp = { x: ageGroup[i], y: service[i], r: freq[i] };
            newDict.push(temp);
          }
          previousStates.data = newDict;
          this.setState({ previousStates });

          console.log("previous states", previousStates.data);
          console.log("new states", this.state.bubbleChart.datasets[0].data);

          function compareNumbers(a, b) {
            return b - a;
          }

          let temp = this.state.bubbleChart;
          service = Array.from(new Set(service)).sort(compareNumbers);
          console.log(service);
          temp.yLabels = service;
          this.setState({ temp });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // if (
    //   prevProps.doc_id !== this.props.doc_id &&
    //   prevProps.selectedYear !== null
    // ) {
    //   fetch(
    //     `https://stormy-shore-15606.herokuapp.com/doctorsPatientEarlyRecord/year/${this.props.selectedYear}/doc_id/${this.props.doc_id}`
    //   )
    //     .then((response) => {
    //       return response.json();
    //     })
    //     .then((data) => {
    //       // console.log(data);
    //       var previousStates = this.state.data.datasets[0]; // Y capital
    //       previousStates.data = data; // data
    //       this.setState({ previousStates });
    //       // console.log("previous states", previousStates.data);
    //       // console.log("new states", this.state.GenderChart.datasets[0].data);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }
  }

  getChartData = (canvas) => {
    const data = this.state.data;
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
  getBubbleChartData = (canvas) => {
    const data = this.state.bubbleChart;
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
  getAgeGroupData = (canvas) => {
    const data = this.state.ageGroupChart;
    if (data.datasets) {
      const ctx = canvas.getContext("2d");
      var gradient = ctx.createLinearGradient(0, 230, 0, 50);
      gradient.addColorStop(1, "rgba(72,72,176,0.2)");
      gradient.addColorStop(0.4, "rgba(72,72,176,0.0)");
      gradient.addColorStop(0, "rgba(119,52,169,0)");

      data.datasets.backgroundColor = gradient;
      data.datasets.forEach((set) => {
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
      alignItems: "center",
    };
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card style={{ height: "300px" }}>
              <div style={myStyles}>
                <Typography variant="h6">Patients/Month</Typography>
                {/* <div>
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
                </div> */}
              </div>
              <CardContent>
                <Bar
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
                          gridLines: {
                            display: false,
                          },
                          ticks: {
                            suggestedMin: 0,
                            suggestedMax: 5,
                            padding: 20,
                            fontColor: "#9a9a9a",
                          },
                        },
                      ],
                      xAxes: [
                        {
                          gridLines: {
                            display: false,
                          },
                          ticks: {
                            padding: 20,
                            fontColor: "#9a9a9a",
                          },
                        },
                      ],
                    },
                  }}
                  data={this.getChartData}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={8}>
            <Card style={{ height: "320px" }}>
              <div style={myStyles}>
                <Typography variant="h6">
                  Patients' Record per Age group
                </Typography>
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
                            suggestedMin: 0,
                            suggestedMax: 5,
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
                  data={this.getAgeGroupData}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card style={{ height: "320px" }}>
              <div style={myStyles}>
                <Typography variant="h6">Patients record by gender</Typography>
              </div>

              <CardContent>
                <Doughnut
                  height="175px"
                  data={this.state.patientGender}
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
          <Grid item xs={12}>
            <Card style={{ height: "auto" }}>
              <div style={myStyles}>
                <Typography variant="h6">
                  Services Fequency Per Age Group
                  {/* <Typography>
                    0 corresponds to Age Group Less than 5
                  </Typography>
                  <Typography>
                    1 corresponds to Age Group Between 5 & 18
                  </Typography>
                  <Typography>
                    2 corresponds to Age Group Between 18 & 34
                  </Typography>
                  <Typography>
                    3 corresponds to Age Group Between 34 & 65
                  </Typography>
                  <Typography>
                    4 corresponds to Age Group 65 and above
                  </Typography> */}
                </Typography>
              </div>
              <CardContent>
                <Bubble
                  ref="chart"
                  height="500px"
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      yAxes: [
                        {
                          barPercentage: 1.6,
                          type: "category",
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
                          // type: "category",
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
                  data={this.state.bubbleChart}
                />
              </CardContent>
            </Card>
          </Grid>
          {/* <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Date</StyledTableCell>
                    <StyledTableCell align="right">Service</StyledTableCell>
                    <StyledTableCell align="right">Speciality</StyledTableCell>
                    <StyledTableCell align="right">MR number</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.calories}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.carbs}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.protein}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid> */}
        </Grid>

        <Popup
          open={
            this.props.doc_id === null || this.props.selectedYear === null
              ? true
              : false
          }
          closeOnDocumentClick={false}
          // onClose={this.closeModal}
          modal
        >
          <div
            style={{
              display: "flex",
              background: "white",
              padding: "2%",
              borderRadius: "10px",
            }}
          >
            <div>
              <WarningIcon style={{ color: "#FFCC00", fontSize: 60 }} />
            </div>
            <div
              style={{ display: "flex", alignItems: "center", margin: "auto" }}
            >
              <span style={{ fontSize: 30 }}>
                Select a desired year and doctor's ID
              </span>
            </div>
          </div>
        </Popup>
      </div>
    );
  }
}
