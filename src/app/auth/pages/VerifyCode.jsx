import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import toast from "react-hot-toast";
import { FaChevronLeft } from "react-icons/fa6";

import Logo from "../../../assets/images/Logo.svg";
import { useAuthStore } from "../store/auth.store";
import CircularProgress from "../../../shared/components/CircularProgress";

const VerifyCode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { phoneOrEmail } = location.state || {};
  const [timer, setTimer] = useState(60);

  const { verifyForgotPasswordOtp, resendPasswordOtp, loading } =
    useAuthStore();

  const [otp, setOtp] = useState("");
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
      toast.error("Please enter valid 6-digit OTP");
      return;
    }

    try {
      await verifyForgotPasswordOtp({
        phoneOrEmail,
        otpCode: otp,
      });

      toast.success("OTP verified successfully", {
        duration: 2000, // 👈 toast will stay for 2 sec
      });

      setTimeout(() => {
        navigate("/Confirm-Password", {
          state: { phoneOrEmail, otpCode: otp },
        });
      }, 1800); // 👈 navigate slightly before toast ends
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleResendOtp = async () => {
    if (!phoneOrEmail) return toast.error("Phone or Email missing");

    try {
      await resendPasswordOtp({ phoneOrEmail });
      toast.success("OTP resent successfully");
      setTimer(60);
      setOtp("");
    } catch (err) {
      toast.error(err.message || "Failed to resend OTP");
    }
  };

  return (
    <div className="login">
      <div className="login-box">
        {/* LOGO */}
        <div className="logo-part">
          <figure>
            <img src={Logo} alt="Logo" />
          </figure>
        </div>

        {/* HEADER */}
        <div className="login-headline flexGiven">
          <Link to="/Forget-Password">
            <FaChevronLeft className="letIcon color-black" />
          </Link>

          <div>
            <h5>Verify Code</h5>
            <p>
              We have sent a verification code to your registered email /
              mobile.
            </p>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleVerifyOtp}>
          <div className="form-group">
            <div className="otp-label">
              <label className="label">
                OTP <sup>*</sup>
              </label>
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
              inputType="tel"
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
              // renderInput={(props) => <input {...props} />}
              renderInput={(props) => (
                <input {...props} className="form-control otp-input" />
              )}
              // containerStyle="OTPBox"
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

          {/* ACTION BUTTONS */}
          <div className="call-options footer-btns">
            <Link to="/Forget-Password" className="btn-transparent">
              Back
            </Link>
            <button type="submit" className="btn-colored" disabled={loading}>
              {loading ? "Verifying..." : "Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyCode;
