import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getError, showErrorToast, showInfoToast, showSuccessToast } from "../../../../utils";

function CodeConfirmation() {
  const user = useSelector((state) => state.user);
  const email = useSelector((state) => state.email);
  const [code, setCode] = useState();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } =await  axios.post(import.meta.env.VITE_API_URI + "/password/code-confirmation", {
        code,
        email,
      });
      localStorage.setItem("resetPasswordToken", JSON.stringify(data));
      showSuccessToast("Your code confirmation is correct you can change your password now")
      navigate("/reset-password");
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
              Code Confirmation
            </h1>
          </div>

          <div className="mt-8">
            <form onSubmit={submitHandler}>
              <div>
                <label
                  htmlFor="code"
                  className="block mb-2 text-sm text-gray-600"
                >
                  Code Confirmation
                </label>
                <input
                  type="text"
                  name="code"
                  id="code"
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Type your code confirmation"
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

export default CodeConfirmation;
