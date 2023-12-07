import React, { useEffect, useState } from "react";
import { FaCaretDown, FaSearch } from "react-icons/fa";
import Checkbox from "./Checkbox";
import { setFiltred } from "../features/productSlice";
import { useDispatch, useSelector } from "react-redux";

function Sidebar() {
  const [showCategories, setShowCategories] = useState(false);
  const [filtringTools, setFiltringTools] = useState({
    search: "",
    categories: {},
  });
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.products.all);

  const handleCheckboxChange = (event, category) => {
    const isChecked = event.target.checked;
    setFiltringTools((prevSelected) => ({
      ...prevSelected,
      categories: {
        ...prevSelected.categories,
        [category]: isChecked,
      },
    }));
  };

  useEffect(() => {
    const filteredProducts = productList.filter((product) => {
      const categoryFilter =
        Object.keys(filtringTools.categories).some(
          (category) => filtringTools.categories[category]
        ) &&
        !filtringTools.categories[product.category];

      const searchFilter =
        filtringTools.search.length > 0 &&
        (!product.category.toLowerCase().includes(filtringTools.search.toLowerCase()) &&
          !product.name.toLowerCase().includes(filtringTools.search.toLowerCase()));

      return !categoryFilter && !searchFilter;
    });

    dispatch(setFiltred(filteredProducts));
  }, [filtringTools]);

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
                onClick={(event) => handleCheckboxChange(event, "Fournitures de bureau")}
                category="Fournitures de bureau"
              />
              <Checkbox
                onClick={(event) => handleCheckboxChange(event, "Accessoires")}
                category="Accessoires"
              />
              <Checkbox
                onClick={(event) => handleCheckboxChange(event, "Jouets")}
                category="Jouets"
              />
              <Checkbox
                onClick={(event) => handleCheckboxChange(event, "Mobilier de bibliothèque")}
                category="Mobilier de bibliothèque"
              />
            </>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
