import React, { useState } from "react";
import todoContext from "./todoContext";

const TodoState = (props) => {
  const host =   process.env.REACT_APP_BACKEND_API
  const todosInitial = [];
  const [todos, setTodos] = useState(todosInitial);
  //Get all todos
  const getTodos = async () => {
    //API call
    const response = await fetch(`${host}/api/todos/fetchalltasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    const json = await response.json();
    setTodos(json);
  };
  //Add new task
  const addTask = async (task, tag) => {
    //API call
    const response = await fetch(`${host}/api/todos/addnewtask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({ task, tag }),
    });
    // Logic to add in client side

    const todo = await response.json();
    setTodos(todos.concat(todo));
  };
  //Edit task
  const editTask = async (id, task, tag) => {
    //API call
    const response = await fetch(`${host}/api/todos/updatetask/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({ task, tag }),
    });
    const json = await response.json();
    let newTodos = JSON.parse(JSON.stringify(todos));
    // Logic to edit in client side
    for (let index = 0; index < todos.length; index++) {
      const element = todos[index];
      if (element._id === id) {
        newTodos[index].task = task;
        newTodos[index].tag = tag;
        break;
      }
    }
    setTodos(newTodos);
  };
  //Delete task
  const deletetask = async (id) => {
    //Api call
    const response = await fetch(`${host}/api/todos/deletetask/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    const json = await response.json();
    console.log(json);
    //delete in client side
    const newTodos = todos.filter((todo) => {
      return todo._id !== id;
    });
    setTodos(newTodos);
  };

  return (
    <todoContext.Provider
      value={{ todos, getTodos, addTask, editTask, deletetask }}
    >
      {props.children}
    </todoContext.Provider>
  );
};

export default TodoState;
