import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/cartSlice";
import axios from "axios";
import AddToCartButton from "../../components/AddToCartButton";
import Loading from "../../components/Loading";

const Product = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItems);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_API_URI}/products/slug/${slug}`
        );
        setProduct(result.data);
      } catch (err) {
        navigate("/product-not-found");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug, navigate]);

  const addToCartHandler = () => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    dispatch(addToCart({ ...product, quantity }));
  };

  return (
    <div className="p-4 w-full">
      {loading ? (
        <div className="h-[100vh] flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        product && (
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
                <AddToCartButton onClick={addToCartHandler} />
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Product;
