import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/cartSlice";
import axios from "axios";

const Product = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItems);
  const [product, setProduct] = useState();
  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_API_URI}/products/slug/${slug}`
        );
        setProduct(result.data);
      } catch (err) {
        console.error(err);
        navigate('/product-not-found')
      }
    };
    fetchData();
  }, [slug]);
  const addToCartHandler = async () => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    console.log(quantity);
    dispatch(addToCart({ ...product, quantity }));
  };

  return (
    product && (
      <div className="p-4 w-full">
        <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
          <img
            className="h-96 w-full object-cover object-center"
            src={product.image}
            alt={product.name}
          />
          <div className="p-6">
            <h2 className="text-2xl font-semibold title-font mb-2">
              {product.name}
            </h2>
            <p className="text-base leading-relaxed mb-5">
              {product.description}
            </p>
            <div className="flex items-center flex-wrap justify-between">
              <span className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
                Price: ${product.price}
              </span>
              <button
                onClick={addToCartHandler}
                className="px-4 py-1 m-1 text-[16px] transition ease-in duration-200 uppercase rounded-full bg-blue-500 text-white border focus:outline-none"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Product;