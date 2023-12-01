import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getError,
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from "../../../../utile";
import { removeAll } from "../../../features/cartSlice";

function OrderConfirmation() {
  const user = useSelector((state) => state.user);
  const cartItems = useSelector((state) => state.cartItems);
  const [total, setTotal] = useState();
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      phoneNumber.length != 10 ||
      (phoneNumber.startsWith("+212") &&
        (phoneNumber.length != 12 || phoneNumber.length != 13))
    ) {
      toast.error("Invalid phone number");
      return;
    } else {
      try {
        await axios.post(
          import.meta.env.VITE_API_URI + "/confirm-order",
          {
            username: user.username,
            cartItems,
            phoneNumber,
            total,
          },
          {
            headers: { authorization: `Bearer ${user.token}` },
          }
        );
        showSuccessToast("Order Confirmed Successfully");
        localStorage.removeItem("cartItems");
        dispatch(removeAll());
        navigate("/");
      } catch (err) {
        showErrorToast(getError(err));
      }
    }
  };

  useEffect(() => {
    if (!user || cartItems?.length === 0) {
      if (!user) {
        showInfoToast("Try to login first");
        navigate("/login?redirect=/confirm-order");
      } else {
        navigate("/");
      }
    } else {
      setTotal(cartItems.reduce((a, c) => a + c.price * c.quantity, 0));
    }
  }, [user, cartItems]);
  return (
    <div className="bg-white">
      <div className="flex items-center h-[100vh] w-[80%] lg:w-[60%] bg-blue-50 p-4 rounded-md px-6 mx-auto">
        <div className="flex-1">
          <div className="text-center">
            <h1 className="mt-3 text-gray-800 font-bold text-4xl">
              Confirm your order
            </h1>
          </div>

          <div className="mt-8">
            <form onSubmit={submitHandler}>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm text-gray-600"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={user?.username}
                  readOnly
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-l outline-none"
                />
              </div>

              <div className="mt-6">
                <div className="flex justify-between mb-2">
                  <label
                    htmlFor="phonenumber"
                    className="text-sm text-gray-600"
                  >
                    Phone Number
                  </label>
                </div>
                <input
                  type="text"
                  name="phonenumber"
                  id="phonenumber"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  value={phoneNumber}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div className="flex justify-between py-3">
                <span className="font-semibold text-[16px]">Order total</span>
                <span className="font-semibold text-[16px]">{total}$</span>
              </div>

              <div className="mt-6 flex gap-3">
                <button className="w-1/3 px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                  Confirm
                </button>
                <div
                  onClick={() => navigate("/cart")}
                  className="w-1/3 cursor-pointer px-4 text-center py-2 tracking-wide text-white transition-colors duration-300 transform bg-gray-500 rounded-lg hover:bg-gray-400 focus:outline-none focus:bg-gray-400 focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                >
                  Cancel
                </div>
              </div>
            </form>
            <div className="mt-4 p-4 bg-blue-100 border border-blue-400 text-gray-700 rounded">
              <p className="font-semibold">Order Confirmation</p>
              <p>
                Après avoir passé votre commande, un email sera envoyé au
                propriétaire de la bibliothèque avec les détails de votre
                commande. Une fois votre commande prête, nous vous contacter
                pour planifier la livraison.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default OrderConfirmation;
