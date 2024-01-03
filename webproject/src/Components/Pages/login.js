import { useState } from "react";
import { LoginUser } from "../MISC/api";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState();
  const [loginForm, setLoginForm] = useState({
    Email: "",
    Password: "",
  });

  const handleChange = (e) => {
    setLoginForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    e.persist();

    console.log("Submit button clicked");

    if (loginForm.Email && loginForm.Password) {
      try {
        console.log("Attempting to login...");

        const response = await LoginUser(loginForm);
        console.log("Login response:", response);

        if (response && response.data.token) {
          console.log("Going to /home");
          navigate("/home");
        } else {
          console.log("Token not found in the response");
          setMessage("Token not found in the response");
        }
      } catch (error) {
        console.error("Error during login:", error);
        setMessage("Wrong Credentials");
      }
    } else if (!loginForm.Email && !loginForm.Password) {
      console.log("Credentials not filled");
      setMessage("Please fill Credentials");
    }
  };
  return (
    <div className="container position-absolute top-50 start-50 translate-middle d-flex justify-content-center">
      <form
        className="w-full max-w-sm border border-dark rounded-lg border-2 bg-form-bg p-3 form-bg "
        onSubmit={HandleSubmit}
      >
        <p className="text-red-600 font-bold text-center">{message}</p>
        <div className="mb-6 pt-4 pr-6 ml-1">
          <div className="md:flex md:items-center mb-4">
            <div className="md:w-1/3">
              <label
                className="block text-color font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-email"
              >
                Email
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-dark-500"
                id="inline-email"
                type="text"
                name="Email"
                placeholder="example@domain.com"
                onChange={handleChange}
                value={loginForm.Email}
              />
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3">
              <label
                className="block text-color font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-password"
              >
                Password
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-dark-500"
                id="inline-password"
                name="Password"
                type="password"
                placeholder="******************"
                value={loginForm.Password}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="md:flex md:items-center pb-4">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </div>
        <p className="mt-2 mb-2 text-center">
          Dont have an account?{" "}
          <button
            type="button"
            className="text-blue-500 hover:underline"
            onClick={() => navigate("/register")}
          >
            Get Started
          </button>
        </p>
      </form>
    </div>
  );
};
