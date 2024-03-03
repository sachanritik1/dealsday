import React, { useEffect } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const usernameRef = React.useRef(null);
  const passwordRef = React.useRef(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    try {
      const res = await fetch(process.env.REACT_APP_API_URL + "/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const json = await res.json();
      if (json.success) {
        localStorage.setItem("token", json.token);
        navigate("/dashboard");
      } else {
        alert(json.message);
      }
    } catch (err) {
      console.log(err);
      alert("Failed to login");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-white p-16 rounded-lg shadow-2xl w-1/3">
        <h2 className="text-3xl font-bold mb-10 text-gray-800">Login</h2>
        <form onSubmit={handleLogin}>
          <Input
            label="Username"
            type="text"
            placeholder="johndoe123"
            reference={usernameRef}
          />

          <Input
            label="Password"
            type="password"
            placeholder="********"
            reference={passwordRef}
          />

          <Button label="Login" type="submit" />
        </form>
        <p className="mt-5 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
