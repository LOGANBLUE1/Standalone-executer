import axios from 'axios';
const qs = require('qs');

export const apiConnector = async (method, url, bodyData = null, headers = {}, params = {}) => {
  try {
    headers = {
      ...headers,
      'accept': 'application/json',
      'Content-Type': bodyData instanceof FormData
        ? 'multipart/form-data'
        : 'application/x-www-form-urlencoded',  // Ensure content type matches
    };

    // Handle query parameters
    const queryString = params && Object.keys(params).length > 0
      ? `?${new URLSearchParams(params).toString()}`
      : '';
    const requestUrl = `${url}${queryString}`;

    const config = {
      method: method.toLowerCase(), // Convert method to lowercase for axios
      url: requestUrl,
      headers: headers,
      maxBodyLength: Infinity,  // Optional: handle large payloads
    };

    // Only add `data` for non-GET requests
    if (method.toLowerCase() !== 'get' && bodyData) {
      config.data = bodyData instanceof FormData
        ? bodyData
        : qs.stringify(bodyData);  // Use qs.stringify for x-www-form-urlencoded
    }


    // Log request details
    console.log("Request Config:", config);

    // Make the axios request
    const response = await axios.request(config);

    // Log and return the response data
    console.log("Response Data:", JSON.stringify(response.data));
    return response.data;
    
  } catch (error) {
    console.error("API Connector Error:", error);
    return {
      success: false,
      message: error.response ? error.response.data : 'Server Error occurred',
      status: error.response ? error.response.status : null,
    };
  }
};
