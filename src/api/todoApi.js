import axios from "./axios";

/**
 * This file encapsulates the logic for making API requests to the backend server 
 * for the Todo List application. It exports four functions that handle CRUD (create, read, update, delete) operations. 
 * The module uses the axios library to make HTTP requests to the backend API.
 */

// I define the API resource URL to interact with the "todo" resource
const resourceUrl = "/api/todo";

// I define a function to get all todo items from the backend
const getAll = async () => {
  try {
    // I Log a message to the console to indicate that we're fetching all todos
    console.log('Fetching all todos...');

    // I send a GET request to the "/api/todo" endpoint of the backend
    const response = await axios.get(resourceUrl);

    // If the request succeeds, log a message to the console indicating that todos were fetched successfully,
    // and return the server's response data
    console.log('Todos fetched successfully:', response.data);
    return response;
  } catch (error) {
    // If the request fails, log an error message to the console and re-throw the error to propagate it up the call stack
    console.error('Error fetching todos:', error);
    throw error;
  }
};

// function to create a new todo item on the backend
const create = async (newTodo) => {
  try {
    // Log the new todo object being sent to the backend
    console.log("newTodo: ", newTodo);

    // Send a POST request to the "/api/todo" endpoint of the backend with the new todo object as the request body
    const response = await axios.post(resourceUrl, newTodo);

    // If the request succeeds, return the server's response data
    return response;
  } catch (error) {
    // If the request fails, log an error message to the console and re-throw the error to propagate it up the call stack
    console.error("Error creating todo:", error);
    throw error;
  }
};

// function to update an existing todo item on the backend
const update = (id, updatedTodo) => {
  // Send a PUT request to the "/api/todo/:id" endpoint of the backend with the todo item ID and updated data as parameters
  return axios.put(`${resourceUrl}/${id}`, updatedTodo);
};

// function to delete an existing todo item from the backend
const remove = (id) => {
  // Send a DELETE request to the "/api/todo/:id" endpoint of the backend with the todo item ID as a parameter
  return axios.delete(`${resourceUrl}/${id}`);
};

// Exporting an object that contains all the API functions as properties
export default {
  getAll,
  create,
  update,
  remove,
};
