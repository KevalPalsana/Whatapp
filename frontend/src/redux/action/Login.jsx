import { apipost } from "../../helper/Api";
import Cookies from "js-cookie";


export const Login_success = 'LOGIN_SUCCESS';
export const Login_fail = 'LOGIN_FAIL';
export const Logout = 'LOGOUT';

export const login = (credentials) => async (dispatch) => {
  console.log('credentials', credentials)
  try {
    const response = await apipost("/user/login", credentials, false);
    console.log('response', response)
    Cookies.set("token", response.data.token); 
    localStorage.setItem("user", JSON.stringify(response.data.user));
    console.log('token', response.data.user)
    dispatch({ type: Login_success, payload:{token:response.data.token, user:response.data.user}});
    alert('Login successful');
  } catch (error) {
    dispatch({ type: Login_fail, payload: error.response.data.message });
    alert('Invalid User');
  }
};

export const logout = () => (dispatch) => {
  Cookies.remove("token");
  localStorage.removeItem("user");
  dispatch({ type: Logout });
};

