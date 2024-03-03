import React from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const Register = () => {
  const nameRef = React.useRef(null);
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  const confirmPasswordRef = React.useRef(null);
  const phoneRef = React.useRef(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    const phone = phoneRef.current.value;

    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    fetch("/api/employees/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, phone }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("Registration successful");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-white p-16 rounded-lg shadow-2xl w-1/3">
        <h2 className="text-3xl font-bold mb-10 text-gray-800">Register</h2>
        <form onSubmit={handleFormSubmit}>
          <Input
            label="Name"
            type="text"
            placeholder="John Doe"
            ref={nameRef}
          />
          <Input
            label="Email"
            type="email"
            placeholder="johndoe@xyz.com"
            ref={emailRef}
          />

          <Input
            label="Password"
            type="password"
            placeholder="********"
            ref={passwordRef}
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="********"
            ref={confirmPasswordRef}
          />

          <Input
            label="Phone Number"
            type="text"
            placeholder="1234567890"
            ref={phoneRef}
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
