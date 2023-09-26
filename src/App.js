import "./App.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard"; // Add AdminDashboard import
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { setUserDetails } from "./features/user/userSlice";
import Setting from "./pages/Setting";

function App() {
  const user = useSelector((state) => state.user.userDetails);
  const dispatch = useDispatch();

  const fetchUser = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/users/${user.id}`);
      localStorage.setItem("user", JSON.stringify(res.data));
      dispatch(setUserDetails(res.data));
    } catch (error) {
      localStorage.removeItem("user");
      window.location.reload();
    }
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
        path="settings"
        element={user ? <Setting /> : <Navigate to="/" />}
      />
      <Route
        path="dashboard"
        element={
          user ? (
            user.role === "ADMIN" ? (
              <AdminDashboard />
            ) : (
              <UserDashboard />
            )
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="*"
        element={user ? <Navigate to="/dashboard" /> : <h1>404 Not Found</h1>}
      />
    </Routes>
  );
}

export default App;
