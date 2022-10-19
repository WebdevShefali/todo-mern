
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import TodoState from "./context/TodoState";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Alert from "./components/Alert";
import { useState } from "react";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <TodoState>
      <Router>
        <Navbar />
        <Alert alert={alert} />

        <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert} />} />
          <Route
            exact
            path="/login"
            element={<LogIn showAlert={showAlert} />}
          />
          <Route
            exact
            path="/signup"
            element={<SignUp showAlert={showAlert} />}
          />
        </Routes>
      </Router>
    </TodoState>
  );
}

export default App;
