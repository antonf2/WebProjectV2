import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { DarkMode } from "../DarkMode/DarkMode";
import personSvg from "./person.svg";
import jwtDecode from "jwt-decode";

export const NavBar = (props) => {
  const [navigationList, setNavigationList] = useState([
    { to: "/home", label: "Home" },
    { to: "/favorites", label: "Favorites" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact Us" },
  ]);
  const userToken = jwtDecode(localStorage.getItem("USER_TOKEN"));
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const toggleProfileLinks = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };
  const logOut = () => {
    localStorage.removeItem("USER_TOKEN");
  };

  useEffect(() => {
    if (userToken.Role === "Admin") {
      setNavigationList((prev) => [
        ...prev,
        { to: "/dashboard", label: "Management" },
      ]);
    }
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand bd-highlight ">
        <div className="ml-5 me-auto p-2 bd-highlight bd-highlight p-font">
          <h1>BIZSPOT</h1>
        </div>
        <div className="p-2 bd-highlight">
          <DarkMode />
        </div>
        <div className={`p-2 bd-highlight nav-links ${menuOpen ? "show" : ""}`}>
          {navigationList.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              onClick={() => {
                setMenuOpen(!menuOpen);
              }}
              className="btn nav-text-css"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="relative ml-3">
          <div>
            <button
              type="button"
              className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              onClick={toggleProfileLinks}
            >
              <span className="absolute -inset-1.5"></span>
              <span className="sr-only">Open user menu</span>
              <img
                className="bg-zinc-200 h-8 w-8 rounded-full "
                src={personSvg}
                alt="User menu Button"
              />
            </button>
          </div>
          <div
            className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
              profileMenuOpen ? "block" : "hidden"
            }`}
          >
            <Link
              to="/profile"
              className="block px-4 py-2 text-sm text-gray-700"
            >
              My Profile
            </Link>

            {userToken.Role !== "Guest" && (
              <Link
                to="/my_cards"
                className="block px-4 py-2 text-sm text-gray-700"
              >
                My Cards
              </Link>
            )}
            <Link
              onClick={logOut}
              to="/login"
              className="block px-4 py-2 text-sm text-gray-700"
            >
              Sign out
            </Link>
          </div>
        </div>
        <div className="nav-toggle-css">
          <button
            className="mobile-menu-button"
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
            aria-label="Toggle Mobile Menu"
          >
            ☰
          </button>
        </div>
      </nav>
      {props.children}
    </>
  );
};
