import "./App.css";
import { IoMdClose } from "react-icons/io";

function App() {
  return (
    <>
      <div className="container">
        <button className="btn btn-add"> Add</button>
        <div className="addContainer mt-5">
          <form>
            <div className="d-flex align-items-center close-btn  me-5">
              <IoMdClose />
            </div>
            <div className="mb-3  ">
              <label htmlFor="fullName" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter Your Name"
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
                placeholder="name@example.com"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="mobile" className="form-label">
                mobile
              </label>
              <input
                type="password"
                className="form-control"
                id="mobile"
                placeholder="Enter your Mobile Number"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
