import { Link } from "react-router-dom";
import api from "../service/api";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { errorMessage, successMessage } from "../utils/toastNotifications";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ispassword, setIsPasswordText] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleisPassword(e) {
    e.preventDefault();
    setIsPasswordText((prev) => !prev);
  }
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });
      login(response.data.token, response.data.user);
      successMessage("Login Successfully");
      navigate("/posts");
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
        <h2 className="text-center text-2xl font-semibold truncate">Login</h2>
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
        <div className="relative">
          <input
            className="w-full border border-gray-300 rounded p-2"
            type={ispassword ? "password" : "text"}
            placeholder="Enter Password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <button className="absolute right-3 top-3" onClick={handleisPassword}>
            {ispassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </button>
        </div>
        <Button type="submit" className="bg-blue-500 text-white mt-2">
          Submit
        </Button>
        <div>
          Don&apos;t have account
          <Link to="/register">
            {" "}
            <small className="underline text-blue-600">Register Here</small>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
