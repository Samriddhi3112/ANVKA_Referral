import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import toast from "react-hot-toast";

import Logo from "../../../assets/images/Logo.svg";
import OrangeBox from "../../../assets/images/OrangeBox.png";
import { useAuthStore } from "../store/auth.store";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { forgotPasswordOtp, loading } = useAuthStore();

  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    if (!phoneOrEmail.trim()) {
      setError("Email is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!emailRegex.test(phoneOrEmail) && !phoneRegex.test(phoneOrEmail)) {
      setError("Enter a valid email ");
      return false;
    }

    setError("");
    return true;
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await forgotPasswordOtp({ phoneOrEmail });

      toast.success("OTP sent successfully" || res.message);
      navigate("/verify-code", { state: { phoneOrEmail, devOtp: res?.data?.otpCode } });
    } catch (err) {
      toast.error(
        "This email is not registered. Please create an account first." ||
          err.message
      );
    }
  };

  return (
    <div className="login LoginOtpHome">
      <div className="login-box">
        <div className="logo-part">
          <figure>
            <img src={Logo} alt="Logo" />
          </figure>
        </div>

        <figure>
          <img src={OrangeBox} alt="" />
        </figure>

        <div className="login-headline flexGiven">
          <Link to="/">
            <FaChevronLeft className="letIcon color-black" />
          </Link>
          <div>
            <h5>Forget Password</h5>
            <p>Enter your registered email address to receive OTP.</p>
          </div>
        </div>

        <form onSubmit={handleSendOtp}>
          <div className="form-group">
            <label className="label">Email Id <sup style={{color:"#fc3636"}}>*</sup></label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your email id"
              value={phoneOrEmail}
              onChange={(e) => setPhoneOrEmail(e.target.value)}
            />
            {error && <small className="text-danger">{error}</small>}
          </div>

          <div className="footer-login">
            <button
              type="submit"
              className="btn-colored margintoplittle"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
