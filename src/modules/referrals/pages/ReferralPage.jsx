import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Filters from "../components/Filters";
import List from "../components/List";
import { referralConfig } from "../utils/referralConfig";
import { useConsultationsStore } from "../../referralConsultation/store/consultations.store";

const ReferralPage = () => {
  const { type } = useParams();
  const config = referralConfig[type];

  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { getConsultations } = useConsultationsStore();

  useEffect(() => {
    console.log({
      startDate,
      endDate,
      page,
    });

    getConsultations({
      startDate,
      endDate,
      page,
      limit: 20,
    });
  }, [startDate, endDate, page]);

  const handleResetFilters = () => {
    setStartDate("");
    setEndDate("");
    setPage(1);
  };

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="TitleBox">
          <h4 className="Title">{config.title}</h4>

          <Filters
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            onReset={handleResetFilters}
          />
        </div>

        <List serviceType={config.service} page={page} setPage={setPage} />
      </div>
    </div>
  );
};

export default ReferralPage;
