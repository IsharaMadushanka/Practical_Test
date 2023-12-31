import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../css/hobby.css";

function Createhobby() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState({
    hobby: "",
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
      .get(`http://localhost:8080/get_a_hobby/${id}`) 
      .then((res) => {
        console.log(res.data);
       
        setValue({
            hobby: res.data.name || "",
            description: res.data.description || "",
          });
      })
      .catch((error) => {
        console.error("Error, fetching data from backend:", error);
      });
    
  }, [id]);

  const handleInput = (event) => {
    setValue((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios
      .post(`http://localhost:8080/updatehobby/${id}`, value) 
      .then((res) => {
        console.log(res.data.Status);
        if (res.data.Status === "Success") {
          setValue({
            hobby: "",
            description: "",
          });
          alert("Success!!");
          navigate("/hobby");
        } else {
          console.log(res.data.Error);
          alert("Error: Check email and password again");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div>
        <div></div>
        <form  className= "formcreatehobby" action="" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="hobby">Update Hobby</label>
            <input
              className="text_input"
              type="text"
              name="hobby"
              placeholder={value.hobby}
              value={value.hobby} 
              onChange={handleInput}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
          
            <input
            className="text_input"
              type="text"
              name="description"
              placeholder={value.description}
              value={value.description} 
              onChange={handleInput}
            />
          </div>
          <button className ="Add" type="submit">
            <strong>Update</strong>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Createhobby;
