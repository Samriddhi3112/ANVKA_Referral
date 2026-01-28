import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useProfileStore } from "../store/profile.store";
import Modal from "react-bootstrap/Modal";
import OtpAnimation from "../../../assets/images/otpanimation.svg";
import OtpConf from "../../../assets/images/OtpConf.svg";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const [show, setShow] = useState(false);
  const { changePassword, loading } = useProfileStore();
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const handleClose = () => {
    setShow(false);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    // setShowSuccess(true);
  };

  const handleSavePassword = async () => {
  const { currentPassword, newPassword, confirmPassword } = formData;

  if (!currentPassword || !newPassword || !confirmPassword) {
    toast.error("Current password, new password, and confirm password are required.");
    return;
  }

  if (currentPassword === newPassword) {
    toast.error("New password must be different from current password.");
    return;
  }

  if (newPassword !== confirmPassword) {
    toast.error("New password and confirm password do not match.");
    return;
  }

  if (newPassword.length < 6) {
    toast.error("New password must be at least 6 characters long.");
    return;
  }

  try {
    const res = await changePassword({
      currentPassword,
      newPassword,
    });

    if (res.success === false) {
      toast.error(res.message || "Failed to change password.");
      return;
    }

    toast.success(res.message || "Password changed successfully!");
    setShow(false);
    setShowSuccess(true);

  } catch (err) {
    const backendMessage =
      err?.response?.data?.message ||
      err?.message ||
      "Failed to change password.";
    toast.error(backendMessage);
    console.error("Change password error:", err);
  }
};


  // const handleSavePassword = async () => {
  //   const { currentPassword, newPassword, confirmPassword } = formData;

  //   // 1️⃣ Check required fields
  //   if (!currentPassword || !newPassword || !confirmPassword) {
  //     toast.error(
  //       "Current password, new password, and confirm password are required."
  //     );
  //     return;
  //   }

  //   // 2️⃣ Check new password != current password
  //   if (currentPassword === newPassword) {
  //     toast.error("New password must be different from current password.");
  //     return;
  //   }

  //   // 3️⃣ Check new password & confirm password match
  //   if (newPassword !== confirmPassword) {
  //     toast.error("New password and confirm password do not match.");
  //     return;
  //   }

  //   // 4️⃣ Check minimum password length
  //   if (newPassword.length < 6) {
  //     toast.error("New password must be at least 6 characters long.");
  //     return;
  //   }

  //   // const complexityRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/;
  //   // if (!complexityRegex.test(newPassword)) {
  //   //   alert(
  //   //     "New password must contain at least one uppercase letter, one number, and one special character (!@#$%^&*)."
  //   //   );
  //   //   return;
  //   // }
  //   try {
  //     const res = await changePassword({
  //       currentPassword,
  //       newPassword,
  //     });

  //     if (res.success) {
  //       setShow(false);
  //       setShowSuccess(true);
  //     } else {
  //       toast.error(res.message || "Failed to change password.");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     toast.error(err?.response?.data?.message || "Failed to change password.");
  //   }
  // };

  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <div className="TitleBox">
            <h4 className="Title">Change Password</h4>
          </div>
          <div className="commonForm">
            <form>
              <div className="row">
                <div className="col-lg-4">
                  <div className="form-group">
                    <h6>Current Password<sup style={{ color: "#fc3636" }}>*</sup></h6>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter current password"
                      value={formData.currentPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          currentPassword: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group">
                    <h6>New Password<sup style={{ color: "#fc3636" }}>*</sup></h6>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter new password"
                      value={formData.newPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          newPassword: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group">
                    <h6>Confirm New Password<sup style={{ color: "#fc3636" }}>*</sup></h6>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm new password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </form>
            <div className="text-end">
              <Link to="/profile" className="Button Start me-2 px-5">
                Cancel
              </Link>
              <Link className="Button px-5" onClick={handleSavePassword}>
                {loading ? "Saving..." : "Save Password"}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} className="modal-login" centered>
        <Modal.Body>
          <div className="px-2 py-2">
            <div className="login-box">
              <div className="logo-part">
                {/* <figure>
              <img src={Logo} alt="" />
            </figure> */}

                {/* <Link to="/Login-Faq" className="faq">
              FAQ
            </Link> */}
              </div>
              <div className="login-headline flexGiven">
                <Link to="#" onClick={handleClose}>
                  <FaChevronLeft className="letIcon color-black" />
                </Link>

                <div>
                  <h5>Verify Code</h5>
                  <p className="mb-3">
                    Just sent you a verification code! Check your email{" "}
                    <span className="email-high">abc@gmail.com</span> to
                    continue.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={showSuccess} onHide={handleCloseSuccess} centered>
        <Modal.Body>
          <div className="p-4 text-center">
            <div className="fs-1 mb-2">
              <img src={OtpConf} alt="" />
            </div>
            <h5 className="modal-title my-4">
              Success! Your password has been changed.
            </h5>

            <div className="logout-wrapper">
              {/* <Link className="btn-transparent" onClick={handleClose}>
                Cancel
              </Link> */}
              <Link
                to={"/profile"}
                className="btn-colored"
                onClick={handleCloseSuccess}
              >
                {" "}
                Ok{" "}
              </Link>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ChangePassword;
