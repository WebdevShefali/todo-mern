import React, { useContext } from "react";
import todoContext from "../context/todoContext";

const TodoItem = (props) => {
  const { todo, updatetask } = props;
  const context = useContext(todoContext);
  const { deletetask } = context;

  return (
    <div>
      <div
        className="toast d-block my-3"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        style={{ width: "50vw", backgroundColor: "#42484f" }}
      >
        <div className="toast-header" style={{ backgroundColor: "#D3ECA7" }}>
          <strong className="me-auto">{todo.tag}</strong>
          <button
            type="button"
            className="btn"
            onClick={() => {
              updatetask(todo);
            }}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => {
              deletetask(todo._id);
              props.showAlert("Deleted successfully", "success");
            }}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
        <div className="toast-body">{todo.task}</div>
      </div>
    </div>
  );
};

export default TodoItem;
