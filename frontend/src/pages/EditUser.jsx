import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Validation from "../createuser/UserValidation";
import { FiEye, FiEyeOff } from "react-icons/fi";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState({
    name : "",
    email : "",
    gender : "",
    age : "",
    password : ""
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/get_a_user/${id}`) 
      .then((res) => {
        console.log(res.data);
       
        setValue({
            name: res.data.name || "",
            email: res.data.email || "",
            gender: res.data.sex || "",
            age: res.data.age || "",
          });
      })
      .catch((error) => {
        console.error("Error, fetching data from backend:", error);
      });
    
  }, [id]);

  const handleInput = (event) => {
    setErrors((prev) => ({
        ...prev,
        [event.target.name]: "",
      }));
    setValue((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    
    console.log("handleSubmit was called");
    event.preventDefault();
    const validationErrors = Validation(value);
    setErrors(validationErrors);

    if (validationErrors.name !== "" || validationErrors.email !== "") {
      
    console.log("Validation error found",validationErrors);
      return;
    }
    axios
      .post(`http://localhost:8080/updateuser/${id}`, value) 
      .then((res) => {
        console.log(res.data.Status);
        if (res.data.Status === "Success") {
          setValue({
            name:  "",
            email:  "",
            gender: "",
            age:  ""
          });
          alert("Success!!");
          navigate("/Adminhome");
        } else {
          console.log(res.data.Error);
          alert("Error: Check  again");
        }
      })
      .catch((err) => console.log(err));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <div>
        <div></div>
        <form action="" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder={value.name}
              value={value.name} 
              onChange={handleInput}
            />
            {errors.name && <span>{errors.name}</span>}
          </div>
          <div>
            <label htmlFor="description">gmail</label>
            <input
              type="text"
              name="gmail"
              placeholder={value.email}
              value={value.email} 
              onChange={handleInput}
            />
            {errors.email && <span>{errors.email}</span>}
          </div>
          <div>
          <label htmlFor="age">age</label>
            <input
              type="number"
              name="age"
              placeholder={value.age}
              value={value.age} 
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
                  checked={value.gender === "male"}
                  onChange={handleInput}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={value.gender === "female"}
                  onChange={handleInput}
                />
                Female
              </label>
            </div>
          </div>
          

          <button type="submit">
            <strong>Update</strong>
          </button>
        </form>
      </div>



      <form action="">
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
            
      </form>
    </div>
  );
}

export default EditUser;
