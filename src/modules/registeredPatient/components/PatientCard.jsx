import React from "react";
import userProfile from "../../../assets/images/user-profile.png";

const PatientCard = () => {
  return (
    <div className="recentRegisBox">
      <div className="top">
        <figure>
          <img src={userProfile} alt="patient" />
        </figure>

        <figcaption>
          <h6>UHID</h6>
          <h5>Rayna Levin</h5>
          <p>+91 8778 7820 662</p>

          <ul>
            <li>Female</li>
            <li>12-10-1999</li>
          </ul>

          <h4>Registration Date: 08 June 2025</h4>
        </figcaption>
      </div>

      <button>View Details</button>
    </div>
  );
};

export default PatientCard;
