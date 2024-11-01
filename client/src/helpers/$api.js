// // import axios from "axios";
// // import Cookies from "js-cookie";
// // const AccessToken = Cookies.get("token");
// // const bodyParameters = {
// //   key: "value",
// // };
// // let config = {
// //   headers: { Authorization: `Bearer  ${Cookies.get("token")}` },
// // };
// // const api = axios.create({
// //   baseURL: "http://localhost:3000/api/v1/",
// //   headers: {
// //     Authorization: `Bearer  ${Cookies.get("token")}`,
// //   },

// //   bodyParameters,
// // });

// // export default api;
// import Cookies from "js-cookie";
// import axios from "axios";
// import api, { API_URL } from "./api";

// const $api = axios.create({
//   withCredentials: true,
//   baseURL: `http://localhost:3000/api/v1/`,
// });

// $api.interceptors.request.use((config) => {
//   config.headers.Authorization = `Bearer ${Cookies.get("token")}`;
//   return config;
// });

// $api.interceptors.response.use(
//   (config) => {
//     return config;
//   },
//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       error.response.status === 401 &&
//       error.config &&
//       !error.config._isRetry
//     ) {
//       originalRequest._isRetry = true;

//       try {
//         const { data } = await api.get("auth/refresh");
//         Cookies.set("token", data.accessToken);
//         return $api.request(originalRequest);
//       } catch (error) {
//         console.log("Not authorized");
//       }
//     }

//     throw error;
//   }
// );

// export default $api;
