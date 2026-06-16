import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MdContentCopy } from "react-icons/md";
import { useLeadsStore } from "../store/leads.store";

// ─── Status Badge (reused style) ───────────────────────────────────────────
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
        padding: "4px 14px",
        borderRadius: "20px",
        fontSize: "13px",
        fontWeight: "600",
        background: s.bg,
        color: s.color,
        textTransform: "capitalize",
      }}
    >
      {status ? status.replace(/_/g, " ") : "—"}
    </span>
  );
};

// ─── Detail Row ─────────────────────────────────────────────────────────────
const DetailRow = ({ label, value }) => (
  <div className="row mb-3">
    <div className="col-4 col-md-3">
      <p className="mb-0" style={{ color: "#8a8a8f", fontSize: "13px" }}>
        {label}
      </p>
    </div>
    <div className="col-8 col-md-9">
      <p className="mb-0" style={{ fontWeight: "500", fontSize: "14px", wordBreak: "break-word" }}>
        {value || "—"}
      </p>
    </div>
  </div>
);

// ─── Main Component ─────────────────────────────────────────────────────────
const LeadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { leadDetail, loading, getLeadDetail, clearLeadDetail } = useLeadsStore();

  useEffect(() => {
    if (id) getLeadDetail(id);
    return () => clearLeadDetail();
  }, [id]);

  const handleCopyLink = () => {
    if (leadDetail?.shareLink) {
      navigator.clipboard.writeText(leadDetail.shareLink);
      toast.success("Referral link copied.");
    }
  };

  return (
    <>

      <div className="WrapperArea">
        <div className="WrapperBox">
          <div className="TitleBox">
            <h4 className="Title">Lead Details</h4>

            <button className="downloadBtn" onClick={() => navigate(-1)}>
              Back to Leads
            </button>
          </div>

          {loading ? (
            <p className="text-center py-3">Loading...</p>
          ) : leadDetail ? (
            <div className="commonForm">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0">{leadDetail.fullName}</h5>
                <StatusBadge status={leadDetail.status} />
              </div>

              <DetailRow label="Full Name" value={leadDetail.fullName} />
              <DetailRow
                label="Phone"
                value={`${leadDetail.countryCode || ""} ${leadDetail.phone || ""}`}
              />
              <DetailRow label="Email" value={leadDetail.email} />
              <DetailRow label="Referral Code" value={leadDetail.referralCode} />

              <div className="row mb-3">
                <div className="col-4 col-md-3">
                  <p className="mb-0" style={{ color: "#8a8a8f", fontSize: "13px" }}>
                    Referral Link
                  </p>
                </div>
                <div className="col-8 col-md-9">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    <a
                      href={leadDetail.shareLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: "14px",
                        color: "#F57C15",
                        wordBreak: "break-all",
                        textDecoration: "underline",
                      }}
                    >
                      {leadDetail.shareLink}
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyLink}
                      title="Copy link"
                      style={{
                        width: "34px",
                        height: "34px",
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
                      <MdContentCopy style={{ color: "#ff7a00", fontSize: "16px" }} />
                    </button>
                  </div>
                </div>
              </div>

              <DetailRow
                label="Patient"
                value={leadDetail.patient ? leadDetail.patient.fullName || "Linked" : "Not linked yet"}
              />
              <DetailRow
                label="Registered At"
                value={
                  leadDetail.registeredAt
                    ? new Date(leadDetail.registeredAt).toLocaleString("en-IN")
                    : "—"
                }
              />
              <DetailRow
                label="Profile Completed At"
                value={
                  leadDetail.profileCompletedAt
                    ? new Date(leadDetail.profileCompletedAt).toLocaleString("en-IN")
                    : "—"
                }
              />
              {/* <DetailRow
                label="Converted At"
                value={
                  leadDetail.convertedAt
                    ? new Date(leadDetail.convertedAt).toLocaleString("en-IN")
                    : "—"
                }
              /> */}
              <DetailRow
                label="Created At"
                value={
                  leadDetail.createdAt
                    ? new Date(leadDetail.createdAt).toLocaleString("en-IN")
                    : "—"
                }
              />
            </div>
          ) : (
            <p className="text-center py-3">Lead not found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default LeadDetail;