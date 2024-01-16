import axios from "axios";

const handleSuccessResponse = (response) => {
  if (response?.status === 200 || response?.status === 201) {
    return {
      status: true,
      data: response?.data || {},
    };
  }
  const errorMessage = response?.data?.data?.message || "Something went wrong";
  return {
    status: false,
    message: errorMessage,
  };
};

const handleErrorResponse = (error) => {
  const errorMessage = error?.response?.data?.message || "Something went wrong";
  return {
    status: false,
    message: errorMessage,
  };
};

export const responseHandler = ({
  method,
  url,
  payload = {},
  headers = {},
}) => {
  if (method === "post") {
    return axios
      .post(url, payload, headers)
      .then((response) => handleSuccessResponse(response))
      .catch((error) => handleErrorResponse(error));
  }

  if (method === "get") {
    return axios
      .get(url, headers)
      .then((response) => handleSuccessResponse(response))
      .catch((error) => handleErrorResponse(error));
  }

  if (method === "put") {
    return axios
      .put(url, payload, headers)
      .then((response) => handleSuccessResponse(response))
      .catch((error) => handleErrorResponse(error));
  }

  if (method === "delete") {
    return axios
      .delete(url, {
        data: payload,
        headers,
      })
      .then((response) => handleSuccessResponse(response))
      .catch((error) => handleErrorResponse(error));
  }
};
