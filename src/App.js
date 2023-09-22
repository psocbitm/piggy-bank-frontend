import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import UserDashboard from "./pages/UserDashboard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { setUserDetails } from "./features/user/userSlice";

function App() {
  const user = useSelector((state) => state.user.userDetails);
  const dispatch = useDispatch();
  const fetchUser = async () => {
    const res = await axios.get(`
    http://localhost:8080/api/users/${user.id}
    `);
    localStorage.setItem("user", JSON.stringify(res.data));
    dispatch(setUserDetails(res.data));
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      fetchUser();
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="register"
        element={user ? <Navigate to="/" /> : <Register />}
      />
      <Route path="login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route
        path="user"
        element={user ? <UserDashboard /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

export default App;
