import React from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import bankdetails2 from "../../../assets/images/bankdetails2.svg";
import { MdKeyboardArrowRight } from "react-icons/md";
import cart from "../../../assets/images/cart.svg";
import filter from "../../../assets/images/filter.svg";
import { Link } from "react-router-dom";

const ReferralEarnings = () => {
  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <div className="TitleBox">
            <h4 className="Title">Referral Earning</h4>
            <div className="totalEarning">
              <p className="mb-0">Total Earning</p>
              <h2>$20,000.00</h2>
            </div>
          </div>

          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
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
              <Tab.Pane eventKey="first">
                <Link to="/bank-details">
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
                    <button type="button" className="filterBtn">
                      <img src={filter} alt="img" /> Filter
                    </button>
                  </div>

                  <ul>
                    <li className="green">
                      <span>
                        <img src={cart} alt="img" />
                      </span>
                      <figcaption>
                        <h5>Mohan</h5>
                        <p>
                          <small>#12225111</small>
                          <small>14/06/2025</small>
                        </p>
                      </figcaption>
                      <h6>+$750.50</h6>
                    </li>

                    <li className="green">
                      <span>
                        <img src={cart} alt="img" />
                      </span>
                      <figcaption>
                        <h5>Mohan</h5>
                        <p>
                          <small>#12225111</small>
                          <small>14/06/2025</small>
                        </p>
                      </figcaption>
                      <h6>+$750.50</h6>
                    </li>

                    <li className="green">
                      <span>
                        <img src={cart} alt="img" />
                      </span>
                      <figcaption>
                        <h5>Mohan</h5>
                        <p>
                          <small>#12225111</small>
                          <small>14/06/2025</small>
                        </p>
                      </figcaption>
                      <h6>+$750.50</h6>
                    </li>

                    <li className="green">
                      <span>
                        <img src={cart} alt="img" />
                      </span>
                      <figcaption>
                        <h5>Mohan</h5>
                        <p>
                          <small>#12225111</small>
                          <small>14/06/2025</small>
                        </p>
                      </figcaption>
                      <h6>+$750.50</h6>
                    </li>

                    <li className="green">
                      <span>
                        <img src={cart} alt="img" />
                      </span>
                      <figcaption>
                        <h5>Mohan</h5>
                        <p>
                          <small>#12225111</small>
                          <small>14/06/2025</small>
                        </p>
                      </figcaption>
                      <h6>+$750.50</h6>
                    </li>

                    <li className="green">
                      <span>
                        <img src={cart} alt="img" />
                      </span>
                      <figcaption>
                        <h5>Mohan</h5>
                        <p>
                          <small>#12225111</small>
                          <small>14/06/2025</small>
                        </p>
                      </figcaption>
                      <h6>+$750.50</h6>
                    </li>
                  </ul>
                </div>

                <div className="Paginations">
                  <label>&nbsp;</label>
                  <ul>
                    <li>
                      <button className="active">1</button>
                    </li>
                    <li>
                      <button>2</button>
                    </li>
                    <li>
                      <button>3</button>
                    </li>
                    <li>
                      <button>4</button>
                    </li>
                    <li>
                      <button>5</button>
                    </li>
                  </ul>

                  <button className="nextBtn">
                    Next <MdKeyboardArrowRight />
                  </button>
                </div>
              </Tab.Pane>

              <Tab.Pane eventKey="second">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="advisorBox">
                      <p>Advisor Service Fee</p>
                      <h3>$ 55.00</h3>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="advisorBox">
                      <p>Available Balance</p>
                      <h3>$ 215.00</h3>
                    </div>
                  </div>
                </div>

                <Link className="withdrawBtn" to="/withdraw-money">
                  Withdraw Money
                </Link>

                <div className="lastTransactions">
                  <div className="header">
                    <h4>Earnings Summary</h4>
                    <button type="button" className="filterBtn">
                      <img src={filter} alt="img" /> Filter
                    </button>
                  </div>

                  <ul>
                    <li className="red">
                      <span>
                        <img src={cart} alt="img" />
                      </span>
                      <figcaption>
                        <h5>Mohan</h5>
                        <p>
                          <small>#12225111</small>
                          <small>14/06/2025</small>
                        </p>
                      </figcaption>
                      <h6>-$750.50</h6>
                    </li>

                    <li className="red">
                      <span>
                        <img src={cart} alt="img" />
                      </span>
                      <figcaption>
                        <h5>Mohan</h5>
                        <p>
                          <small>#12225111</small>
                          <small>14/06/2025</small>
                        </p>
                      </figcaption>
                      <h6>-$750.50</h6>
                    </li>

                    <li className="red">
                      <span>
                        <img src={cart} alt="img" />
                      </span>
                      <figcaption>
                        <h5>Mohan</h5>
                        <p>
                          <small>#12225111</small>
                          <small>14/06/2025</small>
                        </p>
                      </figcaption>
                      <h6>-$750.50</h6>
                    </li>

                    <li className="red">
                      <span>
                        <img src={cart} alt="img" />
                      </span>
                      <figcaption>
                        <h5>Mohan</h5>
                        <p>
                          <small>#12225111</small>
                          <small>14/06/2025</small>
                        </p>
                      </figcaption>
                      <h6>-$750.50</h6>
                    </li>

                    <li className="red">
                      <span>
                        <img src={cart} alt="img" />
                      </span>
                      <figcaption>
                        <h5>Mohan</h5>
                        <p>
                          <small>#12225111</small>
                          <small>14/06/2025</small>
                        </p>
                      </figcaption>
                      <h6>-$750.50</h6>
                    </li>

                    <li className="red">
                      <span>
                        <img src={cart} alt="img" />
                      </span>
                      <figcaption>
                        <h5>Mohan</h5>
                        <p>
                          <small>#12225111</small>
                          <small>14/06/2025</small>
                        </p>
                      </figcaption>
                      <h6>-$750.50</h6>
                    </li>
                  </ul>
                </div>

                <div className="Paginations">
                  <label>&nbsp;</label>
                  <ul>
                    <li>
                      <button className="active">1</button>
                    </li>
                    <li>
                      <button>2</button>
                    </li>
                    <li>
                      <button>3</button>
                    </li>
                    <li>
                      <button>4</button>
                    </li>
                    <li>
                      <button>5</button>
                    </li>
                  </ul>

                  <button className="nextBtn">
                    Next <MdKeyboardArrowRight />
                  </button>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
    </>
  );
};

export default ReferralEarnings;