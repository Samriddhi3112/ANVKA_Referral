import { NavLink } from "react-router-dom";
import overview from "../../assets/images/overview.svg";
import patients from "../../assets/images/patients.svg";
import referredIcon from "../../assets/images/referred-consultation.svg";
import postarrivalIcon from "../../assets/images/post-arrival.svg";
import completionIcon from "../../assets/images/profile-consultataion.svg";
import referredTreatIcon from "../../assets/images/referred-treatment.svg";
import referrelearnings from "../../assets/images/referrel-earnings.svg";
import staticContent from "../../assets/images/Frame.png"
import { useLocation } from "react-router-dom";

const Sidenav = () => {
  const location = useLocation();
  const isExactActive = (path) => location.pathname === path;

  const isActive = (paths) => {
    return paths.some((path) => location.pathname.startsWith(path));
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

        <li className={isActive(["/registered-patients"]) ? "active" : ""}>
          <NavLink to="/registered-patients">
            <span>
              <img src={patients} alt="Patients" />
            </span>
            Registered Patient
          </NavLink>
        </li>

        <li
          className={isExactActive("/referrals/consultation") ? "active" : ""}
        >
          <NavLink to="/referrals/consultation">
            <span>
              <img src={referredIcon} alt="" />
            </span>
            Referred Consultation
          </NavLink>
        </li>

        <li className={isExactActive("/referrals/care") ? "active" : ""}>
          <NavLink to="/referrals/care">
            <span>
              <img src={postarrivalIcon} alt="" />
            </span>
            Post Arrival Care
          </NavLink>
        </li>

        <li className={isExactActive("/referrals/profile") ? "active" : ""}>
          <NavLink to="/referrals/profile">
            <span>
              <img src={completionIcon} alt="" />
            </span>
            Profile Completion
          </NavLink>
        </li>

        <li className={isExactActive("/referrals/treatment") ? "active" : ""}>
          <NavLink to="/referrals/treatment">
            <span>
              <img src={referredTreatIcon} alt="" />
            </span>
            Referred Treatment
          </NavLink>
        </li>

        <li
          className={
            isActive(["/referral-earnings", "/withdraw-money"]) ? "active" : ""
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
            isActive(["/profile", "/change-password"]) ? "active" : ""
          }
        >
          <NavLink to="/profile">
            <span>
              <img src={patients} alt="Profile" />
            </span>
            Profile
          </NavLink>
        </li>
        <li
          className={isExactActive("/static-content") ? "active" : ""}
        >
          <NavLink to="/static-content">
            <span>
              <img src={staticContent} alt="" />
            </span>
            Help & Info
          </NavLink>
        </li>
        {/* <li
          className={
            isActive(["/profile", "/change-password"]) ? "active" : ""
          }
        >
          <NavLink to="/static-content">
            <span>
              <img src={patients} alt="Profile" />
            </span>
            Help and Info
          </NavLink>
        </li> */}
      </ul>
    </div>
  );
};

export default Sidenav;
