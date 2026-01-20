import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa6";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import Modal from "react-bootstrap/Modal";
import toast from "react-hot-toast";
import Logo from "../../../assets/images/Logo.svg";
import successfulIcon from "../../../assets/images/successfulIcon.svg";
import { useAuthStore } from "../store/auth.store";

const ConfirmPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { phoneOrEmail, otpCode } = location.state || {};

  const { resetPassword, loading } = useAuthStore();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const validatePassword = (password) => {
    const errors = [];

    if (!password) errors.push("Password is required");
    if (password.length < 8)
      errors.push("Password must be at least 6 characters");
    // if (!/[A-Z]/.test(password))
    //   errors.push("At least one uppercase letter required");
    // if (!/[a-z]/.test(password))
    //   errors.push("At least one lowercase letter required");
    // if (!/[0-9]/.test(password))
    //   errors.push("At least one number required");
    // if (!/[!@#$%^&*]/.test(password))
    //   errors.push("At least one special character required");

    return errors;
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    const errors = validatePassword(password);

    if (errors.length) {
      errors.forEach((err) => toast.error(err));
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await resetPassword({
        phoneOrEmail,
        otpCode,
        newPassword: password,
      });

      toast.success("Password reset successfully", { duration: 2000 });

      setTimeout(() => {
        setShow(true);
      }, 500);
    } catch (err) {
      toast.error(err?.message || "Password reset failed");
    }
  };

  return (
    <>
      <div className="login LoginOtpHome">
        <div className="login-box">
          <div className="logo-part">
            <figure>
              <img src={Logo} alt="Logo" />
            </figure>
          </div>

          <div className="login-headline flexGiven">
            <Link to="/Verify-Code">
              <FaChevronLeft className="letIcon color-black" />
            </Link>

            <div>
              <h5>Forget Password</h5>
              <p>Don't worry! We've sent recovery instructions to your email.</p>
              {/* <p>Set a strong password to secure your account</p> */}
            </div>
          </div>

          <form onSubmit={handleResetPassword}>
            <div className="form-group">
              <label className="label">New Password</label>
              <div className="password-wrapper">
                <input
                  type={showPass ? "text" : "password"}
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                />
                <span className="eye-icons" onClick={() => setShowPass(!showPass)}>
                  {showPass ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </span>
              </div>
            </div>

            <div className="form-group">
              <label className="label">Confirm Password</label>
              <div className="password-wrapper">
                <input
                  type={showConfirmPass ? "text" : "password"}
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                />
                <span className="eye-icons" onClick={() => setShowConfirmPass(!showConfirmPass)}>
                  {showConfirmPass ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </span>
              </div>
            </div>

            <div className="footer-login">
              <button
                type="submit"
                className="btn-colored margintoplittle"
                disabled={loading}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Modal show={show} centered backdrop="static">
        <Modal.Body>
          <div className="p-4 text-center">
            <img src={successfulIcon} alt="Success" />

            <h5 className="mt-3">
              Success! Your password has been changed.
            </h5>

            <p className="mb-4">
              Please log in using your new credentials.
            </p>

            <button
              className="btn-colored"
              onClick={() => navigate("/")}
            >
              Go to Login
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ConfirmPassword;
