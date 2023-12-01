// CartIcon.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const CartIcon = ({ cartItems }) => {
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="relative p-2">
      {totalQuantity > 0 && (
        <span className="absolute top-0 left-0 p-[2px] text-white bg-blue-500 rounded-full text-xs">
          {totalQuantity}
        </span>
      )}
      <Link
        className="text-gray-700 transition-colors duration-300 transform hover:text-gray-600"
        to="/cart"
      >
        <FaShoppingCart className="w-5 h-5 hover:text-blue-500" />
      </Link>
    </div>
  );
};

export default CartIcon;
