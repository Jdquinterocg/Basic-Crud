import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import uniqid from "uniqid";

const Component = () => {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [error, setError] = useState(null);
  const [id, setId] = useState("");
  const [edit, setEdit] = useState(false);

  const saveName = (event) => {
    event.preventDefault();
    if (!name.trim()) {
      setError("The camp is empty");
      return;
    } else {
      const newName = {
        id: uniqid(),
        listName: name,
      };

      setList([...list, newName]);
      setName("");
      setError(null);
    }
  };

  const deleteName = (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
  };

  const editName = (item) => {
    setEdit(true);
    setName(item.listName);
    setId(item.id);
  };

  const nameEdited = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("The camp is empty");
      return;
    } else {
        const newName = list.map(item => item.id === id ? {id:id, listName: name}:item);
        setList(newName);
        setError(null);
    }
    setEdit(false);
    setName('');
  };

  return (
    <div className="container">
      <h1>Basic CRUD</h1>
      <div className="row">
        <div className="col">
          <h1>Names</h1>
          <ul className="list-group">
            {list.map((item) => (
              <li key={item.id} className="list-group-item">
                {item.listName}
                <button
                  className="btn btn-danger float-end"
                  onClick={() => deleteName(item.id)}
                >
                  Delete
                </button>

                <button
                  className="btn btn-primary float-end"
                  onClick={() => editName(item)}
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="col">
          <h1>Form to add or edit names</h1>
          <form onSubmit={edit ? nameEdited : saveName}>
            <input
              onChange={(e) => setName(e.target.value)}
              placeholder="Introduce the name"
              className="form-control mb-3"
              value={name}
            />
            <button className="btn btn-primary">
              {edit ? "Edit the name" : "Register the name"}
            </button>
            {
                (error != null) ? 
                
                <div className="alert alert-danger mt-3" role="alert">
                    {error}
                </div>
                :
                <div></div>
                
            }
          </form>

        </div>
      </div>
    </div>
  );
};

export default Component;
