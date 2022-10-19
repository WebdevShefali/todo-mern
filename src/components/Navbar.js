import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.removeItem("auth-token");
    navigate("/login");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-expand-md navbar-expand-sm bg-dark navbar-dark">
        <div className="container-fluid">
          <Link
            className="navbar-brand"
            to="/"
            style={{ padding: "20px", fontSize: "1.5rem" }}
          >
            Todos
          </Link>

          {!localStorage.getItem("auth-token") ? (
            <form
              className="d-flex l-btn"
              role="search"
              style={{ padding: "20px" }}
            >
              <Link to="login" className="nav-link">
                {" "}
                <button
                  className="btn"
                  type="submit"
                  style={{
                    color: "#fff",
                    height: "40px",
                    width: "100px",
                    borderRadius: "10px",
                    outline: "none",
                    border: "none",
                  }}
                >
                  Login
                </button>{" "}
              </Link>
              <Link to="signup" className="nav-link">
                {" "}
                <button
                  className="btn"
                  type="submit"
                  style={{
                    color: "#fff",
                    height: "40px",
                    width: "100px",
                    borderRadius: "10px",
                    outline: "none",
                    border: "none",
                  }}
                >
                  Sign up
                </button>{" "}
              </Link>
            </form>
          ) : (
            <form className="d-flex" role="search" style={{ padding: "20px" }}>
              {" "}
              <Link to="login" className="nav-link">
                {" "}
                <button
                  className="btn l-btn"
                  type="submit"
                  onClick={Logout}
                  style={{
                    color: "#fff",
                    height: "40px",
                    width: "100px",
                    borderRadius: "10px",
                    outline: "none",
                    border: "none",
                  }}
                >
                  Log Out
                </button>{" "}
              </Link>
            </form>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
