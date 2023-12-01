import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cartSlice";

function Products({ products }) {
  const cartItems = useSelector((state) => state.cartItems) || [];
  const dispatch = useDispatch();

  const addToCartHandler = async (product) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    dispatch(addToCart({ ...product, quantity }));
  };

  return (
    <div className="mt-5">
      <h2 className="font-bold text-[30px] dark:text-white">Products</h2>
      <div className="grid grid-auto gap-4">
        {products?.map((product, index) => (
          <div className="bg-slate-200 rounded-lg mt-5 flex justify-evenly flex-col" key={index}>
            <Link to={`/product/${product.slug}`}>
              <img
                className="h-[270px] rounded-t w-full object-cover"
                src={product.image}
              />
            </Link>
            <div className="p-2">
            <span className="font-semibold text-[18px]">
              {product.name}
            </span>
            <span className="font-semibold text-[16px] text-gray-600 block">
              {product.category}
            </span>
            <div className="flex justify-between items-center">
              <h2 className="dark:text-white text-[20px] font-bold">
                {product.price}$
              </h2>
              <button onClick={() => addToCartHandler(product)} className="px-4 py-1 m-1 text-[16px] transition ease-in duration-200 uppercase rounded-full hover:bg-blue-500 hover:text-white border border-gray-700 focus:outline-none">
                Add to cart
              </button>
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
