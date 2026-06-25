import React, { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { BsDownload } from "react-icons/bs";
import { LuRefreshCw } from "react-icons/lu";
import { FiCalendar } from "react-icons/fi";
import { useProfileCompletionStore } from "../store/profileCompletion.store";
import ProfileCompletionModal from "./profileCompletionModal";

const ProfileCompletion = () => {
  const {
    patients,
    patientsMeta,
    loading,
    error,
    getCompletedPatients,
    getCompletedPatientDetail,
    clearPatientDetail,
  } = useProfileCompletionStore();

  const { total, page, limit } = patientsMeta;

  const [modalOpen, setModalOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  useEffect(() => {
    if ((startDate && endDate) || (!startDate && !endDate)) {
      getCompletedPatients({ startDate, endDate, page, limit });
    }
  }, [startDate, endDate, page]);

  const handleCardClick = async (leadId) => {
    setModalOpen(true);
    await getCompletedPatientDetail(leadId);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    clearPatientDetail();
  };

  const handlePageChange = (p) => {
    getCompletedPatients({ startDate, endDate, page: p, limit });
  };

  const handleRefresh = () => {
    setStartDate("");
    setEndDate("");
    getCompletedPatients({ startDate: "", endDate: "", page: 1, limit });
  };

  // ── Pagination ────────────────────────────────────────────────────────
  const totalPages = Math.ceil(total / limit) || 1;

  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          {/* ── Title + Filters ── */}
          <div className="TitleBox">
            <h4 className="Title">Latest Profile Completion</h4>
            <div className="filter">
              {/* Start Date */}
              <div className="form-group">
                <div
                  className="dateInputBox"
                  onClick={() => startDateRef.current.showPicker()}
                >
                  <FiCalendar className="calendarIcon" />
                  <input
                    ref={startDateRef}
                    type="date"
                    className="form-control hiddenDateInput"
                    value={startDate}
                    max={endDate || undefined}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <span className="datePlaceholder">
                    {startDate ? startDate : "Start Date"}
                  </span>
                </div>
              </div>

              {/* End Date */}
              <div className="form-group">
                <div
                  className="dateInputBox"
                  onClick={() => endDateRef.current.showPicker()}
                >
                  <FiCalendar className="calendarIcon" />
                  <input
                    ref={endDateRef}
                    type="date"
                    className="form-control hiddenDateInput"
                    value={endDate}
                    min={startDate || undefined}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                  <span className="datePlaceholder">
                    {endDate ? endDate : "End Date"}
                  </span>
                </div>
              </div>

              {/* Refresh */}
              <div className="form-group">
                <button
                  className="refreshBtn"
                  onClick={handleRefresh}
                  title="Reset filters"
                >
                  <LuRefreshCw />
                </button>
              </div>

              {/* Download Report */}
              <div className="form-group">
                <button className="downloadBtn">
                  <BsDownload /> Download Report
                </button>
              </div>
            </div>
          </div>

          {/* ── List ── */}
          {loading && <p className="text-center py-4">Loading...</p>}
          {error && <p className="text-center text-danger py-4">{error}</p>}

          {!loading && !error && (
            <div className="row gy-4">
              {patients.length === 0 ? (
                <p className="text-center py-4">No patients found.</p>
              ) : (
                patients.map((patient) => (
                  <div className="col-lg-4" key={patient.leadId}>
                    <div
                      className="latestReferralBox"
                      onClick={() => handleCardClick(patient.leadId)}
                    >
                      <div className="left">
                        <figure>
                          <img
                            src={patient.profileImage}
                            alt={patient.fullName}
                            onError={(e) => {
                              e.target.src = "/fallback-avatar.png";
                            }}
                          />
                        </figure>
                        <figcaption>
                          <p>{patient.uhid}</p>
                          <h4>{patient.fullName}</h4>
                        </figcaption>
                      </div>
                      <span className="arrowIcon">
                        <MdKeyboardArrowRight />
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <div className="Paginations">
              <label>&nbsp;</label>
              <ul>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <li key={p}>
                      <a
                        href="javascript:void(0);"
                        className={page === p ? "active" : ""}
                        onClick={() => handlePageChange(p)}
                      >
                        {p}
                      </a>
                    </li>
                  ),
                )}
              </ul>
              {page < totalPages && (
                <button
                  className="nextBtn"
                  onClick={() => handlePageChange(page + 1)}
                >
                  Next <MdKeyboardArrowRight />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Detail Modal ── */}
      <ProfileCompletionModal show={modalOpen} onHide={handleModalClose} />
    </>
  );
};

export default ProfileCompletion;
