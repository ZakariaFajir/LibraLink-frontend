import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { FaDoorClosed, FaDoorOpen, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../features/userSlice";
import logo from "../assets/images/logo.png";
import CartIcon from "./CartIcon";

const MenuItem = ({ to, text, icon, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="my-2 flex items-center gap-1 text-gray-700 transition-colors duration-300 transform hover:text-blue-500 md:mx-4 md:my-0"
  >
    {icon}
    {text}
  </Link>
);

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const cartItems = useSelector((state) => state.cartItems);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signout = () => {
    localStorage.removeItem("userInfo");
    dispatch(signOut());
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="relative bg-white shadow">
      <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between">
          <Link to="/">
            <img className="w-auto h-6 sm:h-7" src={logo} alt="" />
          </Link>

          <div
            className="flex md:hidden text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
            aria-label="toggle menu"
          >
            {isOpen ? (
              <FiX onClick={toggleMenu} className="w-6 h-6 cursor-pointer" />
            ) : (
              <div className="flex items-center gap-2">
                <CartIcon cartItems={cartItems} />
                <FiMenu onClick={toggleMenu} className="w-6 h-6 cursor-pointer" />
              </div>
            )}
          </div>
        </div>

        <div className={`md:flex ${isOpen ? "block" : "hidden"}`}>
          <div className="flex flex-col md:flex-row md:mx-6">
            <MenuItem to="/" text="Home" icon={null} onClick={toggleMenu} />
            <MenuItem
              to="/contact"
              text="Contact"
              icon={null}
              onClick={toggleMenu}
            />
            <MenuItem
              to="/about"
              text="About"
              icon={null}
              onClick={toggleMenu}
            />

            {!user ? (
              <MenuItem
                to="/login"
                text="Login"
                icon={<FaDoorOpen className="w-5 h-5" />}
              />
            ) : (
              <>
                <MenuItem
                  to="/order-history"
                  text="Order History"
                  icon={null}
                  onClick={toggleMenu}
                />
                <button
                  onClick={signout}
                  className="my-2 flex gap-1 items-center text-gray-700 transition-colors duration-300 transform  hover:text-blue-500 md:mx-4 md:my-0"
                >
                  <FaDoorClosed className="w-5 h-5" />
                  Logout
                </button>
              </>
            )}
          </div>

          <CartIcon cartItems={cartItems} />
        </div>
      </div>
    </nav>
  );
}

export default Header;
