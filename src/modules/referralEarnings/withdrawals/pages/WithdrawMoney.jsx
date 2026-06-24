import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import fundSuccessImg from "../../../../assets/images/fundsuccess.svg";
import { useWithdrawalsStore } from "../../withdrawals/store/withdrawals.store";
import { useWalletStore } from "../../wallet/store/wallet.store";

const WithdrawMoney = () => {
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [fundSuccess, setFundSuccess] = useState(false);

  const { createWithdrawal, loading } = useWithdrawalsStore();
  const { wallet, getWallet } = useWalletStore();

  useEffect(() => {
    getWallet();
  }, []);

  const handleContinue = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setAmountError("Please enter a valid amount.");
      return;
    }

    if (
      wallet?.available !== undefined &&
      Number(amount) > wallet.available
    ) {
      setAmountError("Amount exceeds available balance.");
      return;
    }

    setAmountError("");

    try {
      const res = await createWithdrawal({
        amount: Number(amount),
      });

      await getWallet();

      setTransactionId(
        res?.data?.transactionId ||
          res?.data?._id ||
          "—"
      );

      setFundSuccess(true);
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Withdrawal failed. Please try again.";

      setAmountError(errorMessage);
    }
  };

  const handleClose = () => {
    setFundSuccess(false);
    setAmount("");
    setTransactionId("");
  };

  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <div className="TitleBox">
            <h4 className="Title">My Balance</h4>

            <div className="totalEarning">
              <p className="mb-0">Total Earning</p>
              <h2>
                {wallet
                  ? `${wallet.currency} ${wallet.totalEarned?.toLocaleString(
                      "en-IN",
                      { minimumFractionDigits: 2 }
                    )}`
                  : "—"}
              </h2>
            </div>
          </div>

          <div className="advisorBox">
            <p>Available Balance</p>
            <h3>
              {wallet
                ? `${wallet.currency} ${wallet.available?.toLocaleString(
                    "en-IN",
                    { minimumFractionDigits: 2 }
                  )}`
                : "—"}
            </h3>
          </div>

          <div className="commonForm">
            <div className="form-group">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="mb-0">Withdraw Amount</h6>

                <Link
                  to="/referral-earnings/withdraw-money/withdrawal-history"
                  className="withdrawHistoryBtn btn btn-sm"
                >
                  View Withdrawal History
                </Link>
              </div>

              <input
                type="number"
                className={`form-control ${
                  amountError ? "is-invalid" : ""
                }`}
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);

                  if (amountError) {
                    setAmountError("");
                  }
                }}
                placeholder="Enter amount"
                min="1"
              />

              {amountError && (
                <div
                  className="invalid-feedback d-block"
                  style={{
                    fontSize: "13px",
                    marginTop: "5px",
                  }}
                >
                  {amountError}
                </div>
              )}
            </div>

            <button
              className="withdrawBtn"
              onClick={handleContinue}
              disabled={loading}
            >
              {loading ? "Processing..." : "Continue"}
            </button>
          </div>
        </div>
      </div>

      <Modal show={fundSuccess} onHide={handleClose}>
        <Modal.Body>
          <div className="fundSuccessFullyArea">
            <span>
              <img src={fundSuccessImg} alt="img" />
            </span>

            <h4>Withdrawal Successfully</h4>

            <p>
              #Transaction ID: {transactionId}
              <br />
              Your payment will be processed within 24–48
              hours.
            </p>

            <Link
              className="homeBtn"
              onClick={handleClose}
              to="/referral-earnings"
            >
              Home
            </Link>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default WithdrawMoney;