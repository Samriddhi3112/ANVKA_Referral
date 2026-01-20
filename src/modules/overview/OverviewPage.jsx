import dashboard1 from "../../assets/images/dashboard-icon-1.png";
import dashboard2 from "../../assets/images/dashboard-icon-2.png";
import dashboard3 from "../../assets/images/dashboard-icon-3.png";
import dashboard4 from "../../assets/images/dashboard-icon-4.png";
import dashboard5 from "../../assets/images/dashboard-icon-5.png";
import dashboard6 from "../../assets/images/dashboard-icon-6.png";
import { FaLocationDot } from "react-icons/fa6";
import { IoChevronDown } from "react-icons/io5";

const OverviewPage = () => {
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
          <div className="d-flex justify-content-between align-items-center w-100">
            <h4 className="Title">Monthly Health Summary</h4>
          </div>
        </div>
        {/* <div className='d-flex'>
                        <h6 onClick={handleReferralConsultShow}>First</h6>
                        <h6 onClick={handlePostArrivalShow}>Second</h6>
                        <h6 onClick={handleProfileCompletionShow}>Third</h6>
                        <h6 onClick={handleReferralShow}>Fourth</h6>
                    </div> */}
        <div className="row gy-4">
          <div className="col-lg-4">
            <div className="dashboardBox one">
              <span>
                <img src={dashboard1} alt="img" />
              </span>
              <h2>200</h2>
              <p>Registered Patients</p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="dashboardBox two">
              <span>
                <img src={dashboard6} alt="img" />
              </span>
              <h2>90</h2>
              <p>Profile Completion</p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="dashboardBox three">
              <span>
                <img src={dashboard2} alt="img" />
              </span>
              <h2>300</h2>
              <p>Referred Consultation</p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="dashboardBox four">
              <span>
                <img src={dashboard3} alt="img" />
              </span>
              <h2>172</h2>
              <p>Referred Treatments</p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="dashboardBox five">
              <span>
                <img src={dashboard4} alt="img" />
              </span>
              <h2>120</h2>
              <p>Post- Arrival Care</p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="dashboardBox six">
              <span>
                <img src={dashboard5} alt="img" />
              </span>
              <h2>$20,000</h2>
              <p>Referral Earnings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
