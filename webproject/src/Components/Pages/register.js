import { useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import { projectId } from "../MISC/commonUsage";
import { RegisterUser } from "../API/userAPI";

export const Register = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const [message, setMessage] = useState();
  const isLoading = navigation.state !== "idle";
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
    if (
      registerForm.Email &&
      registerForm.Password &&
      registerForm.Name &&
      registerForm.ConfirmPassword
    ) {
      if (registerForm.Password === registerForm.ConfirmPassword) {
        try {
          const response = await RegisterUser(registerForm);
          if (response) {
            navigate("/login");
          }
        } catch (error) {
          console.error("Error logging in:", error);
        }
      } else {
        setMessage("Passwords do not match");
      }
    } else if (
      !registerForm.Email ||
      !registerForm.Password ||
      !registerForm.Name ||
      !registerForm.ConfirmPassword
    ) {
      setMessage("Please fill all of the fields");
    }
  };

  return (
    <section className="bg-zinc-200 h-screen">
      <div
        className={`flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ${
          isLoading ? "loading" : ""
        }`}
      >
        <form
          id="detail"
          className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-8 p-3"
          onSubmit={handleSubmit}
        >
          <h1 className="text-xl pb-3 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
            Create a new account
          </h1>
          <p className="text-red-600 font-bold mb-2">{message}</p>
          <div className="mb-6">
            <label
              className="block uppercase tracking-wide text-color text-xs font-bold mb-2"
              htmlFor="grid-name"
            >
              Full Name
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              id="grid-name"
              type="text"
              placeholder="Please fill your full"
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
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
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
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
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
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              id="grid-confirm-password"
              type="password"
              placeholder="******************"
              name="ConfirmPassword"
              onChange={handleChange}
              value={registerForm.ConfirmPassword}
            />
          </div>
          <div className="flex justify-center">
            <button
              className="bg-zinc-300 text-black hover:bg-zinc-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              type="submit"
            >
              Sign Up
            </button>
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
    </section>
  );
};
