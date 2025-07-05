import { Register_success, Register_fail } from '../action/Register';
import Cookies from 'js-cookie';

const initialState = {
  userdata: [],
  token: Cookies.get("token"),
  isAuth: false,
};
console.log('initialState', initialState)
const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case Register_success:
      return {
        ...state,
        userdata: [...state.userdata, action.payload],
        token: action.payload.token,
        isAuth: true,
      };

    case Register_fail:
      return {
        ...state,
        userdata: [...state.userdata, action.payload],
        token: null,
        isAuth: false,
      };


    default:
      return state;
  }
};


export default registerReducer;
