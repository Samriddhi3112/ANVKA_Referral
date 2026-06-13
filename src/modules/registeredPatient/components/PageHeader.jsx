import React from "react";
import { BsDownload } from "react-icons/bs";
import { IoRefresh } from "react-icons/io5";

const PageHeader = ({ startDate, endDate, setStartDate, setEndDate }) => {
  const handleResetFilters = () => {
    setStartDate("");
    setEndDate("");
  };
  return (
    <div className="TitleBox">
      <h4 className="Title">Recent Registration</h4>

      <div className="filter">
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
        <div className="form-group">
        <div
          onClick={handleResetFilters}
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

        <div className="form-group">
          <button className="downloadBtn">
            <BsDownload />
            Download Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
