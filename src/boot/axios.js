import Vue from "vue";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL
});

Vue.prototype.$axios = axiosInstance;

export { axiosInstance };
