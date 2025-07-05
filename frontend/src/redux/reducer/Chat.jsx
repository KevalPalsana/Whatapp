import { GET_MESSAGES, SEND_MESSAGE, DELETE_MESSAGE, UPDATE_MESSAGE_SEEN_SUCCESS } from '../action/Chat';

const initialState = {
  messages: [],
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES:
      return {
         ...state, messages: action.payload 
        };
    case SEND_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case DELETE_MESSAGE:
      return {
        ...state,
        messages: state.messages.filter((msg) => msg._id !== action.payload),
      }
      case UPDATE_MESSAGE_SEEN_SUCCESS:
      return {
        ...state,
        messages: state.messages.map((msg) =>
          msg._id === action.payload ? { ...msg, status: action.payload.status } : msg
        ),
      };
    default:
      return state;
  }
};

export default chatReducer;
