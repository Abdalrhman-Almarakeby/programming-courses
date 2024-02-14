import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useScrollDirection } from "../hooks/useScrollDirection";
import hamburgerIcon from "../assets/icons/icon-hamburger.svg";
import closeIcon from "../assets/icons/icon-close.svg";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [onTop, setOnTop] = useState(true);
  const { pathname } = useLocation();
  const scrollDirection = useScrollDirection();

  const menuRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    // close the menu when the window is scrolled by down or up more than 50px
    let prevScrollPos = window.scrollY;

    window.addEventListener("scroll", () => {
      if (window.scrollY < 50) {
        setOnTop(true);
      } else {
        setOnTop(false);
      }

      let currentScrollPos = window.scrollY;
      let scrollDown = currentScrollPos > prevScrollPos;
      let scrollUp = currentScrollPos < prevScrollPos;
      let scrollAmount = Math.abs(currentScrollPos - prevScrollPos);

      if ((menuOpen && scrollDown && scrollAmount > 5) || (scrollUp && scrollAmount > 5)) {
        setMenuOpen(false);
      }

      prevScrollPos = currentScrollPos;
    });

    // close the menu when click out side it
    // and when the target of the event isn't the open and close icon
    function handleMenuBlur(e) {
      if (!menuRef.current.contains(e.target) && e.target !== iconRef.current) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("click", handleMenuBlur);

    return () => document?.removeEventListener("click", handleMenuBlur);
  }, [menuOpen]);

  return (
    <header
      className={`bg-emerald-800 z-30 fixed w-full transition-[top] duration-300 text-white ${
        !(scrollDirection === "down") || onTop ? "top-0" : "-top-full"
      }`}
    >
      <nav className="flex items-center gap-8 overflow-x-hidden py-4 pl-4 pr-8 md:container">
        <h1 className="mr-auto text-xl font-semibold">
          <Link to="/" className="whitespace-nowrap">
            Programming Courses
          </Link>
        </h1>
        {/********/}
        <button
          className="z-50 md:hidden"
          ref={iconRef}
          onClick={() => setMenuOpen((prevMenuOpen) => !prevMenuOpen)}
        >
          <img
            src={menuOpen ? closeIcon : hamburgerIcon}
            alt={`${menuOpen ? "Close" : "Hamburger"} Icon`}
            className="pointer-events-none w-6 cursor-pointer"
          />
        </button>
        {/********/}
        <ul
          ref={menuRef}
          className={` ${
            menuOpen
              ? "right-0 pointer-events-auto "
              : "-right-full pointer-events-none md:visible md:pointer-events-auto"
          }  bg-emerald-800  pt-20 md:pt-0 duration-300 flex-col-reverse absolute top-0 px-4 md:p-0 flex md:min-h-0 min-h-[100svh] items-center md:flex-row md:bg-auto md:z-auto justify-end md:justify-end gap-4 transition-[right] md:static`}
          onTransitionEnd={(e) => {
            if (menuOpen) {
              e.target.classList.add("visible");
              e.target.classList.remove("invisible");
            } else {
              e.target.classList.add("invisible");
              e.target.classList.remove("visible");
            }
          }}
        >
          <li onClick={() => setMenuOpen(false)}>
            <Link to="/courses">Courses</Link>
          </li>
          <li onClick={() => setMenuOpen(false)}>
            <Link to="/add-course">Add Course</Link>
          </li>
          {/* {!pathname.includes("auth") && (
            <li onClick={()=> setMenuOpen(false)}>
              <Link to="/account">
                <img
                  src="https://placehold.co/100"
                  alt="Avatar"
                  className="h-10 w-10 rounded-full"
                />
              </Link>
            </li>
          )} */}

          <li onClick={() => setMenuOpen(false)}>
            <Link
              to="/auth/login"
              className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-darkBlue"
            >
              Log in
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}