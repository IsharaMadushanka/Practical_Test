import React,{useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/hobby.css";

function Createhobby() {
   const navigate = useNavigate();
    const [value,setValue] = useState({
      hobby:"",
      description:""
    });
   
    const handleInput = (event) => {
      
      setValue((prev) => ({
          ...prev,
          [event.target.name]: event.target.value,
        }));
    }
    axios.defaults.withCredentials = true;
   
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
    
    const handleSubmit = async (event) =>{
      event.preventDefault();
      axios
      .post("http://localhost:8080/createhobby", value)
      .then((res) => {
        console.log(res.data.Status);
        if (res.data.Status === "Success") {
          setValue({
            hobby:"",
            description:""
          });
          alert("success!!");
          navigate("/hobby");
        } else {
          console.log(res.data.Error);
          alert("Error : Check email and password again");
        }
        
      })
      .catch((err) => console.log(err));
    }
  return (
    <div>
        <div className="formcreatehobby">
          
            <form action="" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="hobby">Add new hobby !!!</label>
                <input type="text" name="hobby" placeholder="new hobby" onChange={handleInput} className="text_input"/>
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <input type="text" name="description" placeholder="add a description" onChange={handleInput}/>
              </div>
                <button type="submit" className="Add"><strong>Add</strong></button>
            </form>
        </div>
    </div>
  )
}
export default Createhobby