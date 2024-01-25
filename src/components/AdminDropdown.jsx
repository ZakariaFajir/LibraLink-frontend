import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdminDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={toggleDropdown}
        className="inline-flex justify-center rounded-md bg-white py-2 text-gray-700 
        hover:bg-gray-50 my-2  gap-1 items-center transition-colors duration-300 transform  hover:text-blue-500 md:mx-2 md:my-0"
      >
        Admin
        <svg
          className="-mr-1 h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        onClick={toggleDropdown}
        >
          <div className="py-1" role="none">
            <Link
              to="/manage-products"
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
              role="menuitem"
              tabIndex="-1"
            >
              Manage Products
            </Link>
            <Link
              to="/manage-orders"
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
              role="menuitem"
              tabIndex="-1"
            >
              Manage Orders
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDropdown;
