import Intro from "../Containers/Intro/Intro";
import Home from "../Containers/Home/Home";
import { Route, Routes } from "react-router-dom";

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="/intro" element={<Intro />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
}
