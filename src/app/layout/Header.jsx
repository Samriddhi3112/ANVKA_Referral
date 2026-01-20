import { useState } from "react";
import logo from "../../assets/images/logo.png";
import {
  IoClose,
  IoSearchOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaRegBell } from "react-icons/fa";
import profile from "../../assets/images/profile.png";
import Dropdown from "react-bootstrap/Dropdown";
import { IoIosArrowDown } from "react-icons/io";
import bell from "../../assets/images/bell.svg";
import LogoutIcon from "../../assets/images/LogoutIcon.svg";
import Modal from "react-bootstrap/Modal";

const Header = () => {
  const [showNotification, setShowNotification] = useState();
  const handleNotification = () => {
    setShowNotification(showNotification);
  };

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
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
            <li>
              <span>
                <img src={bell} alt="" />
              </span>
              <h5>Lorsem Ipsum</h5>
              <p>10 minutes ago</p>
            </li>
            <li>
              <span>
                <img src={bell} alt="" />
              </span>
              <h5>Lorsem Ipsum</h5>
              <p>10 minutes ago</p>
            </li>
            <li>
              <span>
                <img src={bell} alt="" />
              </span>
              <h5>Lorsem Ipsum</h5>
              <p>10 minutes ago</p>
            </li>
            <li>
              <span>
                <img src={bell} alt="" />
              </span>
              <h5>Lorsem Ipsum</h5>
              <p>10 minutes ago</p>
            </li>
            <li>
              <span>
                <img src={bell} alt="" />
              </span>
              <h5>Lorsem Ipsum</h5>
              <p>10 minutes ago</p>
            </li>
          </ul>
        </div>
      </div>
      <header>
        <div className="logo">
          <img src={logo} alt="img" />
        </div>
        <div className="mainHeader">
          <div className="left">
            <h4>{}</h4>
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
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic">
                <span>
                  <img src={profile} alt="profile" />
                </span>
                User
                <IoIosArrowDown />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <link onClick={handleShow}>Logout</link>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </header>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body>
          <div className="p-4 text-center">
            <div className="fs-1 mb-2">
              <img src={LogoutIcon} alt="" />
            </div>
            <h5 className="modal-title mb-2">Logout</h5>
            <p className="mb-4">Are you sure you want to logout?</p>
            <div className="logout-wrapper">
              <Link to={"/"} className="btn-transparent" onClick={handleClose}>
                Cancel
              </Link>
              <Link to={"/"} className="btn-colored">
                {" "}
                Logout
              </Link>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Header;
