import { loginStart, loginSuccess, loginFailure } from "./userSlice";
import { publicRequest } from "../../utilities/requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("auth/login", user);
    dispatch(loginSuccess(res.data));
    console.log(res.data.accessToken);
  } catch (error) {
    dispatch(loginFailure());
  }
};
