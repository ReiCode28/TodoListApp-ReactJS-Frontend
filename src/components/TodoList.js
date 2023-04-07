import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
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
  
  
  

  

  const updateTodo = async (todoId, newValue) => {
    if (!newValue.description || /^\s*$/.test(newValue.description)) {
      return;
    }
  
    try {
      const response = await todoApi.update(todoId, newValue);
      const updatedTodo = response.data;
  
      setTodos(prevTodos =>
        prevTodos.map(todo => (todo.id === todoId ? { ...todo, ...updatedTodo } : todo))
      );
    } catch (error) {
      console.error(error);
    }
  };
  

  const removeTodo = async id => {
    await todoApi.remove(id);
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const completeTodo = async id => {
    const todo = todos.find(todo => todo.id === id);
    const updatedTodo = { ...todo, isComplete: !todo.isComplete };

    await todoApi.update(id, updatedTodo);

    setTodos(prevTodos =>
      prevTodos.map(todo => (todo.id === id ? updatedTodo : todo))
    );
  };

  return (
    <>
      <h1>What's the Plan for Today?</h1>
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
