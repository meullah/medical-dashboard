import React, { Component } from "react";
// import { Line } from "react-chartjs-2";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const myCardStyle = {
  height: "75px"
};
export default class doctorsChart extends Component {
  render() {
    return (
      <div
        style={{
          flexGrow: 1,
          position: "relative",
          marginLeft: "100px",
          marginTop: "40px",
          marginRight: "25px"
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Card style={myCardStyle}>
              <CardContent></CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card style={myCardStyle}>
              <CardContent></CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card style={myCardStyle}>
              <CardContent></CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card style={myCardStyle}>
              <CardContent></CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent></CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card>
              <CardContent></CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card>
              <CardContent></CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}
