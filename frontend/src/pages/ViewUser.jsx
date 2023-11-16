import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    gender: "",
    age: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/get_a_user/${id}`)
      .then((res) => {
        setUserDetails({
          name: res.data.name || "",
          email: res.data.email || "",
          gender: res.data.sex || "",
          age: res.data.age || "",
        });
      })
      .catch((error) => {
        console.error("Error, fetching data from backend:", error);
      });
  }, [id]);

  return (
    <div>
      <div>
        <div></div>
        <form>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={userDetails.name}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="description">Gmail</label>
            <input
              type="text"
              name="email"
              value={userDetails.email}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="age">Age</label>
            <input
              type="number"
              name="age"
              value={userDetails.age}
              readOnly
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
                  checked={userDetails.gender === "male"}
                  readOnly
                />
                Male
              </label>
              <label>
                <input
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
        </form>
      </div>
    </div>
  );
}

export default EditUser;
