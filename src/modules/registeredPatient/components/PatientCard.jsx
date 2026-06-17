import React from "react";
import { useNavigate } from "react-router-dom";

const PatientCard = ({ patient }) => {
  const navigate = useNavigate();

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const initials = patient?.fullName
    ? patient.fullName.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : "?";

  return (
    <div className="recentRegisBox">
      <div className="top">
        {patient?.profileImage ? (
          <figure
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              overflow: "hidden",
              flexShrink: 0,
              margin: 0,
            }}
          >
            <img
              src={patient.profileImage}
              alt={patient.fullName}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </figure>
        ) : (
          <figure
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              background: "#FEF4EB",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              fontSize: "18px",
              fontWeight: "700",
              color: "#F57C15",
              margin: 0,
            }}
          >
            {initials}
          </figure>
        )}

        <figcaption>
          <h6>{patient?.uhid || "—"}</h6>
          <h5>{patient?.fullName || "—"}</h5>
          <p>{patient?.phone || "—"}</p>

          <ul>
            <li style={{ textTransform: "capitalize" }}>
              {patient?.gender || "—"}
            </li>
            <li>{formatDate(patient?.dateOfBirth)}</li>
          </ul>

          <h4>Registration Date: {formatDate(patient?.registrationDate)}</h4>
        </figcaption>
      </div>

      <button onClick={() => navigate(`/registered-patients/${patient?.leadId}`)}>
        View Details
      </button>
    </div>
  );
};

export default PatientCard;