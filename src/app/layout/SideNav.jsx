import { NavLink } from "react-router-dom";
import overview from "../../assets/images/overview.svg";
import patients from "../../assets/images/patients.svg";
import referredIcon from "../../assets/images/referred-consultation.svg";
import postarrivalIcon from "../../assets/images/post-arrival.svg";
import completionIcon from "../../assets/images/profile-consultataion.svg";
import referredTreatIcon from "../../assets/images/referred-treatment.svg";
import referrelearnings from "../../assets/images/referrel-earnings.svg";
import { useLocation } from "react-router-dom";

const Sidenav = () => {
  const location = useLocation();

  const isActive = (paths) => {
    return paths.some((path) =>
      location.pathname.startsWith(path)
    );
  };

  return (
    <div className="SidenavBar">
      <ul>
        <li className={isActive(["/overview"]) ? "active" : ""}>
          <NavLink to="/overview">
            <span>
              <img src={overview} alt="Overview" />
            </span>
            Overview
          </NavLink>
        </li>

        <li className={isActive(["/recent-registration"]) ? "active" : ""}>
          <NavLink to="/recent-registration">
            <span>
              <img src={patients} alt="Patients" />
            </span>
            Registered Patient
          </NavLink>
        </li>

        <li className={isActive(["/latest-referral"]) ? "active" : ""}>
          <NavLink to="/latest-referral">
            <span>
              <img src={referredIcon} alt="Referred Consultation" />
            </span>
            Referred Consultation
          </NavLink>
        </li>

        <li className={isActive(["/latest-post-arrival"]) ? "active" : ""}>
          <NavLink to="/latest-post-arrival">
            <span>
              <img src={postarrivalIcon} alt="Post Arrival Care" />
            </span>
            Post Arrival Care
          </NavLink>
        </li>

        <li className={isActive(["/latest-profile"]) ? "active" : ""}>
          <NavLink to="/latest-profile">
            <span>
              <img src={completionIcon} alt="Profile Completion" />
            </span>
            Profile Completion
          </NavLink>
        </li>

        <li className={isActive(["/referred-treatment"]) ? "active" : ""}>
          <NavLink to="/referred-treatment">
            <span>
              <img src={referredTreatIcon} alt="Referred Treatment" />
            </span>
            Referred Treatment
          </NavLink>
        </li>

        <li
          className={
            isActive(["/referral-earnings", "/withdraw-money"])
              ? "active"
              : ""
          }
        >
          <NavLink to="/referral-earnings">
            <span>
              <img src={referrelearnings} alt="Referral Earnings" />
            </span>
            Referral Earnings
          </NavLink>
        </li>

        <li
          className={
            isActive(["/user-profile", "/change-password"])
              ? "active"
              : ""
          }
        >
          <NavLink to="/user-profile">
            <span>
              <img src={patients} alt="Profile" />
            </span>
            Profile
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidenav;
