import axios from "axios";
import Cookies from "js-cookie";

const BaseURL = "http://localhost:8000/api";

const getHeaders = async (header?: boolean) => {
  const headers: Record<string, string> = {
    'Content-Type': header ? 'multipart/form-data' : "application/json"
  };

  console.log(headers,"headers")
  if (header) {
    // headers.Authorization = `Bearer ${getJwt()}`;
  }
  return headers;
};

const Get = async (url: string, isRequired: boolean) => {
  const headers = await getHeaders(isRequired);
  try {
    const response = await axios.get(`${BaseURL}${url}`, { headers });
    return response;
  } catch (error) {
    throw error;
  }
};

const Post = async (url: string, payload: any, isRequired: boolean) => {
  console.log("INSIDE POST", payload);
  const headers = await getHeaders(isRequired);
  try {
    const response = await axios.post(`${BaseURL}${url}`, payload, { headers });
    console.log("Response", response);
    return response;
  } catch (error) {
    console.log("Response", error);
    throw error;
  }
};

const Put = async (url: string, payload: any, isRequired: boolean) => {
  const headers = await getHeaders(isRequired);
  try {
    const response = await axios.put(`${BaseURL}${url}`, payload, { headers });
    return { response: response.data, status: response.status };
  } catch (error) {
    throw error;
  }
};

const Delete = async (url: string, isRequired: boolean) => {
  const headers = await getHeaders(isRequired);
  try {
    const response = await axios.delete(`${BaseURL}${url}`, { headers });
    return response;
  } catch (error) {
    throw error;
  }
};

export { Post, Put, Get, Delete, getHeaders, BaseURL };
