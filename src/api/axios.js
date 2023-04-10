import axios from "axios";

// The create method allows to create a new instance of axios with custom configurations.
// In this case, the baseURL option is set to http://localhost:8080
const instance = axios.create({
  baseURL: "http://localhost:8080", // the base url of the backend API
});

// By exporting the instance, other parts of the application can import it and use it to make HTTP requests 
// to the backend API. Since instance is already configured with the base URL for the backend API, other parts 
// of the application can simply import it and use it to send requests without having to specify the base URL every time.
export default instance;