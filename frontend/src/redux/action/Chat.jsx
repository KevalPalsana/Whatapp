import { apipost, apidelete, apiput } from "../../helper/Api";

export const GET_MESSAGES = 'GET_MESSAGES';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';
export const UPDATE_MESSAGE_SEEN_SUCCESS = 'UPDATE_MESSAGE_SEEN_SUCCESS'

export const sendMessages = (senderid, receiverid, message) => async (dispatch) => {
  try {
    const res = await apipost('/message/send', { senderid, receiverid, message });
    console.log('res.data.data', res.data)
    dispatch({type: SEND_MESSAGE,payload: res.data,});
    return res.data;
  } catch (error) {
    console.error(error);
  }
};


export const getMessages = (messageData) => async (dispatch) => {
  try {
    const res = await apipost('/message/get', messageData);
    dispatch({type: GET_MESSAGES,payload: res.data.conversation.message,});
  } catch (error) {
    console.error("Get Message Error:", error.response?.data || error.message); 
  }
};

export const deletemessage = (messageid) => async (dispatch) => {
  try {
      const res = await apidelete(`/message/delete/${messageid}`)
      console.log('res', res)
      dispatch({
        type: DELETE_MESSAGE,
        payload: messageid
      });
  } catch (error) {
    console.error('Network error:', error);
  }
};


export const updateMessageSeen = (messageid, status) => async (dispatch) => {
  try {
    const  data  = await apiput(`/message/update/${messageid}`, {status});
    console.log('data', data)      
    dispatch({ type:UPDATE_MESSAGE_SEEN_SUCCESS, payload: data });
  } catch (error) {
    console.error(error);
  }
};