import axios from "axios";
import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "../css/login.css";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const handleInput = (event) => {
    setErrors((prev) => ({
      ...prev,
      [event.target.name]: "",
    }));
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  axios.defaults.withCredentials = true;
  
  const handleSubmit = (event) => {
    console.log("handleSubmit was called");
    event.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    if (validationErrors.password !== "" || validationErrors.email !== "") {
      
    console.log("Validation error found",validationErrors);
      return;
    }
    axios
      .post("http://localhost:8080/login", values)
      .then((res) => {
        console.log(res.data.Status);
        if (res.data.Status === "Success" && res.data.Role ==="admin") {
          navigate("/adminhome");
        } 
        else if (res.data.Status === "Success" && res.data.Role ==="user") {
          navigate("/userhome");
        }else {
          console.log(res.data.Error);
          alert("Error : Check email and password again");
        }
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <form action="" onSubmit={handleSubmit} className="loginform">
        
        <div className="form-group">
          <div>
            <label htmlFor="email">
              <strong>Email</strong>
             
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleInput}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <div className="password-input">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={handleInput}
              />
              <button className="buttoneye"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          <button type="submit" className="submituser">
            <strong>Login</strong>
          </button>
          
        </div>
      </form>
      
    </div>
  );
}

export default Login;
