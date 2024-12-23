import { useState } from "react";
import api from "../service/api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { errorMessage, successMessage } from "../utils/toastNotifications";
import { Link } from "react-router-dom";
import Button from "./Button";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPass] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmpassword) {
      return errorMessage("Password is not matching!");
    }
    try {
      await api.post("/auth/register", {
        username,
        email,
        password,
      });
      successMessage("Register Successfully");
    } catch (err) {
      errorMessage(err.response?.data?.message || "Server error");
      console.error(err);
    }
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <ToastContainer />
      <form
        className="bg-white w-1/3 flex flex-col space-y-2 py-5 px-3 rounded-sm"
        onSubmit={handleSubmit}
      >
        <h2 className="text-center text-2xl font-semibold truncate">
          Register
        </h2>
        <label htmlFor="username">Username</label>
        <input
          className="border border-gray-300 rounded p-2"
          type="username"
          placeholder="Enter username"
          name="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          required
        />
        <label htmlFor="email">Emial</label>
        <input
          className="border border-gray-300 rounded p-2"
          type="email"
          placeholder="Enter email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          className="border border-gray-300 rounded p-2"
          type="password"
          placeholder="Enter Password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
        <label htmlFor="confirmpassword">Confirm Password</label>
        <input
          className="border border-gray-300 rounded p-2"
          type="password"
          placeholder="Enter Password"
          name="confirmpassword"
          value={confirmpassword}
          onChange={(e) => {
            setConfirmPass(e.target.value);
          }}
          required
        />
        <Button type="submit" className="bg-blue-500 text-white mt-2">
          Submit
        </Button>
        <div>
          Already have account
          <Link to="/login">
            {" "}
            <small className="underline text-blue-600">Login Here</small>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
