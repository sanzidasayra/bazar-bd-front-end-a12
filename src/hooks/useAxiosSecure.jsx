import axios from "axios";
import React from "react";

const axiosSecure = axios.create({
  baseURL: `https://bazar-bd-back-end-a12.onrender.com/`,
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
