import { apiget } from "../../helper/Api";


export const Get_task = 'GET_TASK';




export const gettask = () => async (dispatch) => {
    try {
        const response = await apiget(`/user/get`);
        dispatch({ type: Get_task, payload: response });
        } catch (error) {
          console.error('Network error:', error);
        }
  };