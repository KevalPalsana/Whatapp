import { Login_success, Login_fail, Logout } from '../action/Login';
import Cookies from 'js-cookie';


const initialState = {
    token: Cookies.get("token") || null,
    isAuth: false,
    user: null,
  };
  console.log('initialState', initialState)
  
  const loginReducer = (state = initialState, action) => {
    switch (action.type) {
      case Login_success:
        return {
          ...state,
          token: action.payload.token,
          user: action.payload.user,
          isAuth: true,
        };
      case Logout:
      case Login_fail:
        return {
          ...state,
          token: null,
          user: null,
          isAuth: false,
        };
      default:
        return state;
    }
  };
  
  export default loginReducer;