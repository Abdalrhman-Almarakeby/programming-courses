import GoogleIcon from "../../assets/icons/social-media-Icons/google.svg?react";
import LinkedinIcon from "../../assets/icons/social-media-Icons/linkedin.svg?react";
import GithubIcon from "../../assets/icons/social-media-Icons/github.svg?react";

export default function Login() {
  return (
    <section className="container grid flex-grow place-items-center py-8">
      <form className="flex flex-col items-stretch gap-2 rounded-xl border bg-white p-8 text-center text-darkBlue shadow-1">
        <h1 className="pb-4 pt-2 text-4xl font-semibold">Log in</h1>
        <input className="text-sm" type="text" placeholder="Username" />
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

        {/* <p className="text-sm text-gray-600 hover:text-gray-700">
          Don<>&apos;</>t have an account?{" "}
          <a
            href="https://google.com"
            className="font-semibold text-emerald-800 hover:text-emerald-900"
          >
            Sign up
          </a>
        </p> */}

        <p className="text-sm text-gray-600">Or sign up using</p>

        <a
          href="https://courses-api-isuk.onrender.com/auth/google"
          className="flex max-w-xs items-center rounded-lg border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-darkBlue shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          <GoogleIcon className="mr-2 h-6 w-6" />
          <span>Continue with Google</span>
        </a>

        <a
          href="https://courses-api-isuk.onrender.com/auth/google"
          className="flex max-w-xs items-center rounded-lg border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-darkBlue shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          <LinkedinIcon className="mr-2 h-6 w-6" />
          <span>Continue with LinkedIn</span>
        </a>

        <a
          href="https://courses-api-isuk.onrender.com/auth/google"
          className="flex max-w-xs items-center rounded-lg border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-darkBlue shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          <GithubIcon className="mr-2 h-6 w-6" />
          <span>Continue with Github</span>
        </a>
      </form>
    </section>
  );
}
