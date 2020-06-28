import React, { useEffect, useState } from "react";
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
  const [doctorIDs, setDoctorIDs] = useState([]);
  const [patientIDs, setPatientIDs] = useState([]);
  const [date, setDate] = useState([]);

  useEffect(() => {
    async function getData() {
      const res_patient_ids = await axios.get(
        "http://localhost:5000/patients_ids"
      );
      const res_doc_ids = await axios.get("http://localhost:5000/doctors_ids");

      const res_yearDates = await axios.get("http://localhost:5000/dateyears");
      setDoctorIDs(res_doc_ids.data);
      setPatientIDs(res_patient_ids.data);
      setDate(res_yearDates.data);
    }
    getData();
  }, []);
  return (
    <Router>
      <Drawer patientIDs={patientIDs} doctorIDs={doctorIDs} yearDates={date} />
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
