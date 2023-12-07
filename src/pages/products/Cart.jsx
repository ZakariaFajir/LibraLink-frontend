import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../features/cartSlice";

function Cart() {
  const cartItems = useSelector((state) => state.cartItems);
  const [total, setTotal] = useState(0)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeItemHandler = (item) => {
    dispatch(removeFromCart(item));
  };

  const addToCartHandler = (e, product) => {
    dispatch(
      addToCart({ ...product, quantity: parseInt(e.target.value || 0, 10) })
    );
  };
  useEffect(()=> {
    setTotal(cartItems?.reduce((a, c) => a + c.price * c.quantity, 0).toFixed(2))

  },[cartItems])

  return (
    <div className="border border-gray-500 md:w-[90%] w-[95%] mx-auto mt-4 rounded-lg p-1">
      {cartItems?.length === 0 ? (
        <div
          className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
          role="alert"
        >
          <p className="font-bold">Cart is empty.</p>
          <Link to="/" className="underline">
            Go to Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="border-b border-gray-500 p-5 flex justify-between w-[100%] md:w-[60%]">
            <h1 className="font-bold text-[30px]">Shopping Cart</h1>
            <a
            href="#order"
              className="md:hidden flex items-center text-[14px] text-white p-2 font-semibold duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400"
            >
              Scroll to Order
            </a>
          </div>
          <div className="flex flex-col md:flex-row mt-3">
            <div className="md:w-[60%]">
              {cartItems?.map((cart, index) => (
                <div className="flex justify-between mb-5" key={index}>
                  <div className="flex">
                    <div className="rounded-lg bg-slate-300 p-1 ">
                      <img
                        src={cart.image}
                        alt={cart.name}
                        className="w-[170px] h-[170px] object-cover rounded-2xl"
                      />
                    </div>
                    <div className="flex flex-col justify-between p-2">
                      <div className="w-[150px]">
                        <h3 className="font-normal text-[16px]">{cart.name}</h3>
                        <span className="font-light text-[14px]">
                          {(cart.price * cart.quantity).toFixed(2)}$
                        </span>
                      </div>
                      <span className="font-extralight text-[12px]">
                        In stock
                      </span>
                    </div>
                  </div>
                  <div >
                    <input
                      type="number"
                      className="w-[70px] p-2 bg-slate-100 rounded-lg text-[12px]"
                      placeholder="Quantity"
                      value={cart.quantity}
                      onChange={(e) => addToCartHandler(e, cart)}
                      min={0}
                    />
                  </div>
                  <div>
                    <FiX
                      onClick={() => removeItemHandler(cart)}
                      className="w-5 h-5 text-slate-500 cursor-pointer"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="md:bg-gray-200  rounded-lg p-5 mx-auto md:w-[25%] w-full  max-h-[270px]">
              <h1 className="font-semibold pt-2 md:border-none text-[15px] border-t border-gray-500 md:text-[18px] mb-2">
                Order Summary
              </h1>
              <div className="flex flex-col md:flex-row justify-between py-3  border-b border-gray-500">
                <span className="font-normal text-[14px] text-gray-600">
                  Total
                </span>
                <span className="font-normal text-[14px] text-gray-600">
                  {total}$
                </span>
              </div>
              <div className="flex flex-col md:flex-row justify-between py-3 border-b border-gray-500">
                <span className="font-normal text-[14px] text-gray-600">
                  Livraison
                </span>
                <span className="font-normal text-[14px] text-gray-600">
                  0$
                </span>
              </div>
              <div className="flex justify-center mt-3">
                <button
                id="order"
                  onClick={() => navigate("/confirm-order")}
                  className="w-full text-[16px] text-white p-2 font-semibold duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                >
                  Order
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
