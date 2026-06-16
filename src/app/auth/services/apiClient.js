
// import axios from "axios";

// export const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = sessionStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const message =
//       error?.response?.data?.message ||
//       error?.message ||
//       "Something went wrong";

//     return Promise.reject({
//       message,
//       status: error?.response?.status,
//     });
//   }
// );

// export default axiosInstance;
//----------------------------------
import axios from "axios";
import toast from "react-hot-toast";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      const token = sessionStorage.getItem("token");

      // Sirf tab redirect karo jab user already logged in ho
      // Login attempt pe 401 = wrong credentials, session expire nahi
      if (token) {
        sessionStorage.removeItem("token");
        toast.error("Session expired. Please login again.");
        setTimeout(() => {
          // window.location.replace(window.location.origin + "/ANVKA/referral/");
          window.location.replace(import.meta.env.BASE_URL);
        }, 1000);
      }
    }

    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";

    return Promise.reject({ message, status });
  }
);

export default axiosInstance;
//fine
// import axios from "axios";
// import toast from "react-hot-toast";

// export const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = sessionStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const status = error?.response?.status;

//     if (status === 401) {
//       sessionStorage.removeItem("token");
//       toast.error("Session expired. Please login again.");
//       setTimeout(() => {
//        window.location.replace(import.meta.env.VITE_LOGIN_URL);
//       }, 1000);
//     }

//     const message =
//       error?.response?.data?.message ||
//       error?.message ||
//       "Something went wrong";

//     return Promise.reject({ message, status });
//   }
// );

// export default axiosInstance;
//-------------------------------------------
//previous
// import axios from "axios";

// export const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = sessionStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const status = error?.response?.status;

//     // Token expired / unauthorized — auto logout
//     if (status === 401) {
//       sessionStorage.removeItem("token");
//       sessionStorage.removeItem("user");

//       // ProtectedRoutes is listening to this event
//       window.dispatchEvent(new Event("auth:logout"));
//     }

//     const message =
//       error?.response?.data?.message ||
//       error?.message ||
//       "Something went wrong";

//     return Promise.reject({
//       message,
//       status,
//     });
//   }
// );

// export default axiosInstance;