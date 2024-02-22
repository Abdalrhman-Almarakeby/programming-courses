import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useStorage";
import Loading from "../../components/Loading";
import ShowIcon from "../../assets/icons/show-eye.svg?react";
import HideIcon from "../../assets/icons/hide-eye.svg?react";

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const { setValue: setToken } = useLocalStorage("token", "");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setShowPassword(false);

    const response = await fetch("https://courses-api-isuk.onrender.com/auth/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    setIsLoading(false);
    if (response.ok) {
      console.log(data);
      setToken(data.token);
      setTimeout(() => navigate("/"), 0);
    } else {
      console.log(data);
      setErrors(data);
    }
  }
  console.log(errors);
  return (
    <section className="container grid flex-grow place-items-center py-6 md:py-8">
      {isLoading && <Loading />}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-stretch gap-2 rounded-xl border bg-white px-6 py-8 text-center text-darkBlue shadow-1"
      >
        <h1 className="pb-4 pt-2 text-4xl font-semibold">Sign up</h1>
        {errors.length > 0 &&
          errors.map((error) => (
            <p
              key={error}
              className="rounded border border-red-600 bg-red-300 px-2 py-1 text-sm text-red-600"
            >
              {error}
            </p>
          ))}
        <input
          className="text-sm"
          type="text"
          name="name"
          onChange={handleChange}
          value={formData.name}
          placeholder="User Name"
          inputMode="text"
          minLength="4"
          maxLength="20"
          required
        />
        <input
          className="text-sm"
          type="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
          placeholder="Email"
          inputMode="email"
          required
        />
        <div className="relative">
          <input
            className="relative text-sm"
            type={showPassword ? "text" : "password"}
            name="password"
            onChange={handleChange}
            value={formData.password}
            inputMode="text"
            placeholder="Password"
            minLength="8"
            maxLength="20"
            required
          />
          {showPassword ? (
            <ShowIcon
              onClick={(e) => {
                e.stopPropagation();
                setShowPassword(false);
              }}
              className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer fill-darkBlue"
            />
          ) : (
            <HideIcon
              onClick={(e) => {
                e.stopPropagation();
                setShowPassword(true);
              }}
              className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer fill-darkBlue"
            />
          )}
        </div>
        <div className="relative">
          <input
            className="relative text-sm"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            onChange={handleChange}
            value={formData.confirmPassword}
            inputMode="text"
            placeholder="Password"
            minLength="8"
            maxLength="20"
            required
          />
          {showConfirmPassword ? (
            <ShowIcon
              onClick={(e) => {
                e.stopPropagation();
                setShowConfirmPassword(false);
              }}
              className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer fill-darkBlue"
            />
          ) : (
            <HideIcon
              onClick={(e) => {
                e.stopPropagation();
                setShowConfirmPassword(true);
              }}
              className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer fill-darkBlue"
            />
          )}
        </div>
        <button className="my-2 rounded-md bg-emerald-800 px-4 py-2 text-white transition hover:bg-emerald-900">
          Sign up
        </button>

        <p className="text-sm text-gray-600 hover:text-gray-700">
          Already have an account?{" "}
          <Link to="/auth/login" className="font-semibold text-emerald-800 hover:text-emerald-900">
            Log in
          </Link>
        </p>
      </form>
    </section>
  );
}
