import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="footer-div-css shadow dark:bg-gray-800 fixed bottom-0 w-full">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <p className="text-sm text-color sm:text-center dark:text-gray-400">
          © 2023 BizSpot™. All Rights Reserved.
        </p>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-color sm:mt-0 nav-links">
          <li>
            <Link to="/about" className="mr-4 hover:underline md:mr-6">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:underline">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};
