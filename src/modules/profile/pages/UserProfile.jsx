import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { FaChevronRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import DpUpload from "../../../assets/images/DpUpload.png";
import ChangePasswordIcon from "../../../assets/images/ChangePasswordIcon.svg";
import LogoutIconMini from "../../../assets/images/LogoutIconMini.svg";
import LogoutIcon from "../../../assets/images/LogoutIcon.svg";
import UploadProfile from "../../../assets/images/UploadProfile.svg";
import EditBtn from "../../../assets/images/EditBtn.svg";
import { useAuthStore } from "../../../app/auth/store/auth.store";
import toast from "react-hot-toast";
import { useProfileStore } from "../store/profile.store";

const UserProfile = () => {
  const navigate = useNavigate();
  const { user, fetchProfile, updateProfile, logout } = useProfileStore();
  const [show, setShow] = useState(false);
  const { uploadProfilePic } = useAuthStore();

  const [profilePreview, setProfilePreview] = useState(
    user?.data?.referral?.profilePicture || null
  );

  useEffect(() => {
    if (user?.data?.referral?.profilePicture) {
      setProfilePreview(user.data.referral.profilePicture);
    }
  }, [user]);

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProfilePreview(URL.createObjectURL(file));

    try {
      const uploadedUrl = await uploadProfilePic(file);

      await updateProfile({
        profilePicture: uploadedUrl,
      });

      await fetchProfile();

      toast.success("Profile picture updated successfully");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to update profile picture"
      );
      console.error(err);
    }
  };

  const confirmLogout = async () => {
    try {
      await logout();
      setShow(false);
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Logout failed");
    }
  };

  return (
    <>
      <div className="WrapperArea TourismHome">
        <div className="WrapperBox overview">
          <div className="TitleBox">
            <h4 className="Title">Profile</h4>
          </div>

          <div className="userprofileavatar my-3">
            <div className="AvatarBox">
              <label htmlFor="profileUpload" className="profile-upload-wrapper">
                <figure className="profile-figure">
                  <img
                    src={profilePreview || DpUpload}
                    className="profile-pic-icon"
                    alt="Profile"
                  />

                  {/* <span className="upload-icon">
                    <img src={UploadProfile} alt="Upload" />
                  </span> */}
                </figure>
                <div class="plus-btn">
                  <span>
                    <img src={UploadProfile} alt="" />
                  </span>
                </div>
              </label>

              <input
                type="file"
                id="profileUpload"
                accept="image/*"
                hidden
                onChange={handleProfileImageChange}
              />
            </div>

            <div className="userNamePos">
              <h6>{user?.data?.referral?.fullName || ""}</h6>
              <p>Referral</p>
            </div>
          </div>

          <div className="TitleBox">
            <h4 className="Title">Referral Information</h4>
            <Link to={"/profile/edit-facilitator-information"}>
              <img
                src={EditBtn}
                alt=""
                className="editImg"
                style={{ width: "18px" }}
              />
            </Link>
          </div>

          <div className="commonForm mb-0">
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <h6>Name</h6>
                  <input
                    type="text"
                    className="form-control"
                    value={user?.data?.referral?.fullName || ""}
                    readOnly
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <h6>Contact Number</h6>
                  <input
                    type="text"
                    className="form-control"
                    value={
                      user?.data?.referral?.countryCode
                        ? `${user.data.referral.countryCode} ${user.data.referral.phone}`
                        : user?.data?.referral?.phone || ""
                    }
                    readOnly
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <h6>Email</h6>
                  <input
                    type="text"
                    className="form-control"
                    value={user?.data?.referral?.email || ""}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="navigation m-0 patientdetailspage">
            <div className="row">
              <div className="col-12">
                <Link
                  to={"/profile/change-password"}
                  className="navigation-cards travel-intimation my-3"
                >
                  <div className="left-part">
                    <div className="white-card">
                      <img src={ChangePasswordIcon} alt="" />
                    </div>
                    <div>
                      <h6>Change Password</h6>
                    </div>
                  </div>
                  <div className="arrow-icon">
                    <FaChevronRight />
                  </div>
                </Link>
              </div>

              <Link onClick={handleShow} className="col-12">
                <div className="navigation-cards travel-intimation">
                  <div className="left-part">
                    <div className="white-card">
                      <img src={LogoutIconMini} alt="" />
                    </div>
                    <div>
                      <h6>Logout</h6>
                    </div>
                  </div>

                  <div className="arrow-icon">
                    <FaChevronRight />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body>
          <div className="p-4 text-center">
            <div className="fs-1 mb-2">
              <img src={LogoutIcon} alt="" />
            </div>
            <h5 className="modal-title mb-2">Logout</h5>
            <p className="mb-4">Are you sure you want to logout?</p>
            <div className="logout-wrapper">
              <Link className="btn-transparent" onClick={handleClose}>
                Cancel
              </Link>
              <Link className="btn-colored" onClick={confirmLogout}>
                Logout
              </Link>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserProfile;
