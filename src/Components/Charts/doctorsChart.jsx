import React, { Component } from "react";
import { Line, Bar, Bubble } from "react-chartjs-2";
import { Grid, Typography, ButtonGroup } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import Card from "@material-ui/core/Card";
import { makeStyles, withStyles } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import TableRow from "@material-ui/core/TableRow";
import Popup from "reactjs-popup";
import "./popUp.css";
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const classes = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default class doctorsChart extends Component {
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
      GenderChart: {
        labels: ["Self", "Relatives"],
        datasets: [
          {
            label: "Total Spendings",
            data: [2300, 3000],
            backgroundColor: ["#1f8ef1", "#d048b6"],
            pointStyle: "cross",
          },
        ],
      },
      bubbleChart: {
        labels: ["Scatter"],
        yLabels: ["Mon", "Tue", "wed", "Thu", "Fri", "SAT", "SUN"],
        xLabels: [
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
            label: "My First dataset",
            fill: false,
            backgroundColor: "rgba(75,192,192,0.4)",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 10,
            pointHitRadius: 10,
            data: [
              { x: 0, y: 75, r: 10 },
              { x: 1, y: 49, r: 10 },
              { x: 2, y: 90, r: 150 },
              { x: 3, y: 29, r: 30 },
              { x: 4, y: 36, r: 10 },
              { x: 5, y: 25, r: 50 },
              { x: 6, y: 18, r: 16 },
            ],
          },
        ],
      },
      departmentalExpensesChart: {
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
    this.openPopUp_more = this.openPopUp_more.bind(this);
    this.closePopUp_more = this.closePopUp_more.bind(this);
  }
  updateAndNotify = () => {
    console.log(this.props.selectedYear);
  };

  // check if props have changed or not
  // componentDidUpdate has previous props as a parameter
  componentDidUpdate(prevProps) {
    if (prevProps.selectedYear !== this.props.selectedYear) {
      this.updateAndNotify();
    }
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
                <div>
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
                            suggestedMin: 60,
                            suggestedMax: 125,
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
          <Grid item xs={6}>
            <Card style={{ height: "320px" }}>
              <div style={myStyles}>
                <Typography variant="h6">Services Frequency</Typography>
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
          <Grid item xs={6}>
            <Card style={{ height: "320px" }}>
              <div style={myStyles}>
                <Typography variant="h6">Patients by age / gender</Typography>
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
          <Grid item xs={12}>
            <Card style={{ height: "auto" }}>
              <div style={myStyles}>
                <Typography variant="h6">Bubble</Typography>
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
                          type: "category",
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
                  data={this.getBubbleChartData}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
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
                data={this.getChartData}
              />
            </CardContent>
          </Card>
        </Popup>
      </div>
    );
  }
}
