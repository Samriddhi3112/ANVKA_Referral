import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import toast from "react-hot-toast";
import { FaChevronLeft } from "react-icons/fa6";

import Logo from "../../../assets/images/Logo.svg";

import { useAuthStore } from "../store/auth.store";
import CircularProgress from "../../../shared/components/CircularProgress";

const OtpLoginCode = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { verifyLoginOtp, requestLoginOtp, loading } = useAuthStore();

  const { phoneOrEmail, countryCode, devOtp } = location.state || {};
  const phone = phoneOrEmail;

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);

  // useEffect(() => {
  //   if (devOtp) {
  //     setOtp(devOtp);
  //   }
  // }, [devOtp]);

  useEffect(() => {
    if (!phone || !countryCode) {
      toast.error("Invalid access. Redirecting to login.");
      const t = setTimeout(() => {
        navigate("/", { replace: true });
      }, 1000);
      return () => clearTimeout(t);
    }
  }, [phone, countryCode, navigate]);

  const TOTAL_TIME = 60;
  const percent = (timer / TOTAL_TIME) * 100;

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("Enter 6-digit OTP");
      return;
    }

    try {
      const res = await verifyLoginOtp({
        phoneOrEmail: phone,
        countryCode,
        otpCode: otp,
      });

      if (res?.success || res?.data?.success) {
        toast.success("Login successful");
        navigate("/overview");
      } else {
        toast.error(res?.message || "Invalid OTP");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Invalid or expired OTP");
    }
  };

  const handleResendOtp = async () => {
    try {
      await requestLoginOtp({
        phoneOrEmail: phone,
        countryCode,
      });

      toast.success("OTP resent successfully");
      setTimer(60);
      setOtp("");
    } catch {
      toast.error("Failed to resend OTP");
    }
  };

  return (
    <div className="login">
      <div className="login-box">
        <div className="logo-part">
          <img src={Logo} alt="Logo" />
        </div>

        <div className="login-headline flexGiven">
          <Link to="/">
            <FaChevronLeft className="letIcon color-black" />
          </Link>

          <div>
            <h5>Verify Code</h5>
            <p>
              OTP sent to {countryCode} {phone}
            </p>
          </div>
        </div>

        <form onSubmit={handleVerifyOtp}>
          <div className="form-group">
            <div className="otp-label">
              <label className="label">OTP</label>

              <span className="otp-timer">
                {timer > 0 && (
                  <CircularProgress
                    size={20}
                    radius={8}
                    strokeWidth={3}
                    percent={percent}
                    progressColor={
                      percent > 60
                        ? "#22c55e"
                        : percent > 30
                        ? "#f97316"
                        : "#ef4444"
                    }
                  />
                )}

                <span>
                  {timer > 0
                    ? `00:${timer < 10 ? `0${timer}` : timer}`
                    : "Expired"}
                </span>
              </span>
            </div>

            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              isInputNum
              shouldAutoFocus
              containerStyle={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
                marginTop: "10px",
              }}
              inputStyle={{
                width: "50px",
                height: "50px",
                fontSize: "18px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                textAlign: "center",
              }}
              renderInput={(props) => <input {...props} />}
            />
          </div>

          <p className="resend-line">
            Didn’t receive OTP?
            <span
              className={`resend-otp-option ${timer > 0 ? "disabled" : ""}`}
              onClick={timer === 0 ? handleResendOtp : undefined}
              style={{
                marginLeft: "5px",
                cursor: timer === 0 ? "pointer" : "not-allowed",
                color: timer === 0 ? "#1d4ed8" : "#888",
                fontWeight: "500",
              }}
            >
              Resend OTP
            </span>
          </p>
          {devOtp && (
            <p style={{ marginTop: "10px", color: "#16a34a", fontWeight: 500 }}>
              OTP is: {devOtp}
            </p>
          )}

          <div className="call-options footer-btns">
            <Link to="/" className="btn-transparent">
              Back
            </Link>

            <button type="submit" className="btn-colored" disabled={loading}>
              {loading && <span className="loader"></span>}
              {loading ? "Verifying..." : "Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtpLoginCode;
