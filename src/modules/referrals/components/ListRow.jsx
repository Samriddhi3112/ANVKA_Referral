import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

const STATUS_STYLES = {
  ongoing: { bg: "#E8F3FF", color: "#2D7DD2" },
  completed: { bg: "#EAF7EE", color: "#3CA55C" },
  cancelled: { bg: "#FEE2E2", color: "#DC2626" },
  pending: { bg: "#FEF4EB", color: "#D97B3A" },
  default: { bg: "#F1F1F4", color: "#6B6B6B" },
};

const ListRow = ({ data, onClick }) => {
  const s = STATUS_STYLES[data?.status] || STATUS_STYLES.default;

  const initials = data?.patientName
    ? data.patientName.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : "?";

  return (
    <div className="latestReferralBox" onClick={onClick}>
      <div className="left">
        {/* Initials Avatar */}
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "12px",
            background: "#FEF4EB",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            fontSize: "15px",
            fontWeight: "700",
            color: "#F57C15",
          }}
        >
          {initials}
        </div>

        <figcaption>
          <p>{data?.uhid || "—"}</p>
          <h4>{data?.patientName || "—"}</h4>
          <small style={{ color: "#8a8a8f", fontSize: "12px" }}>
            {data?.appointmentNumber || "—"}
          </small>
        </figcaption>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
        <span style={{
          padding: "3px 10px",
          borderRadius: "20px",
          fontSize: "11px",
          fontWeight: "600",
          background: s.bg,
          color: s.color,
          textTransform: "capitalize",
          whiteSpace: "nowrap",
        }}>
          {data?.status || "—"}
        </span>
        <MdKeyboardArrowRight />
      </div>
    </div>
  );
};

export default ListRow;