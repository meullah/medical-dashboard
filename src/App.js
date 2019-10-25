import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import Navbar from "./Components/Navbar/Navbar";
import Drawer from "./Components/Drawer/Drawer";
import DoctorChart from "./Components/Charts/doctorsChart";
import HospitalChart from "./Components/Charts/hospitalChart";
import LaboratoryChart from "./Components/Charts/laboratoryChart";
import PharmacyChart from "./Components/Charts/pharmacyChart";

function App() {
  return (
    <Router>
      <Drawer>
        <Route path="/doctorChart" exact component={DoctorChart} />
        <Route path="/hospitalChart" exact component={HospitalChart} />
        <Route path="/" exact component={HospitalChart} />
        <Route path="/laboratotyChart" exact component={LaboratoryChart} />
        <Route path="/pharmacyChart" exact component={PharmacyChart} />
      </Drawer>
    </Router>
  );
}

export default App;
