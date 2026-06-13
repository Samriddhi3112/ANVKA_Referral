import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../auth/store/auth.store";

import dashboardReducer from "../../modules/dashboard/store/dashboard.store";
import notificationsReducer from "../../modules/notifications/store/notifications.store";
import walletReducer from "../../modules/wallet/store/wallet.store";
import withdrawalsReducer from "../../modules/withdrawals/store/withdrawals.store";
import bankDetailsReducer from "../../modules/bankDetails/store/bankDetails.store";
import consultationsReducer from "../../modules/consultations/store/consultations.store";
import registeredPatientReducer from "../../modules/registeredPatient/store/registeredPatient.store";
import faqsReducer from "../../modules/faqs/store/faqs.store";
import staticContentReducer from "../../modules/staticContent/store/staticContent.store";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    notifications: notificationsReducer,
    wallet: walletReducer,
    withdrawals: withdrawalsReducer,
    bankDetails: bankDetailsReducer,
    consultations: consultationsReducer,
    registeredPatient: registeredPatientReducer,
    faqs: faqsReducer,
    staticContent: staticContentReducer,
  },
});