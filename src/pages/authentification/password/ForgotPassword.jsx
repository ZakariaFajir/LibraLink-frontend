import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getError, showErrorToast, showInfoToast, showSuccessToast } from "../../../../utils";
import { setEmailReducer } from "../../../features/emailConfirmationSlice";

function ForgotPassword() {
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState()
  const dispatch = useDispatch()

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        import.meta.env.VITE_API_URI  + "/password/forgot",
        {
          email,
        },
      );
      dispatch(setEmailReducer(email))
      showSuccessToast("A code confirmation has been sent to your email" )
      navigate("/forgot-password/code-confirmation");
    } catch (err) {
      showErrorToast(getError(err))
    }
  };

  useEffect(() => {
    if (user) {
      showInfoToast("You are already logged in")
      navigate("/");
    }
  }, [user]);
  return (
    <div className="bg-white">
      <div className="flex items-center w-full h-[80vh] max-w-md px-6 mx-auto">
        <div className="flex-1">
          <div className="text-center">
            <h1 className="mt-3 text-gray-800 font-bold text-lg">
              Type your email address
            </h1>
          </div>

          <div className="mt-8">
            <form onSubmit={submitHandler}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm text-gray-600"
                >
                  email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Type your email address"
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

export default ForgotPassword;
