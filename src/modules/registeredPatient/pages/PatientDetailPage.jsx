import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BsDownload, BsFileEarmarkPdf } from "react-icons/bs";
import { IoCheckmarkCircle } from "react-icons/io5";
import { useRegisteredPatientStore } from "../store/registeredPatient.store";

// ─── Helper ───────────────────────────────────────────────────────────────────
const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

const val = (v) => v || "—";

// ─── Section Card ─────────────────────────────────────────────────────────────
const SectionCard = ({ title, children }) => (
  <div
    style={{
      background: "#fff",
      borderRadius: "12px",
      border: "1px solid #f1f1f4",
      padding: "24px",
      marginBottom: "16px",
    }}
  >
    <h5
      style={{
        fontSize: "15px",
        fontWeight: "700",
        color: "#111827",
        marginBottom: "20px",
      }}
    >
      {title}
    </h5>
    {children}
  </div>
);

// ─── Detail Row ───────────────────────────────────────────────────────────────
const DetailGrid = ({ fields }) => (
  <div className="row gy-3">
    {fields.map(({ label, value }) => (
      <div className="col-6" key={label}>
        <p
          style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "4px" }}
        >
          {label}
        </p>
        <p
          style={{
            fontSize: "14px",
            fontWeight: "500",
            color: "#111827",
            margin: 0,
            textTransform: "capitalize",
          }}
        >
          {value}
        </p>
      </div>
    ))}
  </div>
);

// ─── Yes/No Badge ─────────────────────────────────────────────────────────────
const YesNoBadge = ({ value }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      background: "#FEF4EB",
      color: "#F57C15",
      borderRadius: "20px",
      padding: "4px 12px",
      fontSize: "13px",
      fontWeight: "600",
    }}
  >
    <IoCheckmarkCircle size={16} />
    {value ? "Yes" : "No"}
  </span>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
const PatientDetailPage = () => {
  const { leadId } = useParams();
  const navigate = useNavigate();
  const { patientDetail, detailLoading, getPatientDetail, clearPatientDetail } =
    useRegisteredPatientStore();

  useEffect(() => {
    if (leadId) getPatientDetail(leadId);
    return () => clearPatientDetail();
  }, [leadId]);

  const basic = patientDetail?.basicDetails;
  const medical = patientDetail?.medicalAssessmentDetails;
  const health = patientDetail?.healthQuestionnaire;

  if (detailLoading) {
    return (
      <div className="WrapperArea">
        <div className="WrapperBox">
          <p className="text-center py-5">Loading...</p>
        </div>
      </div>
    );
  }

  if (!patientDetail) {
    return (
      <div className="WrapperArea">
        <div className="WrapperBox">
          <p className="text-center py-5">Patient not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">

        {/* ─── Patient Basic Details ─────────────────────────── */}
        <SectionCard title="Patient Basic Details">
          <DetailGrid
            fields={[
              { label: "UHID", value: val(basic?.uhid) },
              { label: "Patient Name", value: val(basic?.patientName) },
              { label: "Gender", value: val(basic?.gender) },
              { label: "Date of Birth", value: formatDate(basic?.dateOfBirth) },
              { label: "Mobile Number", value: val(basic?.mobileNumber) },
              { label: "Registration Date", value: formatDate(basic?.registrationDate) },
              { label: "Address", value: val(basic?.address) },
              { label: "Relationship with Patient", value: val(basic?.relationshipWithPatient) },
              { label: "Current Status", value: val(basic?.currentStatus) },
              { label: "Language", value: val(basic?.language) },
            ]}
          />
        </SectionCard>

        {/* ─── Medical Assessment Details ───────────────────── */}
        <SectionCard title="Medical Assessment Details">
          <DetailGrid
            fields={[
              { label: "Height", value: medical?.height ? `${medical.height} cm` : "—" },
              { label: "Weight", value: medical?.weight ? `${medical.weight} kg` : "—" },
              { label: "BMI", value: medical?.bmi ?? "—" },
              { label: "Symptoms", value: val(medical?.symptoms) },
            ]}
          />

          {/* Medical Condition Notes */}
          {medical?.medicalConditionNotes && (
            <div style={{ marginTop: "16px" }}>
              <p style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "6px" }}>
                Medical Condition Notes
              </p>
              <div
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "12px 16px",
                  fontSize: "14px",
                  color: "#374151",
                  background: "#fafafa",
                }}
              >
                {medical.medicalConditionNotes}
              </div>
            </div>
          )}

          {/* Uploaded Documents */}
          {medical?.uploadedDocuments?.length > 0 && (
            <div style={{ marginTop: "20px" }}>
              <p style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "10px" }}>
                Uploaded Documents
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {medical.uploadedDocuments.map((doc, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 16px",
                      border: "1px solid #e5e7eb",
                      borderRadius: "10px",
                      background: "#fff",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div
                        style={{
                          width: "36px",
                          height: "36px",
                          background: "#FEF4EB",
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <BsFileEarmarkPdf style={{ color: "#F57C15", fontSize: "18px" }} />
                      </div>
                      <span style={{ fontSize: "14px", color: "#111827", fontWeight: "500" }}>
                        {doc.fileName}
                      </span>
                    </div>
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      style={{ color: "#F57C15" }}
                    >
                      <BsDownload size={18} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </SectionCard>

        {/* ─── Health Questionnaire ─────────────────────────── */}
        <SectionCard title="Health Questionnaire">
          <div className="row gy-4">
            {[
              {
                label: "Are you currently on any medications?",
                value: health?.currentlyOnMedications,
              },
              {
                label: "Do you have any pre-existing medical conditions?",
                value: health?.preExistingMedicalConditions,
              },
              {
                label: "Have you undergone any major surgeries?",
                value: health?.undergoneMajorSurgeries,
              },
              {
                label: "Do you have a family history of any chronic diseases?",
                value: health?.familyHistoryChronicDiseases,
              },
            ].map(({ label, value }) => (
              <div className="col-6" key={label}>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#374151",
                    fontWeight: "500",
                    marginBottom: "8px",
                  }}
                >
                  {label}
                  <sup style={{ color: "#F57C15" }}>*</sup>
                </p>
                <YesNoBadge value={value} />
              </div>
            ))}
          </div>
        </SectionCard>

      </div>
    </div>
  );
};

export default PatientDetailPage;