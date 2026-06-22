import AppRoutes from "./app/router/routes";
import { Toaster } from "react-hot-toast";
import RouteTracker from "./app/router/RouteTracker";

const App = () => {
  return( 
  <>
  <RouteTracker />
  <AppRoutes />;
  <Toaster position="top-right" reverseOrder={false} />
  </>
  )
};

export default App;
