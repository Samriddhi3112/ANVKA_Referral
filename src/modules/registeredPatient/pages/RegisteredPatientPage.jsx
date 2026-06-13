import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import PatientGrid from "../components/PatientGrid";
import { useRegisteredPatientStore } from "../store/registeredPatient.store";

const RegisteredPatientPage = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);

  const { getRegisteredPatients } = useRegisteredPatientStore();

  useEffect(() => {
    getRegisteredPatients({
      startDate,
      endDate,
      page,
      limit: 20,
    });
  }, [startDate, endDate, page, getRegisteredPatients]);

  const handleResetFilters = () => {
    setStartDate("");
    setEndDate("");
    setPage(1);
  };

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <PageHeader
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          onReset={handleResetFilters}
        />

        <PatientGrid
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default RegisteredPatientPage;