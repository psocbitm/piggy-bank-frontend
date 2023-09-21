import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import UserDashboard from "./pages/UserDashboard";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user.userDetails);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="register" element={user ? <Navigate to="/" /> : <Register />} />
      <Route
        path="login"
        element={user ? <Navigate to="/" /> : <Login />}
      />
      <Route path="user" element={<UserDashboard />} />
    </Routes>
  );
}

export default App;
