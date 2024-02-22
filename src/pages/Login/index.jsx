import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useStorage";
import Loading from "../../components/Loading";
import ShowIcon from "../../assets/icons/show-eye.svg?react";
import HideIcon from "../../assets/icons/hide-eye.svg?react";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const { setValue: setToken } = useLocalStorage("token", "");

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

    const response = await fetch("https://courses-api-isuk.onrender.com/auth/login", {
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

  return (
    <section className="container grid flex-grow place-items-center py-6 md:py-8">
      {isLoading && <Loading />}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-stretch gap-2 rounded-xl border bg-white px-6 py-8 text-center text-darkBlue shadow-1"
      >
        <h1 className="pb-4 pt-2 text-4xl font-semibold">Log in</h1>
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
                setShowPassword(true);
                setTimeout(() => {
                  setShowPassword(false);
                }, 300);
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
        <a
          href="https://google.com"
          className="self-start text-sm text-gray-600 hover:text-gray-900"
        >
          Forget password?
        </a>
        <button className="my-2 rounded-md bg-emerald-800 px-4 py-2 text-white transition hover:bg-emerald-900">
          Login
        </button>

        <p className="text-sm text-gray-600 hover:text-gray-700">
          Don<>&apos;</>t have an account?{" "}
          <Link to="/auth/signup" className="font-semibold text-emerald-800 hover:text-emerald-900">
            Sign up
          </Link>
        </p>
      </form>
    </section>
  );
}

/*  import { useState } from "react";
import Loading from "../../components/Loading";
import GoogleIcon from "../../assets/icons/social-media-Icons/google.svg?react";
import LinkedinIcon from "../../assets/icons/social-media-Icons/linkedin.svg?react";
import GithubIcon from "../../assets/icons/social-media-Icons/github.svg?react";
import { Link } from "react-router-dom";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <section className="container grid flex-grow place-items-center py-6 md:py-8">
      {isLoading && <Loading />}
      <form className="flex flex-col items-stretch gap-2 rounded-xl border bg-white px-6 py-8 text-center text-darkBlue shadow-1">
        <h1 className="pb-4 pt-2 text-4xl font-semibold">Log in</h1>
        <input className="text-sm" type="text" placeholder="name" />
        <input className="text-sm" type="password" placeholder="Password" />
        <a
          href="https://google.com"
          className="self-start text-sm text-gray-600 hover:text-gray-900"
        >
          Forget password?
        </a>
        <button className="my-2 rounded-md bg-emerald-800 px-4 py-2 text-white transition hover:bg-emerald-900">
          Login
        </button>

        <p className="text-sm text-gray-600 hover:text-gray-700">
          Don<>&apos;</>t have an account?{" "}
          <Link to="/auth/signup" className="font-semibold text-emerald-800 hover:text-emerald-900">
            Sign up
          </Link>
        </p>
        
        <p className="text-sm text-gray-600">Or Continue using</p>
        <a
          href="https://courses-api-isuk.onrender.com/auth/google"
          className="flex max-w-xs items-center rounded-lg border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-darkBlue shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          onClick={() => setIsLoading(true)}
        >
          <GoogleIcon className="mr-2 h-6 w-6" />
          <span>Continue with Google</span>
        </a>
        <a
          href="https://courses-api-isuk.onrender.com/auth/google"
          className="flex max-w-xs items-center rounded-lg border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-darkBlue shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          onClick={() => setIsLoading(true)}
        >
          <LinkedinIcon className="mr-2 h-6 w-6" />
          <span>Continue with LinkedIn</span>
        </a>
        <a
          href="https://courses-api-isuk.onrender.com/auth/google"
          className="flex max-w-xs items-center rounded-lg border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-darkBlue shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          onClick={() => setIsLoading(true)}
        >
          <GithubIcon className="mr-2 h-6 w-6" />
          <span>Continue with Github</span>
        </a>
      </form>
    </section>
  );
}
 */
