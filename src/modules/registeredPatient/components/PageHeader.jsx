import React from "react";
import { BsDownload } from "react-icons/bs";

const PageHeader = () => {
  return (
    <div className="TitleBox">
      <h4 className="Title">Recent Registration</h4>

      <div className="filter">
        <div className="form-group">
          <label>Start Date</label>
          <input type="date" className="form-control" />
        </div>

        <div className="form-group">
          <label>End Date</label>
          <input type="date" className="form-control" />
        </div>

        <div className="form-group">
          <button className="downloadBtn">
            <BsDownload /> Download Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
