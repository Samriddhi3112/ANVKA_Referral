import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useBankDetailsStore } from "../store/bankDetails.store";
import { saveBankDetailsApi } from "../services/bankDetails.api";
import toast from "react-hot-toast";

// ─── Masking helpers ──────────────────────────────────────────────────────────
const maskAccountNumber = (val) => {
  if (!val) return "";
  if (val.length <= 4) return val;
  return "*".repeat(val.length - 4) + val.slice(-4);
};

const maskIfsc = (val) => {
  if (!val) return "";
  if (val.length <= 4) return val;
  return val.slice(0, 4) + "*".repeat(val.length - 4);
};

const BankDetails = () => {
  const { getBankDetails, loading } = useBankDetailsStore();

  const [form, setForm] = useState({
    accountHolderName: "",
    accountNumber: "",
    ifsc: "",
    bankName: "",
    upiId: "",
  });

  // Track which fields are focused (show actual value) vs blurred (show masked)
  const [focused, setFocused] = useState({
    accountNumber: false,
    ifsc: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await getBankDetails();
      const data = res?.data?.bankDetails || res?.bankDetails;
      if (data) {
        setForm({
          accountHolderName: data.accountHolderName || "",
          accountNumber: data.accountNumber || "",
          ifsc: data.ifsc || "",
          bankName: data.bankName || "",
          upiId: data.upiId || "",
        });
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFocus = (field) =>
    setFocused((prev) => ({ ...prev, [field]: true }));

  const handleBlur = (field) =>
    setFocused((prev) => ({ ...prev, [field]: false }));

  const handleUpdate = async () => {
    try {
      const hasBank = form.accountNumber && form.ifsc;
      const hasUpi = form.upiId;

      if (!hasBank && !hasUpi) {
        toast.error("Please provide either Account Number + IFSC OR UPI ID");
        return;
      }

      const res = await saveBankDetailsApi({ bankDetails: form });
      toast.success(res?.data?.message || "Bank details saved successfully");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to save bank details");
    }
  };

  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <div className="TitleBox">
            <h4 className="Title">Bank Details</h4>
          </div>

          <div className="commonForm">
            <form>
              <div className="row">

                <div className="col-lg-4">
                  <div className="form-group">
                    <h6>Bank Account Number</h6>
                    <input
                      type="text"
                      name="accountNumber"
                      className="form-control"
                      placeholder="Enter account number"
                      value={
                        focused.accountNumber
                          ? form.accountNumber
                          : maskAccountNumber(form.accountNumber)
                      }
                      onChange={handleChange}
                      onFocus={() => handleFocus("accountNumber")}
                      onBlur={() => handleBlur("accountNumber")}
                    />
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="form-group">
                    <h6>Account Holder Name</h6>
                    <input
                      type="text"
                      name="accountHolderName"
                      className="form-control"
                      placeholder="Enter name"
                      value={form.accountHolderName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="form-group">
                    <h6>IFSC Code</h6>
                    <input
                      type="text"
                      name="ifsc"
                      className="form-control"
                      placeholder="Enter IFSC"
                      value={
                        focused.ifsc
                          ? form.ifsc
                          : maskIfsc(form.ifsc)
                      }
                      onChange={handleChange}
                      onFocus={() => handleFocus("ifsc")}
                      onBlur={() => handleBlur("ifsc")}
                    />
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="form-group">
                    <h6>Bank Name</h6>
                    <input
                      type="text"
                      name="bankName"
                      className="form-control"
                      placeholder="Enter bank name"
                      value={form.bankName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="form-group">
                    <h6>UPI ID</h6>
                    <input
                      type="text"
                      name="upiId"
                      className="form-control"
                      placeholder="Enter UPI ID"
                      value={form.upiId}
                      onChange={handleChange}
                    />
                  </div>
                </div>

              </div>
            </form>

            <div className="text-end">
              <Link to="/referral-earnings" className="Button Start me-2">
                Cancel
              </Link>

              <button
                type="button"
                className="Button"
                onClick={handleUpdate}
                disabled={loading}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BankDetails;