import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import Navbar from "./Components/Navbar/Navbar";
import Drawer from "./Components/Drawer/Drawer";
import DoctorChart from "./Components/Charts/doctorsChart";
import HospitalChart from "./Components/Charts/hospitalChart";
import LaboratoryChart from "./Components/Charts/laboratoryChart";
import PharmacyChart from "./Components/Charts/pharmacyChart";
import PatientChart from "./Components/Charts/patientChart";
import axios from "axios";
function App() {
  const [data, setData] = useState(0);
  useEffect(() => {
    async function getData() {
      const res = await axios.get("http://localhost:4000/ChartsData");
      setData(res.data);
      console.log(res.data);
    }

    getData();
  }, []);
  return (
    <Router>
      <Drawer>
        {/* <Route path="/doctorChart" exact>
          <DoctorChart data={data} />
        </Route>
        <Route path="/hospitalChart" exact component={HospitalChart} />
        <Route path="/" exact component={HospitalChart} />
        <Route path="/laboratotyChart" exact component={LaboratoryChart} />
        <Route path="/pharmacyChart" exact component={PharmacyChart} /> */}
        <PatientChart />
      </Drawer>
    </Router>
  );
}

export default App;
