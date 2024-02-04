import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { DarkMode } from "../DarkMode/DarkMode";
const navigationList = [
  { to: "/home", label: "Home" },
  { to: "/favorites", label: "Favorites" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact Us" },
];

export const NavBar = (props) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const toggleProfileLinks = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };
  const logOut = () => {
    localStorage.removeItem("USER_TOKEN");
  };
  return (
    <>
      <nav className="navbar navbar-expand align-items-center d-flex bd-highlight ">
        <div className="me-auto p-2 bd-highlight bd-highlight p-font">
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
              className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              onClick={toggleProfileLinks}
            >
              <span className="absolute -inset-1.5"></span>
              <span className="sr-only">Open user menu</span>
              <img
                className="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User Profile"
              />
            </button>
          </div>
          <div
            className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
              profileMenuOpen ? "block" : "hidden"
            }`}
          >
            <a
              href="/profile"
              className="block px-4 py-2 text-sm text-gray-700"
            >
              Your Profile
            </a>
            <a
              onClick={logOut}
              href="/login"
              className="block px-4 py-2 text-sm text-gray-700"
            >
              Sign out
            </a>
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
