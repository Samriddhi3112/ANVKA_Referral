import React from "react";
import PageHeader from "../components/PageHeader";
import PatientGrid from "../components/PatientGrid";

const RegisteredPatientPage = () => {
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <PageHeader />
        <PatientGrid />
      </div>
    </div>
  );
};

export default RegisteredPatientPage;
