import Register from "../Auth/Register";
import Login from "../Auth/Login";
import { Route, Routes } from "react-router-dom";
import Intro from "../Containers/Intro/Intro";

export default function GuestRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/intro" element={<Intro />} />
    </Routes>
  );
}
