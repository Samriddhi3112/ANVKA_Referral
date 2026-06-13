import React from "react";
import PatientCard from "./PatientCard";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useRegisteredPatientStore } from "../store/registeredPatient.store";

const PatientGrid = ({ page, setPage }) => {
  const { patients, total, limit } = useRegisteredPatientStore();
  const totalPages = Math.ceil(total / limit);

  return (
    <div
      className="patientGridWrapper"
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "65vh",
      }}
    >
      {patients?.length > 0 ? (
        <div className="row gy-4">
          {patients.map((patient) => (
            <div className="col-lg-4" key={patient._id}>
              <PatientCard patient={patient} />
            </div>
          ))}
        </div>
      ) : (
        <div className="col-12">
          <div
            style={{
              textAlign: "center",
              padding: "50px 20px",
              background: "#fff",
              borderRadius: "12px",
              border: "1px dashed #d9d9d9",
            }}
          >
            <h5>No Registered Patients Found</h5>

            <p style={{ color: "#777", marginBottom: 0 }}>
              There are currently no registered patients available for the
              selected date range.
            </p>
          </div>
        </div>
      )}

      {totalPages > 1 && (
        <div className="Paginations" style={{ marginTop: "auto" }}>
          <button
            className="nextBtn"
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            <MdKeyboardArrowLeft /> Prev
          </button>

          <ul>
            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((pageNo) => (
              <li key={pageNo}>
                <a
                  className={page === pageNo ? "active" : ""}
                  onClick={() => setPage(pageNo)}
                  style={{ cursor: "pointer" }}
                >
                  {pageNo}
                </a>
              </li>
            ))}
          </ul>

          <button
            className="nextBtn"
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next <MdKeyboardArrowRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default PatientGrid;