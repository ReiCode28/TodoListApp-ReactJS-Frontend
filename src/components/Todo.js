import React, { useState } from 'react';
import todoApi from '../api/todoApi';

const TodoForm = (props) => {
  const [input, setInput] = useState(props.edit ? props.edit.description : '');
  
  /**
   * When the user changes the input value, the handleChange function is called, 
   * which updates the input state variable with the new value. 
   */
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  /**
   * When the form is submitted, the handleSubmit function is called, which creates a new todo object with 
   * the input value and a completed property set to false.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const todo = {
      description: input,
      completed: false
    };

    try {

      /**
       * If the props.edit flag is true, the update method from the todoApi module is called to update the existing todo 
       * item with the new values, and the onSubmit callback passed in via the props object is called with the updated todo item. 
       */  
      if (props.edit) {
        const updatedTodo = await todoApi.update(props.edit.id, todo);
        props.onSubmit(updatedTodo.data);

      /**
       * If the props.edit flag is false, the create method from the todoApi module is called to create a new todo item, 
       * and the onSubmit callback is called with the new todo item.
      */  
      } else {
        const res = await todoApi.create(todo);
        props.onSubmit({ id: res.data._id, ...todo });
      }
    } catch (error) {
      console.error(error);
    }

    setInput('');
  };

}