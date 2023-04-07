import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';

/**
 * Todo(): This is the main function component that renders a list of todo items. It takes in four props: todos, an array 
 * of todo objects, completeTodo, a function to mark a todo item as completed, removeTodo, a function to remove a todo item, 
 * and updateTodo, a function to update a todo item. The function uses the useState hook to create the edit state variable and defines 
 * the submitUpdate and handleUpdate functions described above.
 */
const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    description: ''
  });

  /**
   * submitUpdate(): This function is called when the user submits an update to a todo item. It takes in the updated value 
   * as a parameter and calls the updateTodo function passed in from the parent component to update the todo item with the specified id. 
   * It then resets the edit state variable to its initial state.
   */
  const submitUpdate = value => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      description: '',
    });
  };

  /**
   * handleUpdate(): This function is called when the user clicks the edit icon for a todo item. It takes in the id and text of 
   * the todo item and sets the edit state variable to an object with the id and description properties set to the corresponding values.
   */
  const handleUpdate = (id, text) => {
    setEdit({ id, description: text });
  };

  if (!todos || todos.length === 0) {
    return <div>No todos found.</div>;
  }

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  /**
   * renders a list of todo items using the map method. For each todo item in the todos array, it creates a <div> element with a class name of todo-row 
   * if the todo is not complete, or todo-row complete if the todo is complete (based on the isComplete property of the todo object). Inside the <div>, there are two child elements: 
   * the todo description, and a set of icons for deleting and editing the todo.
   */
  return todos.map((todo, index) => (
    <div
      className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
      key={index}
    >
      <div key={todo.id} onClick={() => completeTodo(todo.id)}>
        {todo.description}
      </div>
      <div className="icons">
        <RiCloseCircleLine
          onClick={() => removeTodo(todo.id)}
          className="delete-icon"
        />
        <TiEdit onClick={() => handleUpdate(todo.id, todo.description)} className="edit-icon" />
      </div>
    </div>
  ));
};

export default Todo;