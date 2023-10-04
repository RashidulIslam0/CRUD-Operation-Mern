import { useEffect, useState } from "react";
import "./App.css";
import { IoMdClose } from "react-icons/io";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/";
function App() {
  const [addSection, setAddSection] = useState(false);
  const [formData, setFormData] = useState([
    {
      name: "",
      email: "",
      mobile: "",
    },
  ]);

  const [allData, setAllData] = useState([]);
  // State to store all fetched data
  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    // created data
    try {
      const response = await axios.post("/create", formData);
      console.log("Server response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // fetch all data
  const fetchData = async () => {
    try {
      const response = await axios.get("/");
      setAllData(response.data.data); // Update the state with the fetched data
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  // delete data

  const hendleDelete = async (userId) => {
    try {
      const response = await axios.delete("/delete/" + userId);
      alert(response.data.message);
      if (response.data.message) {
        fetchData();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="container">
        <button className="btn btn-add" onClick={() => setAddSection(true)}>
          Add
        </button>
        {addSection && (
          <div>
            <div className="addContainer mt-5">
              <form onSubmit={submitHandler}>
                <div
                  className="d-flex align-items-center close-btn me-5"
                  onClick={() => setAddSection(false)}
                >
                  <IoMdClose />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Enter Your Name"
                    onChange={handleOnChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="name@example.com"
                    onChange={handleOnChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="mobile" className="form-label">
                    Mobile
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="mobile"
                    name="mobile"
                    placeholder="Enter your Mobile Number"
                    onChange={handleOnChange}
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}

        <table className="table mt-3">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {allData.map((el, index) => {
              return (
                <tr key={index}>
                  <td>{el.name}</td>
                  <td>{el.email}</td>
                  <td>{el.mobile}</td>
                  <td>
                    <button className="btn btn-primary">Edit</button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => hendleDelete(el._id)}
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
    </>
  );
}

export default App;
