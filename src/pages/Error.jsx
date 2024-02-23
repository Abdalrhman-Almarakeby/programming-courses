import { Link } from "react-router-dom";

export default function Error() {
  return (
    <section className="container flex flex-grow flex-col items-center p-16">
      <div className="flex max-w-md flex-col gap-6 text-center">
        <h2 className="text-9xl font-extrabold text-emerald-800">
          <span className="sr-only">Error</span>404
        </h2>
        <p className="text-2xl text-darkBlue md:text-3xl">
          Sorry, we couldn<>&apos;</>t find this page.
        </p>
        <Link
          to="/"
          className="rounded bg-emerald-800 px-8 py-4 text-xl font-semibold text-[#e9f4f0]"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
