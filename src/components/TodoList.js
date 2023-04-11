import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import todoApi from '../api/todoApi';

function TodoList() {
  const [todos, setTodos] = useState([]); //initializes the state variable todos as an empty array.
  
  // a hook that triggers a side effect whenever the component mounts.
  // In this case, it fetches all the todos from the backend using todoApi.getAll(), and sets the todos state variable to the response data.
  useEffect(() => {
    const fetchTodos = async () => {
      const response = await todoApi.getAll();
      setTodos(response.data);
    };

    fetchTodos();
  }, []);

  // an async function that takes a todo object as an argument.
  const addTodo = async todo => {
    console.log("adding todo: ", todo);

    // checks if the todo description is empty or only contains white spaces, and if so, it returns early.
    if (!todo.description || /^\s*$/.test(todo.description)) {
      console.log("empty todo description");
      return;
    }
    
    // creates a new todo object with the description and completed properties if input field not empty
    const newTodo = {
      description: todo.description,
      completed: false,
    };
  
    console.log("new todo: ", newTodo);
  
    try {
      const response = await todoApi.create(newTodo); // sends a POST request to the backend using todoApi.create()
      console.log("response: ", response);
      console.log("response data: ", response.data); // checks if the data being received
      setTodos(prevTodos => [response.data, ...prevTodos]); // If the request succeeds, it adds the new todo object to the beginning of the todos array
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };
  
  
  

  
  /**
   * The addTodo function is called when a new todo is submitted through the TodoForm component. It checks if the description of the new todo is not empty or whitespace only, 
   * creates a new todo object with the description and completed properties, sends a request to the server to create the new todo, and updates the todos state variable with the new todo.
   */
  const updateTodo = async (todoId, newValue) => {

    //  It checks if the newValue description is empty or only contains white spaces, and if so, it returns early.
    if (!newValue.description || /^\s*$/.test(newValue.description)) {
      return;
    }
  
    try {
      const response = await todoApi.update(todoId, newValue); // sends a PUT request to the backend, passing the todoId and newValue as arguments. 
      const updatedTodo = response.data; 
      
      // If the request succeeds, it updates the todos array by finding the todo with the corresponding id and merging the new value with the old value.
      setTodos(prevTodos =>
        prevTodos.map(todo => (todo.id === todoId ? { ...todo, ...updatedTodo } : todo))
      );
    } catch (error) {
      console.error(error);
    }
  };
  
  /**
   * The removeTodo function is called when a user clicks on the remove button of a todo. It sends a request to the server 
   * to remove the todo with the specified id, and updates the todos state variable by filtering out the removed todo.
   */
  const removeTodo = async id => {
    await todoApi.remove(id);
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  /** 
   * The completeTodo function is called when a user clicks on the checkbox of a todo to mark it as complete or incomplete. 
   * It finds the todo object with the specified id, creates a new todo object with the isComplete property flipped, sends a request to the server to update 
   * the todo, and updates the todos state variable by mapping over all the todos and replacing the old todo object with the updated one.
  */
  const completeTodo = async id => {
    const todo = todos.find(todo => todo.id === id);
    const updatedTodo = { ...todo, isComplete: !todo.isComplete };

    await todoApi.update(id, updatedTodo);

    setTodos(prevTodos =>
      prevTodos.map(todo => (todo.id === id ? updatedTodo : todo))
    );
  };

  /**
   * Finally, the TodoList component returns a JSX element that includes a heading, a TodoForm component, and a Todo component that displays the todos. 
   * The completeTodo, removeTodo, and updateTodo functions are passed as props to the Todo component.
   */
  return (
    <>
      <h1>What are your plans for today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;
