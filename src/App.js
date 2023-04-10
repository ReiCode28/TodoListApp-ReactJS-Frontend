import React, { useState, useEffect } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import todoApi from './api/todoApi';


function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    todoApi.getAll()
      .then((todos) => {
        setTodos(todos);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  

  return (
    <div className='todo-app'>
      <TodoList todos={todos} />
    </div>
  );
}

export default App;
