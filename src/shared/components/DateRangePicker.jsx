import React from "react";

const DateRangePicker = () => {
  return (
    <div className="filter">
      <div className="form-group">
        <label>Start Date</label>
        <input type="date" className="form-control" />
      </div>
      <div className="form-group">
        <label>End Date</label>
        <input type="date" className="form-control" />
      </div>
    </div>
  );
};

export default DateRangePicker;
