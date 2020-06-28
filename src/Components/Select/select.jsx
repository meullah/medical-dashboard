import React from "react";
import Select from "react-select";
import "../../index.css";
const options = [
  { value: "2016", label: "2016" },
  { value: "2017", label: "2017" },
  { value: "2018", label: "2018" },
  { value: "2019", label: "2019" },
  { value: "2020", label: "2020" },
  { value: "2021", label: "2021" },
];

export default function SimpleSelect() {
  return (
    <div style={{ width: "150px" }}>
      <Select options={options} />
    </div>
  );
}
