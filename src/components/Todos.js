import React, { useContext, useEffect, useState, useRef } from "react";
import todoContext from "../context/todoContext";
import TodoItem from "./TodoItem";
import { useNavigate } from "react-router-dom";

const Todos = (props) => {
  let navigate = useNavigate();
  const context = useContext(todoContext);
  const { todos, getTodos, editTask } = context;
  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      getTodos();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);
  const [todo, setTodo] = useState({ id: "", task: "", tag: "" });
  const updatetask = (currentTask) => {
    ref.current.click();
    setTodo(currentTask);
  };
  const ref = useRef(null);
  const refClose = useRef();
  const handleChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };
  const handleClick = () => {
    editTask(todo._id, todo.task, todo.tag);
    refClose.current.click();
  };
  return (
    <>
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div
            className="modal-content"
            style={{ backgroundColor: "#212529", color: "#fff"}}
          >
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit task
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                style={{ 
                backgroundColor:"#D3ECA7" }}
              ></button>
            </div>
            <div className="modal-body">
              <h5 className="my-2">Task</h5>
              <input
                name="task"
                type="text"
                id="etask"
                value={todo.task}
                onChange={handleChange}
                minLength={3}
                required
                style={{
                  height: "50px",
                  width: "100%",
                  borderRadius: "10px",
                  outline: "none",
                  border: "none",
                  padding: "10px",
                }}
              />
              <div>
                <h5 className="my-2">Tag</h5>
                <input
                  name="tag"
                  type="text"
                  id="etag"
                  value={todo.tag}
                  onChange={handleChange}
                  minLength={5}
                  required
                  style={{
                    height: "50px",
                    width: "100%",
                    borderRadius: "10px",
                    outline: "none",
                    border: "none",
                    padding: "10px",
                  }}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                ref={refClose}
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                disabled={todo.task.length < 3 || todo.tag.length < 3}
                className="btn"
                onClick={handleClick}
                style={{ 
                backgroundColor:"#D3ECA7"}}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="container mx-2 my-3">
          {todos.length === 0 && "No notes to display"}
        </div>
        {todos.map((todo) => {
          return (
            <TodoItem
              key={todo._id}
              todo={todo}
              updatetask={updatetask}
              showAlert={props.showAlert}
            />
          );
        })}
      </div>
    </>
  );
};

export default Todos;
