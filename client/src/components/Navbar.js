import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../Redux/UserSlice.js";
import axios from "axios";

export default function Navbar() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/auth/user`,
          {
            withCredentials: true,
          }
        );
        console.log(response);
        if (response.status === 200) return response.data.user;
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/auth/logout`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        await dispatch(logout());
      } else {
        console.error("Logout failed:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div>
      {userData ? (
        <div>
          <h1>hello, {userData.name}!</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
}
