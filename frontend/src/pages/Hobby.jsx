import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/adminhome.css";
import Header from "../component/Header";

function Home() {
    const [data, setData] = useState([]);
    const [flag,setFlag] = useState(0);
    const navigate = useNavigate();
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
    
    useEffect(() => {
        axios
            .get("http://localhost:8080/get_hobby")
            .then((res) => {
                console.log(res.data);
                setData(res.data);
            })
            .catch((error) => {
                console.error("Error, fetching data from backend:", error);
            });
        
    }, [flag]);
    
  const handleDelete = (id) => {
    
    axios
            .get(`http://localhost:8080/hobby_delete/${id}`)
            .then((res) => {
                console.log(res.data);
                setFlag((prevFlag) => prevFlag + 1);
                
            })
            .catch((error) => {
                console.error("Error, Delete failed ", error);
            });
   
  };
 
  const handleEdit = (id) => {
   
    navigate(`/edithobby/${id}`);
  };
  const handleCreate = (id) => {
   
    navigate("/createhobby");
  };

    
    return (
    <div className="container">
      <Header />
      <div className="hobbycontainer">
            <button type="" onClick={handleCreate} className="create-button" style = {{width:100}}><strong>Add </strong></button>
          <h2>Hobbies</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>
                    <button onClick={() => handleDelete(item.id)} className="btn" >
                      Delete
                    </button>
                    
                    <button onClick={() => handleEdit(item.id)} className="btn">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
      );
    
    
}

export default Home;