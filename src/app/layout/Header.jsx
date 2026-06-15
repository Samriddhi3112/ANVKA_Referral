import { useState, useEffect } from "react";
import logo from "../../assets/images/logo.png";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
import { IoIosArrowDown } from "react-icons/io";
import { MdKeyboardArrowLeft } from "react-icons/md";
import bell from "../../assets/images/bell.svg";
import LogoutIcon from "../../assets/images/LogoutIcon.svg";
import Modal from "react-bootstrap/Modal";
import { useNavigate, useLocation } from "react-router-dom";
import { useProfileStore } from "../../modules/profile/store/profile.store";
import DpUpload from "../../assets/images/DpUpload.png";
import toast from "react-hot-toast";
import { useNotificationsStore } from "../../modules/notifications/store/notifications.store";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showNotification, setShowNotification] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { user, fetchProfile, logout } = useProfileStore();

  const {
    notifications,
    unreadCount,
    getNotifications,
    getUnreadCount,
    markAllAsRead,
    markAsRead,
  } = useNotificationsStore();

  const PAGE_TITLES = {
    "/overview": "Overview",
    "/registered-patients": "Registered Patients",
    "/referrals/consultation": "Referred Consultation",
    "/referrals/care": "Post Arrival Care",
    "/referrals/profile": "Profile Completion",
    "/referrals/treatment": "Referred Treatment",
    "/referral-earnings": "Referral Earnings",
    "/withdraw-money": "Withdraw Money",
    "/profile": "Profile",
    "/change-password": "Change Password",
    "/bank-details": "Referral Earnings",
    "/static-content" :"Help & Info",
    "/leads":"Leads Management"
  };

  const getPageTitle = () => {
    const path = location.pathname;

    if (PAGE_TITLES[path]) return PAGE_TITLES[path];

    const matchedKey = Object.keys(PAGE_TITLES).find((key) =>
      path.startsWith(key),
    );

    return PAGE_TITLES[matchedKey] || "";
  };

  const userName = user?.data?.referral?.fullName || "User";
  const profileImage = user?.data?.referral?.profilePicture || DpUpload;

  // unreadCount from API is the source of truth
  const hasUnread = Number(unreadCount) > 0;

  useEffect(() => {
    fetchProfile();
    getUnreadCount();
  }, []);

  const handleNotification = async () => {
    const next = !showNotification;
    setShowNotification(next);

    if (next) {
      await getNotifications({
        page: 1,
        limit: 10,
      });
    }
  };

  const handleMarkSingleRead = async (id) => {
    try {
      await markAsRead(id);
      await getUnreadCount();
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllAsRead();
      await getUnreadCount();
    } catch (err) {
      console.error(err);
    }
  };

  const confirmLogout = async () => {
    try {
      await logout();
      setShowModal(false);
      toast.success("Logged out successfully.");
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <>
      {/* Notification Panel */}
      <div className="notificationBody">
        <div
          className={`notificationBox ${
            showNotification ? "showNotification" : ""
          }`}
        >
          <div className="notifHeader">
            <h4 className="title">Notifications</h4>

            <a className="Close" onClick={handleNotification}>
              <IoClose />
            </a>
          </div>

          <div className="notifSubHeader">
            <span className="notifCount">
              {unreadCount > 0
                ? `${unreadCount} unread`
                : "You're all caught up"}
            </span>

            <button
              className="markAllBtn"
              disabled={!hasUnread}
              onClick={handleMarkAllRead}
            >
              Mark all read
            </button>
          </div>

          <ul className="notifList">
            {notifications?.length > 0 ? (
              notifications.map((item) => (
                <li
                  key={item._id}
                  className={`notificationItem ${item.isRead ? "read" : "unread"}`}
                  onClick={() => !item.isRead && handleMarkSingleRead(item._id)}
                >
                  <div className="iconBox">
                    <img src={bell} alt="" />
                  </div>

                  <div className="contentBox">
                    <div className="topRow">
                      <h5 title={item?.title}>
                        {item?.title || "Notification"}
                      </h5>

                      {!item.isRead && <span className="unreadDot" />}
                    </div>

                    <p>{item?.message}</p>
                  </div>
                </li>
              ))
            ) : (
              <li className="emptyState">No Notifications Found</li>
            )}
          </ul>
        </div>
      </div>

      {/* Header */}
      <header>
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>

        <div className="mainHeader">
          <div className="left" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <a
              className="backArrow"
              onClick={() => navigate(-1)}
              style={{
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: 0,
                color: "#F57C15",
              }}
            >
              <MdKeyboardArrowLeft size={26} />
            </a>
            <h4 style={{ margin: 0 }}>{getPageTitle()}</h4>
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

            {/* Bell */}
            <a onClick={handleNotification} className="bellIcon">
              <FaRegBell />

              {Number(unreadCount) > 0 && (
                <span className="bellBadge">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </a>

            {/* Profile */}
            <Dropdown align="end">
              <Dropdown.Toggle className="d-flex align-items-center">
                <span>
                  <img
                    style={{ width: "85px" }}
                    src={profileImage}
                    alt="profile"
                  />
                </span>
                <span className="ms-2">{userName}</span>
                <IoIosArrowDown className="ms-1" />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setShowModal(true)}>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </header>

      {/* Logout Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
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
                onClick={() => setShowModal(false)}
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