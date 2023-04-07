import axios from "axios";

/**
 * This file creates an instance of the axios library that can be used to make HTTP requests to the backend server.
 */

const instance = axios.create({
  baseURL: "http://localhost:8080", // the base url of your backend API
});

export default instance;