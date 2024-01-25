import React, { useState } from "react";
import { FaCaretDown, FaSearch } from "react-icons/fa";
import Checkbox from "./Checkbox";

function Sidebar({ filtringTools, setFiltringTools, handleSearchClick }) {
  const [showCategories, setShowCategories] = useState(false);

  const handleCheckboxChange = (event, category) => {
    setFiltringTools((prevSelected) => {
      return {
        ...prevSelected,
        category,
      };
    });
  };

  return (
    <div className="fixed left-0 z-50 bg-white rounded-md p-2 w-[20%] ml-4">
      <h3 className="font-bold text-[18px]">Filters</h3>
      <div className="relative mt-3">
        <FaSearch className="absolute left-2 top-[50%] transform -translate-y-1/2" />
        <input
          onChange={(e) =>
            setFiltringTools({ ...filtringTools, search: e.target.value })
          }
          className="pl-7 p-2 bg-slate-100 w-full rounded-lg border border-gray-500 focus:border-blue-500 focus:border-2 outline-none"
          type="text"
          placeholder="Search your item"
        />
      </div>
      <button
        onClick={handleSearchClick}
        className="bg-blue-500 text-white p-2 mt-3 rounded-md"
      >
        Search
      </button>
      <ul className="text-gray-600 font-semibold mt-3">
        <li>
          <div
            className="flex justify-between border-b p-2 cursor-pointer hover:bg-slate-50  border-gray-300"
            onClick={() => setShowCategories(!showCategories)}
          >
            <span>Category</span>
            <FaCaretDown
              className={`w-4 h-4 text-gray-500  ${
                showCategories ? "rotate-[270deg]" : null
              }`}
            />
          </div>

          {showCategories && (
            <>
              <Checkbox
                onClick={(event) => handleCheckboxChange(event, "Papeterie")}
                category="Papeterie"
              />
              <Checkbox
                onClick={(event) =>
                  handleCheckboxChange(event, "Fournituredebureau")
                }
                category="Fournituredebureau"
              />
            </>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
