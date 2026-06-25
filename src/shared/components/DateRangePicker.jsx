import React, { useRef } from "react";
import { IoRefresh } from "react-icons/io5";
import { BsCalendar3 } from "react-icons/bs";
import { LuRefreshCw } from "react-icons/lu";

const DateRangePicker = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  onReset,
}) => {
  const startRef = useRef(null);
  const endRef = useRef(null);

  const openPicker = (ref) => {
    if (ref.current?.showPicker) {
      ref.current.showPicker();
    } else {
      ref.current?.focus();
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="filter d-flex align-items-center gap-2">
      {/* Start Date */}
      <div
        className="dateBox"
        onClick={() => openPicker(startRef)}
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          height: "42px",
          padding: "0 14px",
          border: "1px solid rgba(229, 231, 235, 1)",
          borderRadius: "8px",
          background: "#fff",
          cursor: "pointer",
          flex: "1",
          minWidth: "180px",
        }}
      >
        <BsCalendar3
          style={{ color: "#ff7a00", fontSize: "16px", flexShrink: 0 }}
        />

        <span
          style={{
            fontSize: "14px",
            color: startDate ? "#111827" : "#9CA3AF",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {startDate ? formatDate(startDate) : "Start Date"}
        </span>

        <input
          ref={startRef}
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: 0,
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        />
      </div>

      {/* End Date */}
      <div
        className="dateBox"
        onClick={() => openPicker(endRef)}
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          height: "42px",
          padding: "0 14px",
          border: "1px solid rgba(229, 231, 235, 1)",
          borderRadius: "8px",
          background: "#fff",
          cursor: "pointer",
          flex: "1",
          minWidth: "180px",
        }}
      >
        <BsCalendar3
          style={{ color: "#ff7a00", fontSize: "16px", flexShrink: 0 }}
        />

        <span
          style={{
            fontSize: "14px",
            color: endDate ? "#111827" : "#9CA3AF",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {endDate ? formatDate(endDate) : "End Date"}
        </span>

        <input
          ref={endRef}
          type="date"
          value={endDate}
          min={startDate}
          onChange={(e) => setEndDate(e.target.value)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: 0,
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        />
      </div>

      {/* Reset Button */}
      <div className="form-group" style={{margin:"0px"}}>
        <button className="refreshBtn" onClick={onReset} title="Reset filters">
          <LuRefreshCw />
        </button>
      </div>
    </div>
  );
};

export default DateRangePicker;
