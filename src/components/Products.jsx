import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cartSlice";
import AddToCartButton from "./AddToCartButton";
import { toast } from "react-toastify";
import { showSuccessToast } from "../../utils";

function Products({ products }) {
  const cartItems = useSelector((state) => state.cartItems) || [];
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const addToCartHandler = async (product) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    dispatch(addToCart({ ...product, quantity }));
    const message = `${product.name} a été ajouté à votre panier avec succès!`;

    showSuccessToast(message, "top-center");
  };

  return (
    <div className="mt-5">
      <h2 className="font-bold text-[30px] dark:text-white">Products</h2>
      <div className="grid grid-auto gap-4">
        {products?.map((product, index) => (
          <div
            className="bg-slate-200 rounded-lg mt-5 flex justify-between flex-col"
            key={index}
          >
            <Link to={`/product/${product.slug}`}>
              <img
                className="h-[270px] rounded-t w-full object-cover"
                src={product.image}
              />
            </Link>

            <span className="p-2 font-semibold text-[18px]">
              {product.name}
            </span>
            <div className="p-2">
              <span className="font-semibold text-[16px] text-gray-600 block">
                {product.category}
              </span>
              <div className="flex justify-between items-center">
                <h2 className="dark:text-white text-[18px] font-semibold">
                  {product.price} DHs
                </h2>
                <AddToCartButton onClick={() => addToCartHandler(product)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
