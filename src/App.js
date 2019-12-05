import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import Navbar from "./Components/Navbar/Navbar";
import Drawer from "./Components/Drawer/Drawer";
import DoctorChart from "./Components/Charts/doctorsChart";
import HospitalChart from "./Components/Charts/hospitalChart";
import LaboratoryChart from "./Components/Charts/laboratoryChart";
import PharmacyChart from "./Components/Charts/pharmacyChart";
import axios from "axios";
function App() {
  useEffect(() => {
    axios
      .get("http://localhost:4000/ChartsData")
      .then(res => console.log(res.data));
  });
  return (
    <Router>
      <Drawer>
        <Route path="/doctorChart" exact>
          <DoctorChart data="test" />
        </Route>
        <Route path="/hospitalChart" exact component={HospitalChart} />
        <Route path="/" exact component={HospitalChart} />
        <Route path="/laboratotyChart" exact component={LaboratoryChart} />
        <Route path="/pharmacyChart" exact component={PharmacyChart} />
      </Drawer>
    </Router>
  );
}

export default App;
