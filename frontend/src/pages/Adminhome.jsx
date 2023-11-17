import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

function Home() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [data, setData] = useState([]);
  const [sorted, setSorted] = useState([]);
  const [flag, setFlag] = useState(0);
  const navigate = useNavigate();
  const options = [
    { value: "age lowest to highest", label: "age ascending" },
    { value: "age highest to lowest", label: "age descending" },
    { value: "name", label: "name" },
    { value: "recent desc", label: "recent desc" },
    { value: "recent asce", label: "recent asce" },
  ];

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:8080/get_user")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setSorted(res.data);
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

  const handleCreate = () => {
    navigate("/createuser");
  };
  const handleAssign = (id) => {
    navigate(`/assign/${id}`);
  };
  const handleOptionChange = (event) => {
    const filterValue = event.target.value;

    if (filterValue === "boy") {
      const filtered = sorted.filter((item) => item.sex === "male");
      setData(filtered);
    } else if (filterValue === "girl") {
      const filtered = sorted.filter((item) => item.sex === "female");
      setData(filtered);
    } else {
      setData(sorted);
    }

    setSelectedOption(filterValue);
  };

  const handleChange = (selectedOption) => {
    if (data.length !== 0) {
      if (selectedOption.value === "age lowest to highest") {
        const byAge = [...data].sort((a, b) => a.age - b.age);
        setData(byAge);
      } else if (selectedOption.value === "age highest to lowest") {
        const byAge = [...data].sort((a, b) => b.age - a.age);
        setData(byAge);
      } else if (selectedOption.value === "name") {
        const byName = [...data].sort((a, b) =>
          a.name?.toLowerCase().localeCompare(b.name?.toLowerCase())
        );
        setData(byName);
      } else if (selectedOption.value === "recent desc") {
        const byId = [...data].sort((a, b) => b.id - a.id);
        setData(byId);
      } else if (selectedOption.value === "recent asce") {
        const byId = [...data].sort((a, b) => a.id - b.id);
        setData(byId);
      }
    } else {
      console.log("Data is empty.");
    }
  };

  const handleFilter = () => {
    // Add any specific filter logic here if needed
  };

  return (
    <div>
      <div>
        <button onClick={handleFilter}>Filter</button>
        <Select options={options} onChange={handleChange} />
      </div>
      <div>
        <label className="radio">
          <input
            type="radio"
            value="boy"
            checked={selectedOption === "boy"}
            onChange={handleOptionChange}
          />
          Boy
        </label>
        <br />
        <label className="radio">
          <input
            type="radio"
            value="girl"
            checked={selectedOption === "girl"}
            onChange={handleOptionChange}
          />
          Girl
        </label>
        <br />
        <label className="radio">
          <input
            type="radio"
            value="any"
            checked={selectedOption === "any"}
            onChange={handleOptionChange}
          />
          All
        </label>
      </div>
      <div>
        <button type="" onClick={handleCreate}>
          <strong>Add</strong>
        </button>
        <h2>Users</h2>
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
                  <button onClick={() => handleView(item.id)}>View</button>
                  <button onClick={() => handleEdit(item.id)}>Edit</button>
                  
                  <button onClick={() => handleAssign(item.id)}>Assign Hobby</button>
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
