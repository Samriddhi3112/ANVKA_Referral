
// import { Outlet, Navigate } from "react-router-dom";

// const ProtectedRoutes = () => {
//   const token = sessionStorage.getItem("token");

//   return token ? <Outlet /> : <Navigate to="/" replace />;
// };

// export default ProtectedRoutes;

import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedRoutes = () => {
  const [token, setToken] = useState(() => sessionStorage.getItem("token"));

  useEffect(() => {
    // Sirf same-tab auth:logout event suno
    // storage event NAHI — woh cross-tab logout karta tha
    const handleLogout = () => {
      setToken(null);
    };

    window.addEventListener("auth:logout", handleLogout);

    return () => {
      window.removeEventListener("auth:logout", handleLogout);
    };
  }, []);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;

// import { Outlet, Navigate } from "react-router-dom";
// import { useEffect, useState } from "react";

// const ProtectedRoutes = () => {
//   // useState se react re-render trigger hoga jab token change ho
//   const [token, setToken] = useState(() => sessionStorage.getItem("token"));

//   useEffect(() => {
//     // Storage event — agar doosre tab mein logout ho
//     const handleStorageChange = () => {
//       setToken(sessionStorage.getItem("token"));
//     };

//     window.addEventListener("storage", handleStorageChange);

//     // Custom event — same tab mein logout ke liye
//     window.addEventListener("auth:logout", handleStorageChange);

//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//       window.removeEventListener("auth:logout", handleStorageChange);
//     };
//   }, []);

//   if (!token) {
//     return <Navigate to="/" replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoutes;