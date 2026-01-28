import { Outlet } from "react-router-dom";
import Sidenav from "./SideNav";
import Header from "./Header";

const AppLayout = () => {
  return (
    <div className="AppLayout">
      <Sidenav />

      <div className="MainWrapper">
        <Header />
        <main className="ContentArea">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
