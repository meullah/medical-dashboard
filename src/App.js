import React, { useEffect } from "react";
// import React from "react"
import { BrowserRouter as Router } from "react-router-dom";
// import Navbar from "./Components/Navbar/Navbar";
import Drawer from "./Components/Drawer/Drawer";
// import DoctorChart from "./Components/Charts/doctorsChart";
// import HospitalChart from "./Components/Charts/hospitalChart";
// import PatientChart from "./Components/Charts/patientChart";
// import LaboratoryChart from "./Components/Charts/laboratoryChart";
// import PharmacyChart from "./Components/Charts/pharmacyChart";
import axios from "axios";
function App() {
  // const [data, setData] = useState(0);
  useEffect(() => {
    async function getData() {
      const res = await axios.get("http://localhost:5000/hospitalData");
      // setData(res.data);
      console.log(res.data.ageChartData);
    }

    getData();
  }, []);
  return (
    <Router>
      <Drawer />
    </Router>

    // <Router>
    //   <Drawer>
    //     <Route path="/" exact component={HospitalChart} />
    //     <Route path="/hospitalChart" exact component={HospitalChart} />
    //     <Route path="/doctorChart" exact component={DoctorChart} />
    //     <Route path="/PatientChart" exact component={PatientChart} />
    //   </Drawer>
    // </Router>
  );
}

export default App;
