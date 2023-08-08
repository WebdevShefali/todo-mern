import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    document.querySelector(".button").innerHTML = 'Loading...'
    //API call
    const api = process.env.REACT_APP_BACKEND_API
    const response = await fetch(`${api}/api/auth/createuser`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      //Save the authtoken and redirect to notes
      localStorage.setItem("auth-token", json.authtoken);
      props.showAlert("Account created successfully", "success");
      navigate("/");
    } else {
      props.showAlert("Invalid Details", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const showHide = (e) => {
    const password = document.querySelector("#password");
    const eyeIcon = document.querySelector('#eyeIcon');
    if (password.type === "password"&& (e.type !== 'keydown' || e.code === 'Enter')) {
      password.setAttribute("type", "text");
      eyeIcon.classList.remove("fa-eye");
                eyeIcon.classList.add("fa-eye-slash");
    } else {
      password.setAttribute("type", "password");
      eyeIcon.classList.remove("fa-eye-slash");
                eyeIcon.classList.add("fa-eye");
    }
  };

  return (
    <div
      className="container"
      style={{ display: "grid", placeItems: "center" }}
    >
      <h3 className="my-5">Create an account</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            autoComplete="off"
            onChange={onChange}
            required
            style={{ width: "320px",
            backgroundColor:"#D3ECA7" }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            autoComplete="off"
            onChange={onChange}
            required
            minLength={8}
            style={{ width: "320px",
            backgroundColor:"#D3ECA7" }}
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
            autoComplete="off"
            onChange={onChange}
            required
            minLength={8}
            style={{ width: "320px",
            backgroundColor:"#D3ECA7" }}
          />
         <button type="button" id="btnToggle" className="toggleEyeIcon " onClick={showHide} >
            <i id="eyeIcon" className="fa fa-eye"></i>
          </button>
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
            backgroundColor:"#D3ECA7"
          }}
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
