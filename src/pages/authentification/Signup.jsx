import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getError } from "../../../utile";
import { useSelector } from "react-redux";
import image from "../../assets/images/biblio.png";
import logo from "../../assets/images/logo.png";

function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword, username, email } = formData;
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const { data } = await Axios.post(
        import.meta.env.VITE_API_URI + "/users/signup",
        {
          username,
          email,
          password,
        }
      );
      navigate("/login");
    } catch (err) {
      setError(getError(err));
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/login");
    }
  }, [user]);
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex justify-center h-screen flex-row-reverse">
        <div
          className="hidden bg-cover lg:block lg:w-2/3"
          style={{
            backgroundImage: `url(${image})`,
          }}
        >
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Biblio
              </h2>

              <p className="max-w-xl mt-3 text-gray-100 font-medium">
                Explorez notre boutique en ligne spécialisée dans la fourniture
                d'articles indispensables pour les amateurs de livres. Trouvez
                des stylos élégants, des carnets de qualité, des marque-pages
                artistiques et plus encore
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center w-full max-w-md px-6 mx-auto">
          <div className="flex-1">
            <div className="text-center">
              <div className="flex justify-center mx-auto">
                <img
                  className="w-auto h-7 sm:h-8"
                  src={logo}
                  alt=""
                />
              </div>

              <p className="mt-3 text-gray-500 dark:text-gray-300">
                Sign up to create an account
              </p>
            </div>

            <div className="mt-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus-border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>

            <div className="mt-8">
              <form onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="example@example.com"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus-border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Your Password"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus-border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mt-6">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm Your Password"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus-border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </div>
                {error && (
                  <p className="text-sm text-red-500 p-2 font-normal">
                    {error}
                  </p>
                )}
                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                  >
                    Sign up
                  </button>
                </div>
              </form>

              <p className="mt-6 text-sm text-center text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-500 focus:outline-none focus:underline hover:underline"
                >
                  Sign in
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
