import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="container flex flex-grow items-center justify-center px-5 py-12 text-center md:px-12 lg:px-16 lg:py-24">
      <main className="text-center">
        <h1 className="text-4xl font-bold leading-none tracking-tighter text-darkBlue md:text-5xl lg:max-w-7xl lg:text-6xl">
          Find The Best <span className="text-emerald-800">Free</span> Courses All{" "}
          <br className="hidden lg:block" /> Around The Internet
        </h1>

        <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-darkBlue">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor beatae harum, excepturi
          pariatur aspernatur architecto?
        </p>
        <div className="mx-auto mt-6 flex w-full max-w-2xl justify-center gap-2">
          <Link
            to="/courses"
            className="transform rounded-xl bg-emerald-800 px-5 py-2.5 text-center text-base font-medium text-[#e9f4f0] transition duration-500 ease-in-out hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 lg:px-10"
          >
            Browse Courses
          </Link>
          <Link
            to="/auth/signup"
            className="block transform items-center rounded-xl border-2 border-[#e9f4f0] px-5 py-2 text-center text-base font-medium text-emerald-800 shadow-md transition duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 lg:px-10"
          >
            Create Account
          </Link>
        </div>
      </main>
    </section>
  );
}
