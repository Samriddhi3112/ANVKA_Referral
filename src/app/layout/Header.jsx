import { useState, useEffect } from "react";
import logo from "../../assets/images/logo.png";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
import { IoIosArrowDown } from "react-icons/io";
import bell from "../../assets/images/bell.svg";
import LogoutIcon from "../../assets/images/LogoutIcon.svg";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { useProfileStore } from "../../modules/profile/store/profile.store";
// import { useProfileStore } from "../store/profile.store";
import DpUpload from "../../assets/images/DpUpload.png";
import { useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { user, fetchProfile, logout } = useProfileStore();

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;

    if (PAGE_TITLES[path]) return PAGE_TITLES[path];

    const matchedKey = Object.keys(PAGE_TITLES).find((key) =>
      path.startsWith(key)
    );

    return PAGE_TITLES[matchedKey] || "";
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const userName = user?.data?.referral?.fullName || "User";
  const profileImage = user?.data?.referral?.profilePicture || DpUpload;

  const handleNotification = () => setShowNotification(!showNotification);

  const confirmLogout = async () => {
    try {
      await logout();
      setShowModal(false);
      navigate("/",{ replace: true });
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const PAGE_TITLES = {
    "/overview": "Overview",
    "/registered-patients": "Registered Patients",
    "/referrals/consultation": "Referred Consultation",
    "/referrals/care": "Post Arrival Care",
    "/referrals/profile": "Profile Completion",
    "/referrals/treatment": "Referred Treatment",
    "/referral-earnings": "Referral Earnings",
    "/withdraw-money": "Withdraw Money",
    "/profile": "Profile Completion",
    "/change-password": "Change Password",
  };

  return (
    <>
      <div className="notificationBody">
        <div
          className={`notificationBox ${
            showNotification ? "showNotification" : ""
          }`}
        >
          <h4 className="title">Notification</h4>
          <a className="Close" onClick={handleNotification}>
            <IoClose />
          </a>
          <ul>
            {[...Array(5)].map((_, i) => (
              <li key={i}>
                <span>
                  <img src={bell} alt="" />
                </span>
                <h5>Lorsem Ipsum</h5>
                <p>10 minutes ago</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <header>
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="mainHeader">
          <div className="left">
            <h4>{getPageTitle()}</h4>
          </div>

          <div className="right">
            <div className="searchBar">
              <IoSearchOutline />
              <input
                type="text"
                className="form-control"
                placeholder="Search here..."
              />
            </div>
            <a onClick={handleNotification} className="bellIcon">
              <FaRegBell />
              <span>3</span>
            </a>
            <Dropdown align="end">
              <Dropdown.Toggle className="d-flex align-items-center">
                <span>
                  <img
                    style={{ width: "85px" }}
                    src={profileImage}
                    alt="profile"
                  />
                </span>
                {/* <span>
                  <img src={profile} alt="profile" />
                </span> */}
                <span className="ms-2">{userName}</span>
                <IoIosArrowDown className="ms-1" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleShowModal}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </header>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Body>
          <div className="p-4 text-center">
            <div className="fs-1 mb-2">
              <img src={LogoutIcon} alt="Logout" />
            </div>
            <h5 className="modal-title mb-2">Logout</h5>
            <p className="mb-4">Are you sure you want to logout?</p>
            <div className="logout-wrapper">
              <button
                className="btn-transparent me-2"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button className="btn-colored" onClick={confirmLogout}>
                OK
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Header;
