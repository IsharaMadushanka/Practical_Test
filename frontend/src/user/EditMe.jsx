import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Validation from "../createuser/UserValidation";
import { FiEye, FiEyeOff } from "react-icons/fi";
import UserHeader from "../component/UserHeader"
import "../css/editme.css"

function EditUser() {

  const navigate = useNavigate();
  const [uid,setUid] = useState();
  const [value, setValue] = useState({
    name: "",
    email: "",
    gender: "",
    age: "",
    mobileNum: "",
    homeNum: "",
    password: "",
  });
  const [hdata, setHData] = useState([]);
  const [hobbyDetails, setHobbyDetails] = useState({
    name: "",
    description: "",
  });
const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  useEffect(()=>{
    axios
         .get("http://localhost:8080")
         .then((res)=>{
          if(
            res.data.Valid && (res.data.Role ==="user"))
            {
              console.log("welcome user");
              setUid(res.data.Userid);
            }
          else{
            console.log("Not a user");
            navigate("/");
          }
         })
         .catch((err)=>console.log(err));

  },[]);
  useEffect(() => {
    console.log("hmm");
    axios
      .get(`http://localhost:8080/get_a_user/${uid}`)
      .then((res) => {
        setValue({
          name: res.data.name || "",
          email: res.data.email || "",
          gender: res.data.sex || "",
          age: res.data.age || "",
          mobileNum: res.data.mobileNum || "",
          homeNum: res.data.homeNum || "",
        });
      })
      .catch((error) => {
        console.error("Error, fetching user data from backend:", error);
      });

    axios
    .get(`http://localhost:8080/userhobby/${uid}`)
    .then((res) => {
      setHData(res.data);
      res.data.forEach((item) => {
        getHobby(item.hobbies_id);
      });
    })
    .catch((error) => {
      console.error("Error fetching hobby data from backend:", error);
    });
}, [uid]);
const getHobby = (hobbyid) => {
  axios
    .get(`http://localhost:8080/get_a_hobby/${hobbyid}`)
    .then((res) => {
      setHobbyDetails((prevDetails) => ({
        ...prevDetails,
        [hobbyid]: {
          name: res.data.name || "",
          description: res.data.description || "",
        },
      }));
    })
    .catch((error) => {
      console.error("Error fetching hobby details from backend:", error);
    });
};
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

    if (validationErrors.mobile !== "" || validationErrors.name !== "" || validationErrors.email !== "") {
      console.log("Validation error found", validationErrors);
      return;
    }

    axios
      .post(`http://localhost:8080/updateuser/${uid}`, value) 
      .then((res) => {
        console.log(res.data.Status);
        if (res.data.Status === "Success") {
          setValue({
            name:  "",
            email:  "",
            gender: "",
            age:  "",
            mobileNum: "",
            homeNum: ""
          });
          alert("Success!!");
          navigate("/Userhome");
        } else {
          console.log(res.data.Error);
          alert("Error: Check again");
        }
      })
      .catch((err) => console.log(err));
  };

  const handlePassword = async (event) => {
    console.log("handlePassword was called");
    event.preventDefault();
    const validationErrors = Validation(value);
    setErrors(validationErrors);

    if (validationErrors.password !== "" || validationErrors.cpassword !== "") {
      console.log("Validation error found", validationErrors);
      return;
    }

    axios
      .post(`http://localhost:8080/updatepassword/${uid}`, value) 
      .then((res) => {
        console.log(res.data.Status);
        if (res.data.Status === "Success") {
          setValue({});
          alert("Success!!");
          navigate("/Adminhome");
        } else {
          console.log(res.data.Error);
          alert("Error: Check again");
        }
      })
      .catch((err) => console.log(err));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="editmecontainer">
      <UserHeader className="editmeLeft"/>
      <div className="editmeMiddle">
       
        <form action=""  className="editmeform"  onSubmit={handleSubmit}>
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
            <label htmlFor="description">Email</label>
            <input
              type="text"
              name="email"
              placeholder={value.email}
              value={value.email} 
              onChange={handleInput}
            />
            {errors.email && <span>{errors.email}</span>}
          </div>
          <div>
            <label htmlFor="age">Age</label>
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
          <div>
            <label htmlFor="mobile">
              <strong>Mobile Number</strong>
            </label>
            <input
              type="tel"
              maxLength={10}
              value={value.mobileNum}
              name="mobileNum"
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
              value={value.homeNum}
              name="homeNum"
              onChange={handleInput}
            />
          </div>
          {errors.mobile && <span>{errors.mobile}</span>}

          <button type="submit" className="editmebutton">
            <strong>Update</strong>
          </button>
        </form>
        <form action="" onSubmit={handlePassword} className="editmeform">
        <div>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={handleInput}
          />
          <button className="editmebutton"
            type="button"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
        <div>
          <input
            name="cpassword"
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            onChange={handleInput}
          />
          <button
          className="editmebutton"
            type="button"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
          {errors.cpassword && <span>{errors.cpassword}</span>}
        </div>
        <button type="submit" className="editmebutton">Change Password</button>
      </form>
      
      </div>

      <div className="editmeright">
    
      {hdata.map((item) => (
          <form key={item.id}  className="editmeform">
            <div>
              <label >Hobby Name</label>
              <input
                type="text"
                name={`hobbyName-${item.hobbies_id}`}
                value={hobbyDetails[item.hobbies_id]?.name || ""}
                readOnly
              />
            </div>
            <div>
              <label>Description</label>
              <input
                type="text"
                name={`hobbyDescription-${item.hobbies_id}`}
                value={hobbyDetails[item.hobbies_id]?.description || ""}
                readOnly
              />
            </div>
          </form>
        ))}
      </div>
    </div>
  );
}

export default EditUser;
