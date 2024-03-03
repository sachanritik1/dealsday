import React, { useEffect } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const usernameRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  const confirmPasswordRef = React.useRef(null);

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    if (password.length < 8) {
      return alert("Password must be at least 8 characters long");
    }
    if (!/\d/.test(password)) {
      return alert("Password must contain a number");
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return alert("Password must contain a special character");
    }

    try {
      const res = await fetch(
        process.env.REACT_APP_API_URL + "/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const json = await res.json();
      if (json.success) {
        navigate("/login");
      } else {
        alert(json.message);
      }
    } catch (err) {
      console.log(err);
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
        <h2 className="text-3xl font-bold mb-10 text-gray-800">Register</h2>
        <form onSubmit={handleFormSubmit}>
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

          <Input
            label="Confirm Password"
            type="password"
            placeholder="********"
            reference={confirmPasswordRef}
          />

          <Button label="Register" type="submit" />
        </form>
        <p className="mt-5 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
