import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
    const [data, setData] = useState([]);
    const [flag,setFlag] = useState(0);
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios
            .get("http://localhost:8080/get_user")
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
            .get(`http://localhost:8080/user_delete/${id}`)
            .then((res) => {
                console.log(res.data);
                setFlag((prevFlag) => prevFlag + 1);
                
            })
            .catch((error) => {
                console.error("Error, Delete failed ", error);
            });
   
  };
  const handleView = (id) => {
   
    navigate(`/viewuser/${id}`);
  };
  const handleEdit = (id) => {
  
    navigate(`/edituser/${id}`);
  };
  const handleCreate = (id) => {
    
    navigate("/createhobby");
  };

    
    return (
        <div>
            <button type="" onClick={handleCreate}><strong>Add </strong></button>
          <h2>Hobbies</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>
                    <button onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                    <button onClick={() => handleView(item.id)}>
                      View
                    </button>
                    <button onClick={() => handleEdit(item.id)}>
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    
    
}

export default Home;