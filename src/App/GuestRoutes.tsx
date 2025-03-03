import Register from "../Auth/Register";
import Login from "../Auth/Login";
import { Route, Routes } from "react-router-dom";

export default function GuestRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
