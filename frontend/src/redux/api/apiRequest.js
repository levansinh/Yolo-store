import { loginFailed, loginStart, loginSuccess,registerStart ,registerFailed,registerSuccess,logOutStart,logOutSuccess,logOutFailed} from "../auth/authSlice";

import {} from "../users/userSlice";

import instance from "../../configs/config";

export const loginUser = async (user, dispatch, navigate) => {
  try {
    dispatch(loginStart());
    const res = await instance.post("/auth/login", user);
console.log(user);
    dispatch(loginSuccess(res.data));
    if (res.data.account.role === "Admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
    localStorage.setItem("accessToken", res.data.accessToken);
    return res;
  } catch (err) {
    dispatch(loginFailed());
  }
};
export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
      const res = await instance.post('auth/register', user);
      dispatch(registerSuccess());
      navigate('/auth');
      return res;
  } catch (err) {
      dispatch(registerFailed());
  }
};
export const logOut = async (dispatch, navigate) => {
  dispatch(logOutStart());
  try {
      dispatch(logOutSuccess());
      navigate('/auth');
  } catch (err) {
      dispatch(logOutFailed());
  }
};