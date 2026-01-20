import AppRoutes from "./app/router/routes";
import { Toaster } from "react-hot-toast";

const App = () => {
  return( 
  <><AppRoutes />;
  <Toaster position="top-right" reverseOrder={false} />
  </>
  )
};

export default App;
