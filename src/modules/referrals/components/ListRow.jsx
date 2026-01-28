import React from "react";
import consultProfile from "../../../assets/images/consultation-profile.png";
import { MdKeyboardArrowRight } from "react-icons/md";

const ListRow = ({ onClick }) => {
  return (
    <div className="latestReferralBox" onClick={onClick}>
      <div className="left">
        <figure>
          <img src={consultProfile} alt="img" />
        </figure>
        <figcaption>
          <p>UHID</p>
          <h4>Martin Westervelt</h4>
        </figcaption>
      </div>
      <MdKeyboardArrowRight />
    </div>
  );
};

export default ListRow;
