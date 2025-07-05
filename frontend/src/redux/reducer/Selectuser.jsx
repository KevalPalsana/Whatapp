import { SET_SELECTED_USER } from "../action/Selectuser";

const initialState = {
  selectedUser: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_USER:
      return {
        ...state,
        selectedUser: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
