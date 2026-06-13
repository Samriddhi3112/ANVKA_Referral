import { useEffect, useState } from "react";
import { useDashboardStore } from "./store/dashboard.store";

import dashboard1 from "../../assets/images/dashboard-icon-1.png";
import dashboard2 from "../../assets/images/dashboard-icon-2.png";
import dashboard3 from "../../assets/images/dashboard-icon-3.png";
import dashboard4 from "../../assets/images/dashboard-icon-4.png";
import dashboard5 from "../../assets/images/dashboard-icon-5.png";
import dashboard6 from "../../assets/images/dashboard-icon-6.png";
import { FaCalendarAlt } from "react-icons/fa";
import { IoRefresh } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { IoChevronDown } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const OverviewPage = () => {
  const { dashboard, getDashboard, loading } = useDashboardStore();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    // Initial load
    if (!startDate && !endDate) {
      getDashboard({});
      return;
    }

    // Both dates selected
    if (startDate && endDate) {
      getDashboard({
        startDate,
        endDate,
      });
    }
  }, [startDate, endDate]);

  const handleResetDates = () => {
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="TitleBox flex-column align-items-start">
          <h4
            className="Title"
            style={{ fontSize: "22px", marginBottom: "20px" }}
          >
            Welcome to ANVKA
          </h4>

          <p>
            <span className="first">
              <FaLocationDot />
            </span>
            Gurugram, Haryana
            <span className="last">
              <IoChevronDown />
            </span>
          </p>

          <div className="d-flex justify-content-between align-items-center w-100 flex-wrap gap-3">
            <h4 className="Title mb-0">Monthly Health Summary</h4>

            <div className="d-flex align-items-center gap-2">
              {/* Start Date */}
              <div className="datePickerBox">
                <FaCalendarAlt className="calendarIcon" />

                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  placeholderText="Start Date"
                  dateFormat="dd/MM/yyyy"
                />
              </div>

              {/* End Date */}
              <div className="datePickerBox">
                <FaCalendarAlt className="calendarIcon" />

                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  placeholderText="End Date"
                  dateFormat="dd/MM/yyyy"
                  minDate={startDate}
                />
              </div>
              <div
                onClick={handleResetDates}
                title="Reset Filters"
                style={{
                  width: "42px",
                  height: "42px",
                  border: "1px solid #000",
                  borderRadius: "8px",
                  background: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <IoRefresh
                  style={{
                    color: "#ff7a00",
                    fontSize: "20px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row gy-4">
          <div className="col-lg-4">
            <div className="dashboardBox one">
              <span>
                <img src={dashboard1} alt="img" />
              </span>

              <h2>{loading ? "..." : (dashboard?.registeredPatients ?? 0)}</h2>

              <p>Registered Patients</p>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="dashboardBox two">
              <span>
                <img src={dashboard6} alt="img" />
              </span>

              <h2>{loading ? "..." : (dashboard?.profileCompletion ?? 0)}</h2>

              <p>Profile Completion</p>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="dashboardBox three">
              <span>
                <img src={dashboard2} alt="img" />
              </span>

              <h2>
                {loading ? "..." : (dashboard?.referredConsultation ?? 0)}
              </h2>

              <p>Referred Consultation</p>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="dashboardBox four">
              <span>
                <img src={dashboard3} alt="img" />
              </span>

              <h2>{loading ? "..." : (dashboard?.referredTreatments ?? 0)}</h2>

              <p>Referred Treatments</p>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="dashboardBox five">
              <span>
                <img src={dashboard4} alt="img" />
              </span>

              <h2>{loading ? "..." : (dashboard?.postArrivalCare ?? 0)}</h2>

              <p>Post- Arrival Care</p>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="dashboardBox six">
              <span>
                <img src={dashboard5} alt="img" />
              </span>

              <h2>
                {loading
                  ? "..."
                  : `${dashboard?.wallet?.currency || ""} ${
                      dashboard?.wallet?.totalEarned ?? 0
                    }`}
              </h2>

              <p>Referral Earnings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
