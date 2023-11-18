import React from 'react'
import axios from 'axios';
import "../css/adminhome.css";
import { useNavigate } from 'react-router-dom';

function Header() {
   const navigate = useNavigate();

    const handleLogout = async () => {
        try {
          await axios.get('http://localhost:8080/logout');
          window.location.href = '/';
        } catch (error) {
          console.error('Error logging out:', error);
        }
      };
      const handleEdit = () =>{
        navigate("/editme");
      } 
      const handleHobbies = () =>{
        navigate("/myhobbies");
      } 
  return (
    
        <div className="sidebar">
            <div className='title'><h2><strong>Hobby management</strong></h2></div>
            <div>
          <button onClick={handleEdit} className="buttonlog">edit my details</button>
        </div>
        <div>
          <button onClick={handleHobbies} className="buttonlog">change my hobbies</button>
        </div>
            <div ><button onClick={handleLogout} className='buttonlog'>Logout</button></div>
        </div>
    
  )
}

export default Header