import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import OverviewPage from "../../modules/overview/OverviewPage";
import LoginPage from "../auth/pages/LoginPage";
import ForgotPassword from "../auth/pages/ForgotPassword";
import ConfirmPassword from "../auth/pages/ConfirmPassword";
import VerifyCode from "../auth/pages/VerifyCode";
import CreateAccount from "../auth/pages/CreateAccount";
import OtpLoginCode from "../auth/pages/OtpLoginCode";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/Forget-Password" element={<ForgotPassword />} />
      {/* <Route path="/Forget-Password" element={<ForgetPassword />} /> */}
      <Route path="/Otp-Login-Code" element={<OtpLoginCode />} />
      <Route path="/Confirm-Password" element={<ConfirmPassword />} />
      <Route path="/Verify-Code" element={<VerifyCode />} />
      <Route path="/Create-Account" element={<CreateAccount />} />
      <Route path="/" element={<Navigate to="/overview" replace />} />
      <Route element={<AppLayout />}>
        <Route path="/overview" element={<OverviewPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
