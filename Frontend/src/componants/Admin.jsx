import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useRoutes } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Admin = () => {
  const [data, setData] = useState([]);

  // const {route} = useRoutes();

  const location = useLocation();

  const loadData = async () => {
    console.log("handle route change here", location);

    const result = await axios.get("http://localhost:3001/admin");
    setData(result.data);
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    //
    <div class="container">
      <div className="centered">
        <h1>Admin Panel</h1>
      </div>
     
       
       
      {/* Notice section */}
      <div className="centered">
        <p>Notice Section</p>
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          Enter Notice Heading
        </label>
        <input class="form-control my-3" id="exampleFormControlInput1" />
        <label for="exampleFormControlInput1" class="form-label">
          Enter Notice Body
        </label>
        <input class="form-control" id="exampleFormControlInput1" />
        <input type="submit" className="btn btn-success my-3" value="Submit" />
      </div>

      <div className="centered">
        <h1>Data View from Database</h1>
      </div>
      <Link to="add">
        <button type="button" class="btn btn-success my-3">
          Add Field
        </button>
      </Link>
      <table class="table border shadow">
        <thead class="thead-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Company</th>
            <th>Salary (in lpa)</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((user, index) => {
            return (
              <tr key={user.id}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.Company}</td>
                <td>{user.Salary}</td>
                <td>
                  {" "}
                  <Link to={`/admin/edit/${user.id}`}>
                    {" "}
                    <button type="button" class="btn btn-warning">
                      Edit
                    </button>
                  </Link>
                  <button
                    type="button"
                    class="btn btn-danger mx-3"
                    onClick={() => {
                      axios.delete(`http://localhost:3001/delete/${user.id}`);
                      alert("Deleted Successfully");
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
