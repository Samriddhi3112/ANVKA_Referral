import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import PaymentHistory from "./PaymentHistory";
import MyEarnings from "./MyEarnings";

const ReferralEarnings = () => {
  return (
    <>

      <div className="WrapperArea">
        <div className="WrapperBox">
          <div className="TitleBox">
            <h4 className="Title">Referral Earning</h4>
            <div className="totalEarning">
              <p>Total Earning</p>
              <h2>$20,000.00</h2>
            </div>
          </div>

          <Tab.Container defaultActiveKey="payment">
            <div className="commonTabs">
              <Nav fill>
                <Nav.Item>
                  <Nav.Link eventKey="payment">Payment History</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="earning">My Earning</Nav.Link>
                </Nav.Item>
              </Nav>
            </div>

            <Tab.Content>
              <Tab.Pane eventKey="payment">
                <PaymentHistory />
              </Tab.Pane>

              <Tab.Pane eventKey="earning">
                <MyEarnings />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
    </>
  );
};

export default ReferralEarnings;
