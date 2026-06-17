import React, { useEffect, useState, useRef } from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import bankdetails2 from "../../../assets/images/bankdetails2.svg";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import cart from "../../../assets/images/cart.svg";
import { Link } from "react-router-dom";
import { useWalletStore } from "../wallet/store/wallet.store";

// ─── Pagination ───────────────────────────────────────────────────────────────
const Pagination = ({ currentPage, total, limit, onPageChange }) => {
  const totalPages = Math.ceil(total / limit);
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const half = 2;
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + 4);
    if (end - start < 4) start = Math.max(1, end - 4);
    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <div className="Paginations">
      <label>&nbsp;</label>
      <ul>
        {getPageNumbers().map((page) => (
          <li key={page}>
            <button
              className={currentPage === page ? "active" : ""}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
      <button
        className="nextBtn"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next <MdKeyboardArrowRight />
      </button>
    </div>
  );
};

// ─── Filter Dropdown ──────────────────────────────────────────────────────────
const FILTER_OPTIONS = [
  { label: "All", value: "" },
  { label: "Commission", value: "commission" },
  { label: "Withdrawal", value: "withdrawal" },
  { label: "Reversal", value: "reversal" },
];

const FilterDropdown = ({ selectedType, onSelect }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectedLabel =
    FILTER_OPTIONS.find((o) => o.value === selectedType)?.label || "All";

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "7px 14px",
          fontSize: "13px",
          fontWeight: "500",
          color: "#444",
          background: "#fff",
          border: "1px solid #ddd",
          borderRadius: "8px",
          cursor: "pointer",
          whiteSpace: "nowrap",
          transition: "border-color 0.15s",
        }}
      >
        {selectedLabel}
        <MdKeyboardArrowDown
          style={{
            fontSize: "16px",
            transition: "transform 0.2s",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>

      {open && (
        <ul
          style={{
            position: "absolute",
            right: 0,
            top: "calc(100% + 6px)",
            background: "#fff",
            border: "1px solid #e8e8e8",
            borderRadius: "10px",
            minWidth: "140px",
            zIndex: 100,
            padding: "5px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
            listStyle: "none",
            margin: 0,
          }}
        >
          {FILTER_OPTIONS.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {
                onSelect(opt.value);
                setOpen(false);
              }}
              style={{
                padding: "8px 12px",
                borderRadius: "7px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: selectedType === opt.value ? "500" : "400",
                color: selectedType === opt.value ? "#d97b3a" : "#444",
                background:
                  selectedType === opt.value ? "#FEF4EB" : "transparent",
                transition: "background 0.12s",
              }}
              onMouseEnter={(e) => {
                if (selectedType !== opt.value)
                  e.currentTarget.style.background = "#f5f5f5";
              }}
              onMouseLeave={(e) => {
                if (selectedType !== opt.value)
                  e.currentTarget.style.background = "transparent";
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const ReferralEarnings = () => {
  const {
    wallet,
    earnings,
    earningsMeta,
    loading,
    getWallet,
    getEarnings,
    clearEarnings,
  } = useWalletStore();

  const [activeTab, setActiveTab] = useState("first");
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    getWallet();
  }, []);

  useEffect(() => {
    if (activeTab === "first") {
      // Payment History — type null, sab data aayega
      getEarnings("payment_history", 1, "");
    } else {
      // My Earning — filterType se filter hoga
      getEarnings("my_earning", 1, filterType);
    }
  }, [activeTab, filterType]);

  const handleTabSelect = (key) => {
    clearEarnings();
    setFilterType("");
    setActiveTab(key);
  };

  const handlePageChange = (page) => {
    if (activeTab === "first") {
      getEarnings("payment_history", page, "");
    } else {
      getEarnings("my_earning", page, filterType);
    }
  };

  const renderList = (colorClass) => {
    if (loading) return <p className="text-center py-3">Loading...</p>;
    if (!earnings?.length)
      return <p className="text-center py-3">No records found.</p>;

    return (
      <ul>
        {earnings.map((item, index) => {
          const isDebit = item.type === "withdrawal" || item.type === "reversal";
          const prefix = isDebit ? "-" : "+";
          const amountClass = isDebit ? "red" : "green";

          return (
            <li key={index} className={amountClass}>
              <span>
                <img src={cart} alt="img" />
              </span>
              <figcaption>
                <h5>{item.description || item.type || "—"}</h5>
                <p>
                  <small>#{item._id?.slice(-8).toUpperCase()}</small>
                  <small>
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString("en-IN")
                      : "—"}
                  </small>
                </p>
              </figcaption>
              <h6>
                {prefix}{wallet?.currency} {item.amount?.toFixed(2)}
              </h6>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="TitleBox">
          <h4 className="Title">Referral Earning</h4>
          <div className="totalEarning">
            <p className="mb-0">Total Earning</p>
            <h2>
              {wallet
                ? `${wallet.currency} ${wallet.totalEarned?.toLocaleString(
                    "en-IN",
                    { minimumFractionDigits: 2 }
                  )}`
                : loading
                ? "Loading..."
                : "—"}
            </h2>
          </div>
        </div>

        <Tab.Container
          id="left-tabs-example"
          defaultActiveKey="first"
          onSelect={handleTabSelect}
        >
          <div className="commonTabs">
            <Nav fill>
              <Nav.Item>
                <Nav.Link as={Link} to="#" eventKey="first">
                  Payment History
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="#" eventKey="second">
                  My Earning
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>

          <Tab.Content>
            {/* Payment History */}
            <Tab.Pane eventKey="first">
              <Link to="/referral-earnings/bank-details">
                <div className="bankDetailsBox">
                  <img src={bankdetails2} alt="img" />
                  <figcaption>
                    <h5>Bank Details</h5>
                    <p>Manage your payout information</p>
                  </figcaption>
                  <MdKeyboardArrowRight />
                </div>
              </Link>

              <div className="lastTransactions">
                <div className="header">
                  <h4>Last Transaction</h4>
                </div>
                {renderList()}
              </div>

              <Pagination
                currentPage={earningsMeta.page}
                total={earningsMeta.total}
                limit={earningsMeta.limit}
                onPageChange={handlePageChange}
              />
            </Tab.Pane>

            {/* My Earning */}
            <Tab.Pane eventKey="second">
              <div className="row">
                <div className="col-lg-6">
                  <div className="advisorBox">
                    <p>Advisor Service Fee</p>
                    <h3>
                      {"—"}
                      {/* {wallet ? `${wallet.withdrawalFeePercent ?? 0}%` : "—"} */}
                    </h3>
                  </div>
                </div>
                <div className="col-lg-6">
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
                </div>
              </div>

              <Link className="withdrawBtn" to="/registered-patients/withdraw-money">
                Withdraw Money
              </Link>

              <div className="lastTransactions">
                <div className="header">
                  <h4>Earnings Summary</h4>
                  <FilterDropdown
                    selectedType={filterType}
                    onSelect={setFilterType}
                  />
                </div>
                {renderList()}
              </div>

              <Pagination
                currentPage={earningsMeta.page}
                total={earningsMeta.total}
                limit={earningsMeta.limit}
                onPageChange={handlePageChange}
              />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </div>
  );
};

export default ReferralEarnings;