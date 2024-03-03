import React from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const Login = () => {
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-white p-16 rounded-lg shadow-2xl w-1/3">
        <h2 className="text-3xl font-bold mb-10 text-gray-800">Login</h2>
        <form>
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
