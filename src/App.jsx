import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useUser } from "./context/UserContext";
import { useLocalStorage } from "./hooks/useStorage";
import useFetch from "./hooks/useFetch";
import Loading from "./components/Loading";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Course from "./pages/Course";
import AddCourse from "./pages/AddCourse";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Error from "./pages/Error";
import "./CSS/main.css";

export default function App() {
  const { setUser } = useUser();

  const { value: token } = useLocalStorage("token", "");
  const { data: userData, isPending } = useFetch(
    "https://courses-api-isuk.onrender.com/account",
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: token,
      },
    },
    []
  );

  useEffect(() => {
    if (userData) setUser(userData);
  }, [setUser, userData]);

  return (
    <div className="relative flex min-h-[100svh] flex-col bg-[#e9f4f0] pt-16">
      {isPending && <Loading />}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<Course />} />
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/account" element={<Account />} />
        <Route path="/auth">
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}
