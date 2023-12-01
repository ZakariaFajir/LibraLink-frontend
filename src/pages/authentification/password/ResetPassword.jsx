import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getError,
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from "../../../../utile";
import { setEmailReducer } from "../../../features/emailConfirmationSlice";

function ResetPassword() {
  const user = useSelector((state) => state.user);
  const email = useSelector((state) => state.email);
  const [password, setPassword] = useState();
  const [cpassword, setCPassword] = useState();
  const [token, setToken] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (password !== cpassword) {
        showErrorToast("Passwords do not match");
        return;
      }
      await axios.post(
        import.meta.env.VITE_API_URI + "/users/reset-password",
        {
          password,
          email,
        },
        { headers: { authorization: `Bearer ${token}` } }
      );
      localStorage.removeItem("resetPasswordToken");
      dispatch(setEmailReducer(email));
      showSuccessToast(
        "Your code confirmation is correct you can change your password now"
      );
      navigate("/login");
    } catch (err) {
      showErrorToast(getError(err));
    }
  };

  useEffect(() => {
    if (user || !email || email.length === 0) {
      if (user) {
        showInfoToast("You are already logged in");
        navigate("/");
      } else {
        navigate("/forgot-password");
      }
    } else {
      const resetPass = localStorage.getItem("resetPasswordToken")
        ? JSON.parse(localStorage.getItem("resetPasswordToken"))
        : [];

      setToken(resetPass?.token);
    }
  }, [user]);
  return (
    <div className="bg-white">
      <div className="flex items-center w-full h-[80vh] max-w-md px-6 mx-auto">
        <div className="flex-1">
          <div className="text-center">
            <h1 className="mt-3 text-gray-800 font-bold text-lg">
              New password
            </h1>
          </div>

          <div className="mt-8">
            <form onSubmit={submitHandler}>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm text-gray-600"
                >
                  New password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Type your new password"
                  className="block w-full px-4 py-2 mt-2 text-gray-700  bg-white border border-gray-200 rounded-l outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm text-gray-600"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="cpassword"
                  id="cpassword"
                  onChange={(e) => setCPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="block w-full px-4 py-2 mt-2 text-gray-700  bg-white border border-gray-200 rounded-l outline-none"
                />
              </div>

              <div className="mt-6">
                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
