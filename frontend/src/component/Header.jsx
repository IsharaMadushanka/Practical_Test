import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../css/adminhome.css";

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
      const handleHobby = () =>{
        navigate("/hobby")
      }
      const handleUser = () =>{
        navigate("/adminhome")
      }
  return (
    
        <div className="sidebar">
            <div className='title'><h2><strong>Hobby management</strong></h2></div>
            <div ><button onClick={handleUser} className='buttonlog'>User</button></div>
            <div ><button onClick={handleHobby} className='buttonlog'>Hobby</button></div>
            <div ><button onClick={handleLogout} className='buttonlog'>Logout</button></div>
        </div>
    
  )
}

export default Header