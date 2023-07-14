import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    document.querySelector(".button").textContent = "Loading..."
    //API call
    const api = process.env.REACT_APP_BACKEND_API
    const response = await fetch(`${api}/api/auth/login`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //Save the authtoken and redirect to todos
      localStorage.setItem("auth-token", json.authtoken);
      props.showAlert("Logged in successfully", "success");
      navigate("/");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const showHide = () => {
    const password = document.querySelector("#password");
    if (password.type === "password") {
      password.setAttribute("type", "text");
    } else {
      password.setAttribute("type", "password");
    }
  };
  return (
    <div
      className="container"
      style={{ display: "grid", placeItems: "center" }}
    >
      <h3 className="my-5">Welcome back!</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            onChange={onChange}
            style={{ width: "320px" }}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            style={{ width: "320px" }}
          />
          <input type="checkbox" onClick={showHide} className="my-4" /> Show
          Password
        </div>

        <button
          type="submit"
          className="button"
          style={{
            height: "40px",
            width: "100px",
            borderRadius: "10px",
            outline: "none",
            border: "none",
          }}
        >
          LogIn
        </button>
      </form>
    </div>
  );
};

export default Login;
