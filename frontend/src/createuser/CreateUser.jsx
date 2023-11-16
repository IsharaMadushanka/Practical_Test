import axios from "axios";
import React, { useState } from "react";
import Validation from "./UserValidation";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Login() {
  const [values, setValues] = useState({
    name:"",
    age:"",
    gender :"",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

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

    if (validationErrors.password !== ""||validationErrors.name !== ""  || validationErrors.email !== "") {
      
    console.log("Validation error found",validationErrors);
      return;
    }
    axios
      .post("http://localhost:8080/createuser", values)
      .then((res) => {
        console.log(res.data.Status);
        if (res.data.Status === "Success") {
            alert("Success");
        } else {
          console.log(res.data.Error);
          alert("Error ");
        }
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        
        <div>
        <div>
            <label htmlFor="name">
              <strong>Name</strong>
             
            </label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleInput}
            />
            {errors.name && <span>{errors.name}</span>}
          </div>
          <div>
            <label htmlFor="age">
              <strong>Age</strong>
            </label>
            <input
              type="number"
              name="age"
              placeholder="Age"
              onChange={handleInput}
            />
           
          </div>
          <div>
            <label htmlFor="gender">
              <strong>Gender</strong>
            </label>
            <div>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={values.gender === "male"}
                  onChange={handleInput}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={values.gender === "female"}
                  onChange={handleInput}
                />
                Female
              </label>
            </div>
          </div>
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
            {errors.email && <span>{errors.email}</span>}
          </div>
          <div>
            <label htmlFor="password">
              <strong>Password</strong>
              
            </label>
            <div>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={handleInput}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && <span>{errors.password}</span>}
          </div>
          <button type="submit">
            <strong>Login</strong>
          </button>
          
        </div>
      </form>
      
    </div>
  );
}

export default Login;
