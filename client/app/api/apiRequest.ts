import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:9000";

type ApiRequestParams = {
  url: string;
  method: string;
  data?: any;
  params?: any;
};

const ApiRequest = async ({ method, url, data, params }: ApiRequestParams) => {
  return axios({
    method,
    url: `${API_URL}/${url}`,
    headers: {
      "Content-Type": "application/json",
    },
    data,
    params,
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export default ApiRequest;
