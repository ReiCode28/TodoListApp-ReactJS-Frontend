import { useState, useEffect } from 'react';
import todoApi from '../api/todoApi';

function TodoList() {
    
    const [todos, setTodos] = useState([]);
  
    useEffect(() => {
      const fetchTodos = async () => {
        const response = await todoApi.getAll();
        setTodos(response.data);
      };
  
      fetchTodos();
    }, []);
  
    const addTodo = async todo => {
      console.log("adding todo: ", todo);
      if (!todo.description || /^\s*$/.test(todo.description)) {
        console.log("empty todo description");
        return;
      }
    
      const newTodo = {
        description: todo.description,
        completed: false,
      };
    
      console.log("new todo: ", newTodo);
    
      try {
        const response = await todoApi.create(newTodo);
        console.log("response: ", response);
        console.log("response data: ", response.data); // Add this line to check the data being received
        setTodos(prevTodos => [response.data, ...prevTodos]);
      } catch (error) {
        console.error("Error creating todo:", error);
      }
    };


}