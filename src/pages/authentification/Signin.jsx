import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getError } from "../../../utile";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../features/userSlice";
import { GoogleLogin } from "@react-oauth/google";
import image from "../../assets/images/biblio.png";
import logo from "../../assets/images/logo.png";

function Signin() {
  const user = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    try {
      const { data } = await Axios.post(
        import.meta.env.VITE_API_URI + "/users/signin",
        {
          email,
          password,
        }
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch(signIn(data));
    } catch (err) {
      setError(getError(err));
    }
  };
  const loginSuccess = async (resp) => {
    try {
      const { data } = await Axios.post(
        import.meta.env.VITE_API_URI + "/users/signin",
        {
          idToken: resp.credential,
          clientId: resp.clientId,
        }
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch(signIn(data));
    } catch (err) {
      setError(getError(err));
    }
  };

  useEffect(() => {
    if (user) {
      navigate(redirect);
    }
  }, [user]);
  return (
    <div className="bg-white">
      <div className="flex justify-center h-screen">
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

        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <div className="flex justify-center mx-auto">
                <img
                  className="w-auto h-7 sm:h-8"
                  src={logo}
                  alt=""
                />
              </div>

              <p className="mt-3 text-gray-500">
                Sign in to access your account
              </p>
            </div>

            <div className="mt-8">
              <form onSubmit={submitHandler}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-gray-600"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="example@example.com"
                    onChange={handleInputChange}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-l focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="mt-6 ">
                  <div className="flex justify-between mb-2">
                    <label htmlFor="password" className="text-sm text-gray-600">
                      Password
                    </label>
                  </div>

                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Your Password"
                    onChange={handleInputChange}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg     focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  <div className="flex justify-end">
                    <Link
                      to="/forgot-password"
                      className="text-sm mt-2 text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
                {error && (
                  <p className="text-sm text-red-500 p-2 font-normal">
                    {error}
                  </p>
                )}
                <div className="mt-6">
                  <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                    Sign in
                  </button>
                </div>
              </form>
              <div className="mt-6">
                <GoogleLogin
                  onSuccess={(credentialResponse) =>
                    loginSuccess(credentialResponse)
                  }
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
                ;
              </div>

              <p className="mt-6 text-sm text-center text-gray-400">
                Don&#x27;t have an account yet?
                <Link
                  to="/register"
                  className="text-blue-500 focus:outline-none focus:underline hover:underline"
                >
                  Sign up
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

export default Signin;
