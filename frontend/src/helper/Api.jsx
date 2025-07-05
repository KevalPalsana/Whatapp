import axios from 'axios';
import Cookies from 'js-cookie';

export const BaseURL = "http://localhost:4000"
const defaultHeaders = {
  isAuth: true,
  AdditionalParams: {},
  isJsonRequest: true,
  isFormData:false,
  withCredentials: true, 
};

export const getHttpOptions = (options = defaultHeaders) => {
    let headers = {
      Authorization: "",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-credentials": true,
    };
    if (options.isAuth) {
      const token = Cookies.get('token');
      console.log('gettoken', token)
      headers["Authorization"] = token ? `Bearer ${token}` : "";
    }
    if (options.isFormData) {
        headers["Content-Type"]= "multipart/form-data" 
      } 
    
    if (options.hasOwnProperty("isJsonRequest") && options.isJsonRequest) {
      headers["Content-Type"] = "application/json";
    }
    if (options.hasOwnProperty("AdditionalParams") && options.AdditionalParams) {
      headers = { ...headers, ...options.AdditionalParams };
    }
    return { headers };
  };

  export const apiget = (type) => {
    return new Promise((resolve, reject) => {
      axios
        .get(BaseURL + type, getHttpOptions())
        .then((responseJson) => {
          resolve(responseJson.data);
        })
        .catch((error) => {
          reject({
            code: error?.response?.status,
            error: error?.response?.data?.error,
            message: error?.response?.data?.message,
          });
        });
      });
    };
  
  export const apidelete = (type) => {
      return new Promise((resolve, reject) => {
          axios
          .delete(BaseURL + type, getHttpOptions())
          .then((responseJson) => {
              resolve(responseJson.data);
            })
            
            .catch((error) => {
              reject({
                code: error?.response?.status,
                error: error?.response?.data?.error,
              });
            });
          });
        };
        

export const apipost = async (type, data, isFormData) => {
  const res = await axios.post(BaseURL + type, data, isFormData, getHttpOptions());
  return res;
};

  export const apiput = (type, data) => {
    return new Promise((resolve, reject) => {
      axios
        .put(BaseURL + type,data, getHttpOptions())
        .then((responseJson) => {
          resolve(responseJson.data);
        })
        .catch((error) => {
          reject({
            code: error?.response?.status,
            error: error?.response?.data?.error,
          });
        });
    });
  };