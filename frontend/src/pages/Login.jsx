import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://car-rental-5zqp.onrender.com/api/auth/login`,
        form
      );
      localStorage.setItem("token", res.data.token);
      navigate("/feed");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1729182326584-ae7e82d2f5aa?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <form
        className="bg-white bg-opacity-80 backdrop-blur-md p-8 rounded-xl shadow-lg w-96 flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

        <input
          name="email"
          placeholder="Email Address"
          type="email"
          onChange={handleChange}
          required
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
          required
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition duration-200"
        >
          Login
        </button>

        <p className="text-center text-gray-700 text-sm">
          Don't have an account?{" "}
          <span
            className="text-blue-600 hover:text-blue-800 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
