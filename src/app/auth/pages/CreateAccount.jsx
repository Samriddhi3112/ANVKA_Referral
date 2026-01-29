import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/auth.store";
import DpUpload from "../../../assets/images/DpUpload.png";
import Logo from "../../../assets/images/Logo.svg";
import "react-phone-input-2/lib/style.css";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const CreateAccount = () => {
  const navigate = useNavigate();
  const {
    uploadedProfileUrl,
    uploadProfilePic,
    registerReferral,
    loading,
    setProfilePic,
    profilePic: selectedProfilePic,
  } = useAuthStore();
  const { resetProfileImage } = useAuthStore();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    countryCode: "+91",
    agree: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // const [profilePic, setProfilePic] = useState(null);
  useEffect(() => {
    resetProfileImage();
  }, [resetProfileImage]);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const validate = () => {
    if (!form.fullName.trim()) {
      toast.error("Full name is required");
      return false;
    }

    if (!form.phone) {
      toast.error("Phone number is required");
      return false;
    }

    if (!/^\d{7,15}$/.test(form.phone)) {
      toast.error("Enter a valid phone number");
      return false;
    }

    if (!form.email) {
      toast.error("Email is required");
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      toast.error("Invalid email address");
      return false;
    }

    if (!form.password) {
      toast.error("Password is required");
      return false;
    }

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    if (!form.agree) {
      toast.error("Please accept Terms & Conditions");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // if (!uploadedProfileUrl) {
    //   toast.error("Please upload profile picture");
    //   return;
    // }

    const payload = {
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      countryCode: form.countryCode,
      password: form.password,
      profilePicture: uploadedProfileUrl,
    };

    try {
      await registerReferral(payload);
      toast.success("Account created successfully");
      navigate("/");
    } catch (err) {
      const message =
        err?.message ||
        err?.error ||
        err?.response?.data?.message ||
        "Registration failed";

      toast.error(message);
    }
  };

  return (
    <div className="long-height">
      <div className="login">
        <div className="login-box">
          <div className="logo-part">
            <figure>
              <img src={Logo} alt="Logo" />
            </figure>
          </div>

          <div className="avatar-box">
            <figure className="avatar-figure">
              <label htmlFor="profileUpload" className="avatar-label">
                <img
                  src={
                    selectedProfilePic
                      ? URL.createObjectURL(selectedProfilePic)
                      : uploadedProfileUrl || DpUpload
                  }
                  key={selectedProfilePic || uploadedProfileUrl || "default"}
                  className="profile-pic"
                  alt="Profile Upload"
                />
                {/* ✎ */}
                <span className="plus-icon">+</span>
                <input
                  id="profileUpload"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (!file) return;

                    setProfilePic(file);

                    try {
                      const url = await uploadProfilePic(file);
                      toast.success("Profile picture uploaded!");
                      console.log("Uploaded URL:", url);
                    } catch {
                      toast.error("Image upload failed");
                    }
                  }}
                />
              </label>
            </figure>

            {/* <button
              className="upload-btn"
              onClick={uploadProfilePic}
              disabled={loading}
            >
              {loading ? "Uploading..." : "Upload"}
            </button> */}
          </div>

          <div className="login-headline">
            <h5>Join Med Referral</h5>
            <p>Create your account</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="label">
                    Full Name <sup style={{ color: "#fc3636" }}>*</sup>
                  </label>
                  <input
                    name="fullName"
                    className="form-control"
                    placeholder="Enter your full name"
                    value={form.fullName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="label">
                    Phone Number <sup style={{ color: "#fc3636" }}>*</sup>
                  </label>

                  <PhoneInput
                    country="in"
                    enableSearch
                    value={`${form.countryCode.replace("+", "")}${form.phone}`}
                    onChange={(value, country) => {
                      const dialCode = country.dialCode || "";
                      setForm({
                        ...form,
                        countryCode: `+${dialCode}`,
                        phone: value.slice(dialCode.length),
                      });
                    }}
                    inputProps={{
                      name: "phone",
                      required: true,
                    }}
                    inputClass="form-control phone-input"
                    containerClass="phone-container"
                    buttonClass="phone-flag-btn"
                    countryCodeEditable={false}
                  />
                </div>
              </div>

              <div className="col-sm-12">
                <div className="form-group">
                  <label className="label">
                    Email <sup style={{ color: "#fc3636" }}>*</sup>
                  </label>
                  <input
                    name="email"
                    className="form-control"
                    placeholder="Enter your email id"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="label">
                    Password <sup style={{ color: "#fc3636" }}>*</sup>
                  </label>
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Enter password"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                  />
                  <span
                    className="eye-icons"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                  </span>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="label">
                    Confirm Password <sup style={{ color: "#fc3636" }}>*</sup>
                  </label>
                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Confirm your password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                  />
                  <span
                    className="eye-icons"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <IoEyeOffOutline />
                    ) : (
                      <IoEyeOutline />
                    )}
                  </span>
                </div>
              </div>

              <div className="col-sm-12">
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    name="agree"
                    checked={form.agree}
                    onChange={handleChange}
                  />
                  <p>
                    I agree to the <a href="#">Terms of Service</a> and{" "}
                    <a href="#">Privacy Policy</a>.
                  </p>
                </div>
              </div>
            </div>

            <div className="footer-login my-4">
              <button type="submit" className="btn-colored" disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </button>

              <h6 className="mt-4 anchorstyle">
                Already have an account?{" "}
                <Link to="/">
                  <span>Sign In</span>
                </Link>
              </h6>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
