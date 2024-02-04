import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../API/userAPI";

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
    if (loginForm.Email && loginForm.Password) {
      try {
        const response = await LoginUser(loginForm);

        if (response && response.data.token) {
          navigate("/home");
        } else {
          setMessage("Token not found in the response");
        }
      } catch (error) {
        console.error("Error during login:", error);
        setMessage("Wrong Credentials");
      }
    } else if (!loginForm.Email && !loginForm.Password) {
      setMessage("Please fill Credentials");
    }
  };
  return (
    <section className="bg-zinc-200 h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Sign in to your account
            </h1>
            <p className="text-red-600 font-bold">{message}</p>
            <div className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Email
                </label>
                <input
                  type="text"
                  name="Email"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Email"
                  required=""
                  onChange={handleChange}
                  value={loginForm.Email}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="Password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required=""
                  onChange={handleChange}
                  value={loginForm.Password}
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="btn"
                  className="bg-zinc-300 text-black hover:bg-zinc-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={HandleSubmit}
                >
                  Sign in
                </button>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
