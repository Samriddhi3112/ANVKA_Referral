import React from "react";
import { BsDownload } from "react-icons/bs";
import DateRangePicker from "../../../shared/components/DateRangePicker";

const Filters = ({ startDate, endDate, setStartDate, setEndDate, onReset }) => {
  return (
    <div className="filter">
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        onReset={onReset}
      />
      <div className="form-group">
        <button className="downloadBtn">
          <BsDownload /> Download Report
        </button>
      </div>
    </div>
  );
};

export default Filters;
