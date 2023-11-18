import axios from "axios";
import React, { useState,useEffect } from "react";
import Validation from "./UserValidation";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "../css/create_user.css";

function Login() {
  const [values, setValues] = useState({
    name:"",
    age:"",
    gender :"",
    email: "",
    password: "",
    cpassword:"",
    mobileNum: "",
    homeNum: ""
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [data,setData] = useState({});
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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
  
  const handleHobbySelection = (hobbyId) => {
    const isSelected = selectedHobbies.includes(hobbyId);
    if (isSelected) {
      setSelectedHobbies((prev) => prev.filter((id) => id !== hobbyId));
    } else {
      setSelectedHobbies((prev) => [...prev, hobbyId]);
    }
  };

  const handleSubmit = (event) => {
    console.log("handleSubmit was called");
    event.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);
    if(selectedHobbies.length == 0){
      console.log("not selected hobbies");
    }
    if (selectedHobbies.length == 0||validationErrors.mobile !== ""||validationErrors.password !== ""||validationErrors.cpassword !== ""||validationErrors.name !== ""  || validationErrors.email !== "") {      
    console.log("Validation error found",validationErrors);
      return;
    }
    axios
      .post("http://localhost:8080/createuser", values)
      .then((res) => {
        console.log(res.data.Status);
        if (res.data.Status === "Success") {
          console.log("response : ",res.data);
          saveSelectedHobbies(res.data.UserId);
            alert("Success");
            navigate("/adminhome");
        } else {
          console.log(res.data.Error);
          alert("Error ");
        }
        console.log(res);
      })
      .catch((err) => console.log(err));

      const saveSelectedHobbies = (userId) => {
        const hobbyUserValues = selectedHobbies.map((hobbyId) => [userId, hobbyId]);
      
        axios.post("http://localhost:8080/savehobbies", { values: hobbyUserValues })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => console.log(err));
      };
  };
    const getHobbyNameById = (hobbyId) => {
      const selectedHobby = data.find((hobby) => hobby.id === hobbyId);
      return selectedHobby ? selectedHobby.name : "";
    };

  useEffect(() => {
    axios
        .get("http://localhost:8080/get_hobby")
        .then((res) => {
           
            setData(res.data);
        })
        .catch((error) => {
            console.error("Error, fetching data from backend:", error);
        });
    
}, );

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="createUsercontain">
      <div className="">
      <form action="" onSubmit={handleSubmit} className="createUserform">
        
        <div>
          <label><h2><strong>Create User</strong></h2></label>
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
              <label htmlFor="mobile">
                <strong>Mobile Number</strong>
              </label>
              <input
                type="tel"
                maxLength={10}
                name="mobileNum"
                placeholder="Mobile Number"
                onChange={handleInput}
              />
            </div>
            <div>
              <label htmlFor="homeMobile">
                <strong>Home Mobile Number</strong>
              </label>
              <input
                type="tel"
                maxLength={10}
                name="homeNum"
                placeholder="Home Mobile Number"
                onChange={handleInput}
              />
            </div>
            {errors.mobile && <span>{errors.mobile}</span>}
          <div>
            <label htmlFor="password">
              <strong>Password</strong>
              
            </label>
            <div>
              <input
              className="passwordcreateUser"
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
          <div>
            <label htmlFor="cpassword">
              <strong>Confirm Password</strong>
              
            </label>
            <div>
              <input
                className="passwordcreateUser"
                name="cpassword"
                type={showPassword ? "text" : "cpassword"}
                placeholder="Confirm Password"
                onChange={handleInput}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.cpassword && <span>{errors.cpassword}</span>}
          </div>
          <button type="button" onClick={openPopup} className="buttoncreateUser">
            <strong>Select Hobbies</strong>
          </button>
            
          <button type="submit" className="buttoncreateUser">
            <strong>Create</strong>
          </button>
          
        </div>
      </form></div>
      {isPopupOpen && (
        <div className="popupcreateUser">
          <div className="popup-content">
            <h2>Select Hobbies</h2>
            {selectedHobbies.map((hobbyId) => (
                <span key={hobbyId} className="hobbycreateUser">{getHobbyNameById(hobbyId)}</span>
            ))} 

            <form>
              {data.map((hobby) => (
                <div key={hobby.id}>
                  <label>
                    <input
                      type="checkbox"
                      value={hobby.id}
                      checked={selectedHobbies.includes(hobby.id)}
                      onChange={() => handleHobbySelection(hobby.id)}
                    />
                    {hobby.name}
                  </label>
                </div>
              ))}
            </form>
            <button type="button" onClick={closePopup} className="buttoncreateUser">
              Save Selection
            </button>
          </div>
        </div>
      )}  
    </div>
  );
}

export default Login;
