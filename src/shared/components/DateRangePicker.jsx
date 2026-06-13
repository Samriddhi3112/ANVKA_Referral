import React from "react";
import { IoRefresh } from "react-icons/io5";

const DateRangePicker = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  onReset,
}) => {
  return (
    <div className="filter d-flex align-items-end gap-2">
      <div className="form-group">
        <label>Start Date</label>
        <input
          type="date"
          className="form-control"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>End Date</label>
        <input
          type="date"
          className="form-control"
          value={endDate}
          min={startDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <div
        onClick={onReset}
        title="Reset Filters"
        style={{
          width: "42px",
          height: "42px",
          border: "1px solid rgba(229, 231, 235, 1)",
          borderRadius: "8px",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          marginBottom: "1px",
        }}
      >
        <IoRefresh
          style={{
            color: "#ff7a00",
            fontSize: "20px",
          }}
        />
      </div>
    </div>
  );
};

export default DateRangePicker;