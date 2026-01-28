import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProfileStore } from "../store/profile.store";
import PhoneInput from "react-phone-input-2";
import toast from "react-hot-toast";

const EditFacilitatorInformation = () => {
  const navigate = useNavigate();
  const { user, fetchProfile, updateProfile } = useProfileStore();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    countryCode: "",
    email: "",
  });
  useEffect(() => {
    if (user?.data?.referral) {
      const referral = user.data.referral;

      setFormData({
        fullName: referral.fullName || "",
        phone: referral.phone || "",
        countryCode: referral.countryCode || "+91",
        email: referral.email || "",
      });
    }
  }, [user]);

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (user?.data?.referral) {
      const referral = user.data.referral;
      setFormData({
        fullName: referral.fullName || "",
        phone: referral.phone || "",
        countryCode: referral.countryCode || "",
        email: referral.email || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
  try {
    const res = await updateProfile(formData);

    if (res?.success) {
      toast.success(res.message || "Profile updated successfully");
      navigate("/profile");
    }
  } catch (err) {
    const errorMessage =
      err?.response?.data?.message ||
      err?.message ||
      "Something went wrong";

    toast.error(errorMessage);
  }
};

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="TitleBox">
          <h4 className="Title">Edit Referral Information</h4>
        </div>

        <div className="commonForm mb-0">
          <div className="row">
            <div className="col-lg-6">
              <div className="form-group">
                <h6>Name</h6>
                <input
                  type="text"
                  className="form-control"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group">
                <h6>Contact Number</h6>

                <div className="d-flex gap-2">
                  <div className="edit-profile-phone" style={{width:"100%"}}>
                    <PhoneInput
                      country="in"
                      value={`${formData.countryCode}${formData.phone}`}
                      onChange={(value, data) => {
                        const dialCode = data.dialCode;

                        setFormData((prev) => ({
                          ...prev,
                          countryCode: `+${dialCode}`,
                          phone: value.replace(dialCode, ""),
                        }));
                      }}
                      enableSearch
                      countryCodeEditable={false}
                      inputClass="phone-input"
                      buttonClass="phone-button"
                      containerClass="phone-container"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="form-group">
                <h6>Email</h6>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="text-end mt-3">
          <button
            className="Button Start me-2 px-5"
            onClick={() => navigate("/profile")}
          >
            Back
          </button>
          <button className="Button px-5" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditFacilitatorInformation;
