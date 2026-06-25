import React, { useEffect, useState } from "react";
import { useWithdrawalsStore } from "../store/withdrawals.store";
import Modal from "react-bootstrap/Modal";

const WithdrawalHistory = () => {
  const { withdrawals, getWithdrawals, total, page, limit, loading } =
    useWithdrawalsStore();
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);

  const handleViewDetails = (item) => {
    setSelectedWithdrawal(item);
    setShowDetailsModal(true);
  };

  useEffect(() => {
    getWithdrawals(1);
  }, []);

  const totalPages = Math.ceil(total / limit);

  const maskAccountNumber = (accountNumber) => {
  if (!accountNumber) return "-";

  const value = String(accountNumber);

  return value.length <= 4
    ? value
    : `XXXX XXXX ${value.slice(-4)}`;
};

const maskIFSC = (ifsc) => {
  if (!ifsc) return "-";

  const value = String(ifsc);

  return value.length <= 4
    ? value
    : `${value.slice(0, 4)}XXXX`;
};

const maskUpi = (upi) => {
  if (!upi) return "-";

  const value = String(upi);

  if (!value.includes("@")) return value;

  const [name, domain] = value.split("@");

  return `${name.slice(0, 2)}****@${domain}`;
};

  // const maskAccountNumber = (accountNumber = "") => {
  //   if (accountNumber.length <= 4) return accountNumber;
  //   return `XXXX XXXX ${accountNumber.slice(-4)}`;
  // };

  // const maskIFSC = (ifsc = "") => {
  //   if (ifsc.length <= 4) return ifsc;
  //   return `${ifsc.slice(0, 4)}XXXX`;
  // };

  // const maskUpi = (upi = "") => {
  //   if (!upi.includes("@")) return upi;

  //   const [name, domain] = upi.split("@");

  //   return `${name.slice(0, 2)}****@${domain}`;
  // };

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="TitleBox">
          <h4 className="Title">Withdrawal History</h4>
        </div>

        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Amount</th>
                <th>Fee</th>
                <th>Net Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    Loading...
                  </td>
                </tr>
              ) : withdrawals?.length > 0 ? (
                withdrawals.map((item) => (
                  <tr key={item._id}>
                    <td>
                      {item.currency} {item.amount}
                    </td>

                   

                    <td>
                      {item.currency} {item.feeAmount}
                    </td>

                     <td>
                      {item.currency} {item.netAmount}
                    </td>

                    <td>
                      <span
                        className={`badge ${
                          item.status === "approved"
                            ? "bg-success"
                            : item.status === "rejected"
                              ? "bg-danger"
                              : "bg-warning text-dark"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td>
                      {new Date(item.createdAt).toLocaleDateString("en-IN")}
                    </td>
                    <td>
                      <button
                        className="viewBtn"
                        onClick={() => handleViewDetails(item)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No withdrawal history found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-end mt-4">
            <ul className="pagination mb-0">
              <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => getWithdrawals(page - 1)}
                >
                  Previous
                </button>
              </li>

              {[...Array(totalPages)].map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${page === index + 1 ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => getWithdrawals(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}

              <li
                className={`page-item ${page === totalPages ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => getWithdrawals(page + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
      <Modal
        show={showDetailsModal}
        onHide={() => setShowDetailsModal(false)}
        centered
        dialogClassName="withdrawDetailModal"
      >
        <Modal.Header closeButton className="border-0 pb-0">
          <div>
            <h4 className="mb-1 fw-bold" >Withdrawal Details</h4>
            {/* <p className="text-muted mb-0">
              Request ID: #{selectedWithdrawal?._id?.slice(-8)}
            </p> */}
          </div>
        </Modal.Header>

        <Modal.Body>
          {selectedWithdrawal && (
            <>
              {/* Summary Cards */}
              <div className="withdrawSummary">
                <div className="summaryCard">
                  <span>Amount</span>
                  <h5>
                    {selectedWithdrawal.currency} {selectedWithdrawal.amount}
                  </h5>
                </div>

                <div className="summaryCard">
                  <span>Fee</span>
                  <h5>
                    {selectedWithdrawal.currency} {selectedWithdrawal.feeAmount}
                  </h5>
                </div>

                <div className="summaryCard">
                  <span>Net Amount</span>
                  <h5>
                    {selectedWithdrawal.currency} {selectedWithdrawal.netAmount}
                  </h5>
                </div>
              </div>

              {/* Withdrawal Details */}
              <div className="detailsGrid">
                <div className="infoCard">
                  <span>Status</span>

                  <div>
                    <strong style={{color:"orange"}}
                     
                    >
                      {selectedWithdrawal.status}
                    </strong>
                  </div>
                </div>

                <div className="infoCard">
                  <span>Requested On</span>
                  <strong>
                    {new Date(
                      selectedWithdrawal.requestedAt,
                    ).toLocaleDateString("en-IN")}
                  </strong>
                </div>

                <div className="infoCard">
                  <span>Processing Fee</span>
                  <strong>
                    {selectedWithdrawal.feeAmount} (
                    {selectedWithdrawal.feePercent}%)
                  </strong>
                </div>

                <div className="infoCard">
                  <span>Processed On</span>
                  <strong>
                    {selectedWithdrawal.processedAt
                      ? new Date(
                          selectedWithdrawal.processedAt,
                        ).toLocaleDateString("en-IN")
                      : "-"}
                  </strong>
                </div>
              </div>

              {/* Bank Details */}
              <div className="bankDetailCard">
                <h5>Bank Details</h5>

                <div className="detailsGrid">
                  <div className="infoCard">
                    <span>Account Holder</span>
                    <strong>
                      {selectedWithdrawal.bankDetails?.accountHolderName}
                    </strong>
                  </div>

                  <div className="infoCard">
                    <span>Bank Name</span>
                    <strong>{selectedWithdrawal.bankDetails?.bankName}</strong>
                  </div>

                  <div className="infoCard">
                    <span>Account Number</span>
                    <strong>
                      {maskAccountNumber(
                        selectedWithdrawal.bankDetails?.accountNumber,
                      )}
                    </strong>
                  </div>

                  <div className="infoCard">
                    <span>IFSC</span>
                    <strong>
                      {maskIFSC(selectedWithdrawal.bankDetails?.ifsc)}
                    </strong>
                  </div>

                  <div className="infoCard">
                    <span>UPI ID</span>
                    <strong>
                      {maskUpi(selectedWithdrawal.bankDetails?.upiId)}
                    </strong>
                  </div>
                </div>
              </div>
            </>
          )}
        </Modal.Body>

        <Modal.Footer className="border-0 pt-0">
          <button
            className="btn btn-outline-secondary"
            onClick={() => setShowDetailsModal(false)}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default WithdrawalHistory;
