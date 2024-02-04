import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { projectId } from "../MISC/commonUsage";
import { RegisterUser } from "../API/userAPI";

export const Register = () => {
  const navigate = useNavigate();
  const [registerForm, setRegisterForm] = useState({
    ProjectID: projectId,
    Name: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    Role: "Guest",
  });

  const handleChange = (e) => {
    setRegisterForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await RegisterUser(registerForm);
      if (response) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="container position-absolute translate-middle top-50 start-50 d-flex justify-content-center">
      <form
        className="w-full max-w-lg border border-dark rounded-lg border-2 bg-form-bg p-4 form-bg"
        onSubmit={handleSubmit}
      >
        <div className="mb-6">
          <label
            className="block uppercase tracking-wide text-color text-xs font-bold mb-2"
            htmlFor="grid-name"
          >
            Full Name
          </label>
          <input
            className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-name"
            type="text"
            placeholder="example@domain.com"
            name="Name"
            onChange={handleChange}
            value={registerForm.Name}
          />
        </div>
        <div className="mb-6">
          <label
            className="block uppercase tracking-wide text-color text-xs font-bold mb-2"
            htmlFor="grid-email"
          >
            Email
          </label>
          <input
            className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-email"
            type="email"
            placeholder="example@domain.com"
            name="Email"
            onChange={handleChange}
            value={registerForm.Email}
          />
        </div>
        <div className="mb-6">
          <label
            className="block uppercase tracking-wide text-color text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            Password
          </label>
          <input
            className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-password"
            type="password"
            placeholder="******************"
            name="Password"
            onChange={handleChange}
            value={registerForm.Password}
          />
        </div>
        <div className="mb-6">
          <label
            className="block uppercase tracking-wide text-color text-xs font-bold mb-2"
            htmlFor="grid-confirm-password"
          >
            Confirm Password
          </label>
          <input
            className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-confirm-password"
            type="password"
            placeholder="******************"
            name="ConfirmPassword"
            onChange={handleChange}
            value={registerForm.ConfirmPassword}
          />
        </div>
        <div className="md:flex md:items-center pb-2">
          <div className="md:w-2/5"></div>
          <div className="md:w-3/5">
            <button
              className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </div>
        <div className="pb-2 text-center">
          <p className="mt-4">
            Already have an account?{" "}
            <button
              type="button"
              className="text-blue-500 hover:underline"
              onClick={() => navigate("/login")}
            >
              Log In
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};
