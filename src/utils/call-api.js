import axios from "axios";
import config from "../config";

export const callApi = (endpoint, method, token, payload) => {
  const authHeaders = token
    ? {
      accessToken: token,
    }
    : {};

  const configaxios = {
    method,
    url: `${config.API_URI}/${endpoint}`,
    data: payload,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...authHeaders,
    },
  };

  return new Promise((resolve, reject) => {
    axios(configaxios)
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
