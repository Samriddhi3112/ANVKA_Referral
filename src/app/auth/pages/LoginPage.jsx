import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import PhoneInput from "react-phone-input-2";
import toast from "react-hot-toast";

import { useAuthStore } from "../store/auth.store";

import Logo from "../../../assets/images/Logo.svg";
import OrangeBox from "../../../assets/images/OrangeBox.png";

import "react-phone-input-2/lib/style.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginWithPassword, requestLoginOtp, loading } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validatePhone = () => {
    if (!phone) {
      toast.error("Phone number is required");
      return false;
    }
    if (phone.length < 10) {
      toast.error("Enter a valid phone number");
      return false;
    }

    if (!countryCode) {
      toast.error("Country code missing");
      return false;
    }
    return true;
  };

  const validatePasswordLogin = () => {
    if (!email) {
      toast.error("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Enter a valid email");
      return false;
    }
    if (!password) {
      toast.error("Password is required");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const getPurePhoneNumber = () => {
    if (!phone || !countryCode) return "";

    const dialCode = countryCode.replace("+", "");
    return phone.startsWith(dialCode) ? phone.slice(dialCode.length) : phone;
  };

  const handleOtpLogin = async (e) => {
    e.preventDefault();
    if (!validatePhone()) return;

    const phoneNumberOnly = getPurePhoneNumber();

    if (!phoneNumberOnly || phoneNumberOnly.length < 10) {
      toast.error("Enter a valid phone number");
      return;
    }

    try {
      await requestLoginOtp({
        phoneOrEmail: phoneNumberOnly,
        countryCode,
      });

      toast.success("OTP sent successfully");

      navigate("/Otp-Login-Code", {
        state: {
          phoneOrEmail: phoneNumberOnly,
          countryCode,
        },
      });
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Number not registered. Please sign up first."
      );
    }
  };

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    if (!validatePasswordLogin()) return;

    try {
      const res = await loginWithPassword({ email, password });

      toast.success(res.message);
      navigate("/overview");
    } catch (error) {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="login LoginOtpHome">
      <div className="login-box">
        <div className="logo-part">
          <img src={Logo} alt="Logo" />
        </div>

        <img src={OrangeBox} alt="" />

        <div className="login-headline">
          <h5>For Referral</h5>
          <p>Sign in to continue</p>
        </div>

        <Tab.Container defaultActiveKey="otp">
          <Nav fill className="gap-2 mt-4">
            <Nav.Item>
              <Nav.Link eventKey="otp" className="custom-tab">
                Login with OTP
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="password" className="custom-tab">
                Login with Password
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content className="mt-4">
            <Tab.Pane eventKey="otp">
              <form onSubmit={handleOtpLogin}>
                <label className="label">Phone Number</label>

                <PhoneInput
                  country="in"
                  value={phone}
                  onChange={(value, data) => {
                    setPhone(value);
                    setCountryCode(`+${data.dialCode}`);
                  }}
                  enableSearch
                  countryCodeEditable={false}
                  inputClass="form-control"
                  containerClass="phone-input-container"
                  // style={{ width: "460px" }}
                   inputStyle={{ width: "460px" }}
                />

                <div className="footer-login-pad">
                  <button className="btn-colored" disabled={loading}>
                    {loading ? "Sending OTP..." : "Login"}
                  </button>
                </div>
              </form>
            </Tab.Pane>

            <Tab.Pane eventKey="password">
              <form onSubmit={handlePasswordLogin}>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                  />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                  />
                  <span
                    className="eye-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                  </span>

                  <div className="forgot">
                    <Link to="/Forget-Password">Forgot Password?</Link>
                  </div>
                </div>

                <div className="footer-login-pad">
                  <button className="btn-colored" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </div>
              </form>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>

        <div className="footer-login mt-0">
          <h6>
            New User?
            <Link to="/Create-Account">
              <span> Create Account</span>
            </Link>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
