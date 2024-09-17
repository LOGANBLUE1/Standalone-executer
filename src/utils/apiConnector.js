import axios from 'axios';
const qs = require('qs');

export const apiConnector = async (method, url, bodyData = null, headers = {}, params = {}) => {
  try {
    headers = {
      ...headers,
      'accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    // Handle query parameters
    const queryString = params && Object.keys(params).length > 0
      ? `?${new URLSearchParams(params).toString()}`
      : '';

    const requestUrl = `${url}${queryString}`;

    const config = {
      method: method.toLowerCase(), // Convert method to lowercase for axios
      url: requestUrl,
      headers: headers
    };

    config.data = qs.stringify(bodyData);  // Use qs.stringify for x-www-form-urlencoded

    console.log("Request Config:", config);

    const response = await axios.request(config);

    console.log("Response Data:", JSON.stringify(response.data));
    return response.data;

  } catch (error) {
    return {
      success: false,
      message: error.response ? error.response.data : 'Server Error occurred',
      status: error.response ? error.response.status : null,
    };
  }
};
