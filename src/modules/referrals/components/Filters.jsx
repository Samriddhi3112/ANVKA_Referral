import React from "react";
import DateRangePicker from "../../../shared/components/DateRangePicker";
import Button from "../../../shared/components/Button";
import { BsDownload } from "react-icons/bs";

const Filters = () => {
  return (
    <div className="filter">
      <DateRangePicker />
      <button className="downloadBtn">
        {" "}
        <BsDownload /> Download Report
      </button>
    </div>
    // <div className="form-group">
    //             <button className="downloadBtn">
    //               {" "}
    //               <BsDownload /> Download Report
    //             </button>
    //           </div>
  );
};

export default Filters;
