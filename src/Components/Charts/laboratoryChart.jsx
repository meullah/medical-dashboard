import React from "react";
import Grid from "@material-ui/core/Grid";
import { Line } from "react-chartjs-2";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const chartColor = "#FFFFFF";
const data = canvas => {
  var ctx = canvas.getContext("2d");
  var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
  gradientStroke.addColorStop(0, "#80b6f4");
  gradientStroke.addColorStop(1, chartColor);
  var gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
  gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
  gradientFill.addColorStop(1, "rgba(249, 99, 59, 0.40)");
  return {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    datasets: [
      {
        label: "Active Users",
        borderColor: "#f96332",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#f96332",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 4,
        fill: true,
        backgroundColor: gradientFill,
        borderWidth: 2,
        data: [542, 480, 430, 550, 530, 453, 380, 434, 568, 610, 700, 630]
      }
    ]
  };
};
const options = {
  maintainAspectRatio: false,
  legend: {
    display: true
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
  responsive: 1,
  scales: {
    yAxes: [
      {
        display: 1,
        ticks: {
          display: true
        },
        gridLines: {
          zeroLineColor: "transparent",
          drawTicks: 1,
          display: 1,
          drawBorder: 1
        }
      }
    ],
    xAxes: [
      {
        display: 1,
        ticks: {
          display: 1
        },
        gridLines: {
          zeroLineColor: "transparent",
          drawTicks: 1,
          display: 1,
          drawBorder: 1
        }
      }
    ]
  },
  layout: {
    padding: { left: 0, right: 0, top: 15, bottom: 15 }
  }
};

export default class LaboratoryChart extends React.Component {
  render() {
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Line data={data} options={options} height="220px" />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}
