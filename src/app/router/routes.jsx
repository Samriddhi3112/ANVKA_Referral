// import { Routes, Route, Navigate } from "react-router-dom";
// import AppLayout from "../layout/AppLayout";
// import OverviewPage from "../../modules/overview/OverviewPage";
// import LoginPage from "../auth/pages/LoginPage";
// import ForgotPassword from "../auth/pages/ForgotPassword";
// import ConfirmPassword from "../auth/pages/ConfirmPassword";
// import VerifyCode from "../auth/pages/VerifyCode";
// import CreateAccount from "../auth/pages/CreateAccount";
// import OtpLoginCode from "../auth/pages/OtpLoginCode";

// const AppRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<LoginPage />} />
//       <Route path="/Forget-Password" element={<ForgotPassword />} />
//       {/* <Route path="/Forget-Password" element={<ForgetPassword />} /> */}
//       <Route path="/Otp-Login-Code" element={<OtpLoginCode />} />
//       <Route path="/Confirm-Password" element={<ConfirmPassword />} />
//       <Route path="/Verify-Code" element={<VerifyCode />} />
//       <Route path="/Create-Account" element={<CreateAccount />} />
//       <Route path="/" element={<Navigate to="/overview" replace />} />
//       <Route element={<AppLayout />}>
//         <Route path="/overview" element={<OverviewPage />} />
//       </Route>
//     </Routes>
//   );
// };

// export default AppRoutes;

import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import OverviewPage from "../../modules/overview/OverviewPage";
import LoginPage from "../auth/pages/LoginPage";
import ForgotPassword from "../auth/pages/ForgotPassword";
import ConfirmPassword from "../auth/pages/ConfirmPassword";
import VerifyCode from "../auth/pages/VerifyCode";
import CreateAccount from "../auth/pages/CreateAccount";
import OtpLoginCode from "../auth/pages/OtpLoginCode";
import ProtectedRoute from "./ProtectedRoute";
import RegisteredPatientPage from "../../modules/registeredPatient/pages/RegisteredPatientPage";
import ReferralPage from "../../modules/referrals/pages/ReferralPage";
import UserProfile from "../../modules/profile/pages/UserProfile";
import ChangePassword from "../../modules/profile/pages/ChangePassword";
import EditFacilitatorInformation from "../../modules/profile/pages/EditFacilitatorInformation";
import ReferralEarnings from "../../modules/referralEarnings/pages/ReferralEarnings";
import BankDetails from "../../modules/referralEarnings/Bank Details/pages/bankDetails";
import WithdrawMoney from "../../modules/referralEarnings/withdrawals/pages/WithdrawMoney";
import StaticContent from "../../modules/staticContent/pages/staticContent";
import LeadDetail from "../../modules/leads/pages/leadsDetail";
import LeadsListing from "../../modules/leads/pages/leadsListing";
import PatientDetailPage from "../../modules/registeredPatient/pages/PatientDetailPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public / Auth Routes */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/otp-login" element={<OtpLoginCode />} />
      <Route path="/verify-code" element={<VerifyCode />} />
      <Route path="/confirm-password" element={<ConfirmPassword />} />
      <Route path="/create-account" element={<CreateAccount />} />

      {/*  Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/overview" element={<OverviewPage />} />
          <Route
            path="/registered-patients"
            element={<RegisteredPatientPage />}
          />
          <Route path="/referrals/:type" element={<ReferralPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/profile/change-password" element={<ChangePassword />} />
          <Route
            path="/profile/edit-facilitator-information"
            element={<EditFacilitatorInformation />}
          />
          <Route path="/referral-earnings" element={<ReferralEarnings />} />
          <Route path="/referral-earnings/bank-details" element={<BankDetails />} />
          <Route path="/static-content" element={<StaticContent />} />
          <Route path="/referral-earnings/withdraw-money" element={<WithdrawMoney />} />
          <Route path="/leads" element={<LeadsListing />} />
          <Route path="/leads/:id" element={<LeadDetail />} />
          <Route path="/registered-patients/:leadId" element={<PatientDetailPage />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
