import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import toast from "react-hot-toast";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useLeadsStore } from "../store/leads.store";

// ─── Pagination ────────────────────────────────────────────────────────────
const Pagination = ({ currentPage, total, limit, onPageChange }) => {
  const totalPages = Math.ceil(total / limit);
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const half = 2;
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + 4);
    if (end - start < 4) start = Math.max(1, end - 4);
    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <div className="Paginations">
      <label>&nbsp;</label>
      <ul>
        {getPageNumbers().map((page) => (
          <li key={page}>
            <button
              className={currentPage === page ? "active" : ""}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
      <button
        className="nextBtn"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next <MdKeyboardArrowRight />
      </button>
    </div>
  );
};

// ─── Status Badge ──────────────────────────────────────────────────────────
const STATUS_STYLES = {
  invited: { bg: "#FEF4EB", color: "#D97B3A" },
  registered: { bg: "#E8F3FF", color: "#2D7DD2" },
  profile_completed: { bg: "#EAF7EE", color: "#3CA55C" },
  converted: { bg: "#EAF7EE", color: "#2E9E5B" },
  default: { bg: "#F1F1F4", color: "#6B6B6B" },
};

const StatusBadge = ({ status }) => {
  const s = STATUS_STYLES[status] || STATUS_STYLES.default;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "4px 12px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "600",
        background: s.bg,
        color: s.color,
        textTransform: "capitalize",
        whiteSpace: "nowrap",
      }}
    >
      {status ? status.replace(/_/g, " ") : "—"}
    </span>
  );
};

// ─── Add Lead Modal ─────────────────────────────────────────────────────────
const initialForm = {
  fullName: "",
  phone: "",
  countryCode: "+91",
  email: "",
};

const AddLeadModal = ({ show, onClose, onSuccess }) => {
  const { createLead, loading } = useLeadsStore();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handlePhoneChange = (value, data) => {
    const dialCode = data.dialCode || "";
    const phoneOnly = value.slice(dialCode.length); // strip dial code prefix

    setForm((prev) => ({
      ...prev,
      phone: phoneOnly,
      countryCode: `+${dialCode}`,
    }));

    if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = "Full name is required.";
    if (!form.phone.trim()) errs.phone = "Phone number is required.";
    else if (form.phone.trim().length < 6)
      errs.phone = "Enter a valid phone number.";
    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      errs.email = "Enter a valid email.";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    try {
      await createLead({
        fullName: form.fullName.trim(),
        countryCode: form.countryCode,
        phone: form.phone.trim(),
        email: form.email.trim(),
      });

      toast.success("Lead added successfully.");
      setForm(initialForm);
      setErrors({});
      onSuccess();
    } catch (err) {
      const message =
        err?.message || err?.response?.data?.message || "Failed to add lead.";
      toast.error(message);
    }
  };

  const handleClose = () => {
    setForm(initialForm);
    setErrors({});
    onClose();
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      dialogClassName="addLeadModal"
    >
      <Modal.Body>
        <div className="commonForm p-2">
          <h4 className="Title mb-3">Add Lead</h4>

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="form-group">
              <h6>
                Full Name <sup style={{ color: "#fc3636" }}>*</sup>
              </h6>
              <input
                type="text"
                name="fullName"
                className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
                value={form.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
              />
              {errors.fullName && (
                <div
                  style={{
                    fontSize: "13px",
                    color: "#dc3545",
                    marginTop: "4px",
                  }}
                >
                  {errors.fullName}
                </div>
              )}
            </div>

            {/* Phone */}
            <div className="form-group">
              <h6>
                Phone Number <sup style={{ color: "#fc3636" }}>*</sup>
              </h6>
              <PhoneInput
                country="in"
                value={form.countryCode.replace("+", "") + form.phone}
                onChange={handlePhoneChange}
                enableSearch
                countryCodeEditable={false}
                inputClass={`form-control${errors.phone ? " is-invalid" : ""}`}
                containerClass="phone-input-container"
                containerStyle={{ width: "100%" }}
                placeholder="Enter phone number"
              />
              {errors.phone && (
                <div
                  style={{
                    fontSize: "13px",
                    color: "#dc3545",
                    marginTop: "4px",
                  }}
                >
                  {errors.phone}
                </div>
              )}
            </div>

            {/* Email */}
            <div className="form-group">
              <h6>
                Email <sup style={{ color: "#fc3636" }}>*</sup>
              </h6>
              <input
                type="email"
                name="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                value={form.email}
                onChange={handleChange}
                placeholder="Enter email address"
              />
              {errors.email && (
                <div
                  style={{
                    fontSize: "13px",
                    color: "#dc3545",
                    marginTop: "4px",
                  }}
                >
                  {errors.email}
                </div>
              )}
            </div>

            <div className="d-flex gap-2 mt-3">
              <button
                type="button"
                className="btn-transparent w-100"
                onClick={handleClose}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-colored w-100"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

// ─── Main Listing Component ────────────────────────────────────────────────
const LeadsListing = () => {
  const navigate = useNavigate();
  const { leads, leadsMeta, loading, getLeads } = useLeadsStore();
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    getLeads({ page: 1 });
  }, []);

  const handlePageChange = (page) => {
    getLeads({ page });
  };

  const handleAddSuccess = () => {
    setShowAddModal(false);
    getLeads({ page: 1 });
  };

  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <div className="TitleBox">
            <h4 className="Title">Leads Management</h4>

            <button
              className="downloadBtn"
              onClick={() => setShowAddModal(true)}
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <FiPlus />
              Add Lead
            </button>
          </div>

          <div className="lastTransactions">
            {loading ? (
              <p className="text-center py-3">Loading...</p>
            ) : leads?.length > 0 ? (
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Referral Code</th>
                      <th>Status</th>
                      <th>Created At</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => (
                      <tr key={lead.id}>
                        <td>{lead.fullName}</td>
                        <td>
                          {lead.countryCode} {lead.phone}
                        </td>
                        <td>{lead.email}</td>
                        <td>{lead.referralCode}</td>
                        <td>
                          <StatusBadge status={lead.status} />
                        </td>
                        <td>
                          {lead.createdAt
                            ? new Date(lead.createdAt).toLocaleDateString(
                                "en-IN",
                              )
                            : "—"}
                        </td>
                        <td>
                          <button
                            className="filterBtn"
                            onClick={() => navigate(`/leads/${lead.id}`)}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                            }}
                          >
                            View <MdKeyboardArrowRight />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center py-3">No leads found.</p>
            )}
          </div>

          <Pagination
            currentPage={leadsMeta.page}
            total={leadsMeta.total}
            limit={leadsMeta.limit}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      <AddLeadModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={handleAddSuccess}
      />
    </>
  );
};

export default LeadsListing;
