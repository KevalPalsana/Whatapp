import { apipost } from "../../helper/Api";
import Cookies from "js-cookie";


export const Register_success = 'REGISTER_SUCCESS';
export const Register_fail = 'REGISTER_FAIL';




export const registeruser = (userdata) => async (dispatch) => {
    console.log('userdata', userdata)
    for (let [key, value] of userdata.entries()) {
        console.log(`${key}: ${value}`);
      }
    try {
        const data = await apipost("/user/register", userdata, true);
        Cookies.set("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        console.log('settoken', data.data.token)
        dispatch({ type: Register_success, payload: {token:data.data.token, user:data.data.user}});
        alert('Register Successful');
        } catch (error) {
            dispatch({ type: Register_fail, payload: error.data });
            alert("email already registered");
        }
    };


 