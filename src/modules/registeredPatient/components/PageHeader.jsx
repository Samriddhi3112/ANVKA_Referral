import React, { useRef } from "react";
import { BsDownload, BsCalendar3 } from "react-icons/bs";
import { IoRefresh } from "react-icons/io5";

const PageHeader = ({ startDate, endDate, setStartDate, setEndDate }) => {
  const startRef = useRef(null);
  const endRef = useRef(null);

  const handleResetFilters = () => {
    setStartDate("");
    setEndDate("");
  };

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
    <div className="TitleBox">
      <h4 className="Title">Recent Registration</h4>

      <div
        className="filter"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
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
          <BsCalendar3 style={{ color: "#ff7a00", fontSize: "16px", flexShrink: 0 }} />

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
          <BsCalendar3 style={{ color: "#ff7a00", fontSize: "16px", flexShrink: 0 }} />

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
            flexShrink: 0,
          }}
        >
          <IoRefresh
            style={{
              color: "#ff7a00",
              fontSize: "20px",
            }}
          />
        </div>

        {/* Download Button */}
        <button
          className="downloadBtn"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            height: "42px",
            padding: "0 18px",
            border: "1px solid rgba(229, 231, 235, 1)",
            borderRadius: "8px",
            background: "#fff",
            color: "#374151",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          <BsDownload style={{ fontSize: "14px" }} />
          Download Report
        </button>
      </div>
    </div>
  );
};

export default PageHeader;