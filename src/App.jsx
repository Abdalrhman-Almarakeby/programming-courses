import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Course from "./pages/Course";
import AddCourse from "./pages/AddCourse";
import Account from "./pages/Account";
import Login from "./pages/Login";
import "./CSS/main.css";

export default function App() {
  return (
    <div className="relative flex min-h-[100svh] flex-col bg-[#e9f4f0] pt-16">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<Course />} />
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/account" element={<Account />} />
        <Route path="/auth">
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}
