import axios from "axios";
import jwt_decode from "jwt-decode";
const instance = axios.create({ baseURL: "http://localhost:5000/v1/api" });
const refreshToken = async () => {
  try {
      const res = await instance.post("/v1/auth/refresh", {
          withCredentials: true,
      });
      return res.data;
  } catch (err) {
      console.log(err);
  }
};

export const createAxios = (user, dispatch, stateSuccess) => {
  instance.interceptors.request.use(
      async (config) => {
          let date = new Date();
          const decodedToken = jwt_decode(user?.accessToken);
          if (decodedToken.exp < date.getTime() / 1000) {
              const data = await refreshToken();
              const refreshUser = {
                  ...user,
                  accessToken: data.accessToken,
              };
              dispatch(stateSuccess(refreshUser));
              config.headers["token"] = "Bearer " + data.accessToken;
          }
          return config;
      },
      (err) => {
          return Promise.reject(err);
      }
  );
    }

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instance;
