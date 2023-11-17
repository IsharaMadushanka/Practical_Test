import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../css/viewpages.css";
import Header from "../component/Header";

function ViewUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    gender: "",
    age: "",
    homeNum: "",
    mobileNum: "",
  });
  const [hdata, setHData] = useState([]);
  const [hobbyDetails, setHobbyDetails] = useState({
    name: "",
    description: "",
  });
  useEffect(()=>{
    axios
         .get("http://localhost:8080")
         .then((res)=>{
          if(
            res.data.Valid && (res.data.Role ==="admin"))
            {
              console.log("welcome admin");
            }
          else{
            console.log("Not a admin");
            navigate("/");
          }
         })
         .catch((err)=>console.log(err));

  },[]);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/get_a_user/${id}`)
      .then((res) => {
        setUserDetails({
          name: res.data.name || "",
          email: res.data.email || "",
          gender: res.data.sex || "",
          age: res.data.age || "",
          homeNum: res.data.homeNum || "",
          mobileNum: res.data.mobileNum || "",
        });
      })
      .catch((error) => {
        console.error("Error fetching user data from backend:", error);
      });

    axios
      .get(`http://localhost:8080/userhobby/${id}`)
      .then((res) => {
        setHData(res.data);
        
        res.data.forEach((item) => {
          getHobby(item.hobbies_id);
        });
      })
      .catch((error) => {
        console.error("Error fetching hobby data from backend:", error);
      });
  }, [id]);

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

  return (
    <div className="viewer">
      <Header className="left"/>
      <div className="middle" >
        <form className="form">
          
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={userDetails.name} readOnly />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" value={userDetails.email} readOnly />
          </div>
          <div>
            <label htmlFor="age">Age</label>
            <input type="number" name="age" value={userDetails.age} readOnly />
          </div>
          <div>
            <label htmlFor="gender">
              Gender
            </label>
            <div>
              <label className="radio_text">
                <input
                className="radio_btn"
                  type="radio"
                  name="gender"
                  value="male"
                  checked={userDetails.gender === "male"}
                  readOnly
                  style = {{margin:0}}
                />
                Male
              </label>
              <label className="radio_text">
                <input
                className="radio_btn"
                  type="radio"
                  name="gender"
                  value="female"
                  checked={userDetails.gender === "female"}
                  readOnly
                />
                Female
              </label>
            </div>
          </div>
          <div>
            <label htmlFor="mobileNum">Mobile Number</label>
            <input
              type="tel"
              name="mobileNum"
              value={userDetails.mobileNum}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="homeNum">Home Number</label>
            <input type="tel" name="homeNum" value={userDetails.homeNum} readOnly />
          </div>
        </form>
      </div>
      <div className="right">
        
        {hdata.map((item) => (
          <form key={item.id}  className="form">
            <div>
              <label htmlFor={`hobbyName-${item.hobbies_id}`}>Hobby Name</label>
              <input
                type="text"
                name={`hobbyName-${item.hobbies_id}`}
                value={hobbyDetails[item.hobbies_id]?.name || ""}
                readOnly
              />
            </div>
            <div>
              <label htmlFor={`hobbyDescription-${item.hobbies_id}`}>Description</label>
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
export default ViewUser;