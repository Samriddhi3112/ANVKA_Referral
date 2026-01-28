import React from "react";
import { useParams } from "react-router-dom";
import Filters from "../components/Filters";
import List from "../components/List";
import { referralConfig } from "../utils/referralConfig";

const ReferralPage = () => {
  const { type } = useParams(); 
  const config = referralConfig[type];

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="TitleBox">
          <h4 className="Title">{config.title}</h4>
          <Filters />
        </div>

        <List serviceType={config.service} />
      </div>
    </div>
  );
};

export default ReferralPage;
