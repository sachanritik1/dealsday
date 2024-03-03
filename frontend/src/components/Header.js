import React, { useEffect } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userAtom } from "../utils/atoms";
import Button from "./Button";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userAtom);
  const token = localStorage.getItem("token");
  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const res = await fetch(process.env.REACT_APP_API_URL + "/user/me", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const data = await res.json();
      if (!data.success) {
        localStorage.clear();
        navigate("/login");
      }
      setUser(data.user);
    }
    fetchUser();
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  return token ? (
    <div>
      <nav className="flex flex-wrap justify-between items-center py-2 bg-white text-black relative shadow-sm font-mono px-2">
        <Link to="/dashboard" className="py-4">
          Logo
        </Link>
        <Link
          to="/dashboard"
          className="py-4 hover:text-blue-700 hover:underline"
        >
          Home
        </Link>

        <Link
          to="/employee-list"
          className="py-4  hover:text-blue-700 hover:underline"
        >
          Employee List
        </Link>
        <div className="flex justify-between items-center gap-4">
          <p>@{user?.username}</p>

          <Button
            label={"Logout"}
            type={"button"}
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
            text="Logout"
          />
        </div>
      </nav>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Header;
