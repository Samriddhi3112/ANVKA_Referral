import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Filters from "../components/Filters";
import List from "../components/List";
import { referralConfig } from "../utils/referralConfig";
import { useConsultationsStore } from "../../referralConsultation/store/consultations.store";

// ─── Map serviceType to its store ─────────────────────────────────────────
// Jab baaki APIs ready hon, unka store yahan add karo
const useStoreByType = (type) => {
  const consultationsStore = useConsultationsStore();

  switch (type) {
    case "consultation":
      return consultationsStore;

    // Jab APIs ready hon:
    // case "treatment":
    //   return useTreatmentStore();
    // case "profile":
    //   return useProfileStore();
    // case "care":
    //   return useCareStore();

    default:
      // Baaki types ke liye empty state return karo — koi data nahi dikhega
      return {
        consultations: [],
        total: 0,
        page: 1,
        limit: 20,
        loading: false,
        getConsultations: async () => {},
      };
  }
};

const ReferralPage = () => {
  const { type } = useParams();
  const config = referralConfig[type];

  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const store = useStoreByType(type);

  useEffect(() => {
    // Sirf consultation type pe API call hogi
    // Baaki types ke liye empty store return hoga
    if ((startDate && endDate) || (!startDate && !endDate)) {
      if (store.getConsultations) {
        store.getConsultations({
          startDate,
          endDate,
          page,
          limit: 20,
        });
      }
    }
  }, [type, startDate, endDate, page]);

  const handleResetFilters = () => {
    setStartDate("");
    setEndDate("");
    setPage(1);
  };

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="TitleBox">
          <h4 className="Title">{config?.title}</h4>

          <Filters
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            onReset={handleResetFilters}
          />
        </div>

        <List
          serviceType={config?.service}
          page={page}
          setPage={setPage}
          store={store}
        />
      </div>
    </div>
  );
};

export default ReferralPage;
