import React from "react";
import Modal from "react-bootstrap/Modal";
import { IoClose } from "react-icons/io5";
import { BsCalendar3, BsCircle, BsCurrencyDollar } from "react-icons/bs";
import consultProfile from "../../../assets/images/consultation-profile.png";

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const formatAmount = (amount, currency) => {
  if (amount == null) return "—";
  const symbol = currency?.toLowerCase() === "inr" ? "₹" : "$";
  return `${symbol} ${Number(amount).toFixed(2)}`;
};

const DetailsModal = ({ show, onClose, data }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Body style={{ padding: "24px" }}>

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "20px",
            color: "#6b7280",
            lineHeight: 1,
          }}
        >
          <IoClose />
        </button>

        {/* Patient Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "24px" }}>
          {/* <img
            src={consultProfile}
            alt="patient"
            style={{ width: "56px", height: "56px", borderRadius: "10px", objectFit: "cover" }}
          /> */}
          <div>
            <p style={{ fontSize: "12px", color: "#F57C15", fontWeight: "600", margin: 0 }}>
              {data?.uhid || "UHID"}
            </p>
            <h5 style={{ margin: 0, fontWeight: "700", fontSize: "18px", color: "#111827" }}>
              {data?.patientName || "—"}
            </h5>
          </div>
        </div>

        {/* Appointment Status Section */}
        <div style={{ marginBottom: "8px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h6 style={{ fontWeight: "700", fontSize: "15px", margin: 0, color: "#111827" }}>
              Appointment Status
            </h6>
            <span style={{ fontSize: "13px", color: "#F57C15", fontWeight: "600", textDecoration: "underline", cursor: "pointer" }}>
              {data?.appointmentNumber || ""}
            </span>
          </div>

          {/* Create Date */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f1f1f4" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#6b7280", fontSize: "14px" }}>
              <BsCalendar3 style={{ color: "#9ca3af", fontSize: "16px" }} />
              Create Date
            </div>
            <span style={{ fontWeight: "500", fontSize: "14px", color: "#111827" }}>
              {formatDate(data?.createDate)}
            </span>
          </div>

          {/* Status */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f1f1f4" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#6b7280", fontSize: "14px" }}>
              <BsCircle style={{ color: "#9ca3af", fontSize: "16px" }} />
              Status
            </div>
            <span style={{
              fontWeight: "600",
              fontSize: "14px",
              color: data?.status === "completed" ? "#3CA55C" : data?.status === "ongoing" ? "#3CA55C" : "#D97B3A",
              textTransform: "capitalize",
            }}>
              {data?.status || "—"}
            </span>
          </div>

          {/* Amount Paid */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#6b7280", fontSize: "14px" }}>
              <BsCurrencyDollar style={{ color: "#9ca3af", fontSize: "16px" }} />
              Amount Paid
            </div>
            <span style={{ fontWeight: "600", fontSize: "15px", color: "#111827" }}>
              {formatAmount(data?.amountPaid, data?.amountCurrency)}
            </span>
          </div>
        </div>

        {/* Divider */}
        <hr style={{ borderColor: "#e5e7eb", margin: "8px 0 16px" }} />

        {/* Doctor Information */}
        <h6 style={{ fontWeight: "700", fontSize: "15px", marginBottom: "14px", color: "#111827" }}>
          Doctor Information
        </h6>

        <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}>
          <span style={{ color: "#6b7280", fontSize: "14px" }}>Doctor Name</span>
          <span style={{ fontWeight: "500", fontSize: "14px", color: "#111827" }}>{data?.doctorName || "—"}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}>
          <span style={{ color: "#6b7280", fontSize: "14px" }}>Specialist</span>
          <span style={{ fontWeight: "500", fontSize: "14px", color: "#111827" }}>{data?.specialist || "—"}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}>
          <span style={{ color: "#6b7280", fontSize: "14px" }}>Hospital</span>
          <span style={{ fontWeight: "500", fontSize: "14px", color: "#111827" }}>{data?.hospital || "—"}</span>
        </div>

      </Modal.Body>
    </Modal>
  );
};

export default DetailsModal;