import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AssignHobby() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [hData, setHData] = useState([]);
  const [selectedHobbies, setSelectedHobbies] = useState([]);
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
  const handleHobbySelection = (hobbyId) => {
    setHData((prevHobbies) => {
      if (prevHobbies.includes(hobbyId)) {
       
        return prevHobbies.filter((id) => id !== hobbyId);
      } else {
        
        return [...prevHobbies, hobbyId];
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (hData.length === 0) {
      console.log("No selected hobbies");
      return;
    }

    const hobbyUserValues = hData.map((hobbyId) => [id, hobbyId]);

    axios
      .post("http://localhost:8080/savehobbieslater", { values: hobbyUserValues })
      .then((res) => {
        console.log(res.data);
        navigate("/adminhome");
      })
      .catch((err) => console.log(err));
  };

  const getHobbyNameById = (hobbyId) => {
    const selectedHobby = data.find((hobby) => hobby.id === hobbyId);
    return selectedHobby ? selectedHobby.name : "";
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/userhobby/${id}`)
      .then((res) => {
        const userHobbies = res.data.map((entry) => entry.hobbies_id);
        setSelectedHobbies(userHobbies);
        setHData(userHobbies);
      })
      .catch((error) => {
        console.error("Error fetching hobby data from backend:", error);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/get_hobby")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error("Error, fetching data from backend:", error);
      });
  }, []);

  return (
    <div>
      <div>
        {hData.map((hobbyId) => (
          <span key={hobbyId}>{getHobbyNameById(hobbyId)}</span>
        ))}
      </div>

      <div className="popup">
        <div className="popup-content">
          <h2>Select Hobbies</h2>
          <form onSubmit={handleSubmit}>
            {data.map((hobby) => (
              <div key={hobby.id}>
                <label>
                  <input
                    type="checkbox"
                    value={hobby.id}
                    onChange={() => handleHobbySelection(hobby.id)}
                    checked={hData.includes(hobby.id)}
                  />
                  {hobby.name}
                </label>
              </div>
            ))}
            <button type="submit">Save Selection</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AssignHobby;
