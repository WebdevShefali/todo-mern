import React, { useContext, useState } from "react";
import todoContext from "../context/todoContext";
import Todos from "./Todos";

const Home = (props) => {
  const context = useContext(todoContext);
  const { addTask } = context;
  const [todo, setTodo] = useState({ task: "", tag: "" });
  const handleClick = () => {
    addTask(todo.task, todo.tag);
    setTodo({ task: "", tag: "" });
    props.showAlert("Added successfully", "success");
  };
  const handleChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h3 className="my-3">Add a new task</h3>
      <div>
        <h6 className="my-3">Task</h6>
        <input
          name="task"
          id="task"
          type="text"
          value={todo.task}
          onChange={handleChange}
          style={{
            height: "50px",
            width: "500px",
            borderRadius: "10px",
            outline: "none",
            border: "none",
            padding: "10px",
            backgroundColor: "hwb(82deg 64% 15%)",
          }}
        />
      </div>
      <div>
        <h6 className="my-3">Tag</h6>
        <input
          name="tag"
          id="tag"
          type="text"
          value={todo.tag}
          onChange={handleChange}
          style={{
            height: "50px",
            width: "500px",
            borderRadius: "10px",
            outline: "none",
            border: "none",
            padding: "10px",
            backgroundColor: "hwb(82deg 64% 15%)",
          }}
        />
      </div>
      <div>
        <button
          className="my-3"
          onClick={handleClick}
          style={{
            height: "50px",
            width: "50px",
            borderRadius: "50%",
            outline: "none",
            border: "none",
            backgroundColor: "#D3ECA7",
          }}
        >
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
      <h3>Your Tasks</h3>

      <Todos showAlert={props.showAlert} />
    </div>
  );
};

export default Home;
