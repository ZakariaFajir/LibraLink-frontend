import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaEdit, FaSearch, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const user = useSelector((state) => state.user);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URI + "/products"
        );
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (user && user.isAdmin) {
      fetchProducts();
    }
  }, [user]);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  const handleUpdate = (slug) => {
    navigate(`/manage-products/${slug}`);
  };

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ?`);

    if (!confirmDelete) {
      return;
    }
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URI}/products/${productId}`,
        {
          headers: { authorization: `Bearer ${user.token}` },
        }
      );
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleAdd = () => {
    navigate("/manage-products/add");
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">Manage Products</h1>

      <div className="flex relative mb-4">
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <FaSearch className="h-5 w-5 text-gray-400" />
        </span>
        <input
          type="text"
          placeholder="Search by name..."
          className="p-2 pl-8 w-full border border-gray-300 rounded-l mr-0 focus:outline-none focus:border-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <button
        onClick={handleAdd}
        className="bg-blue-400 hover:bg-blue-500 rounded-lg font-semibold text-white p-2 ml-2 mb-4"
      >
        Add New Product
      </button>
      {filteredProducts.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <li key={product._id} className="bg-blue-100">
              <div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover mb-2 rounded-md"
                />
              </div>
              <div className="p-3">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-gray-700">Price: {product.price} DH</p>
                <p className="text-gray-700">Category: {product.category}</p>
                <p className="text-gray-700">
                  Description: {product.description}
                </p>
                <div className="flex mt-2">
                  <button
                    onClick={() => handleUpdate(product.slug)}
                    className="bg-blue-400 hover:bg-blue-500 rounded-md text-white p-2 mr-2"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 hover:bg-red-600 rounded-md text-white p-2"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-5">
          {" "}
          <p className="text-2xl font-semibold mb-4">
            No products available.
          </p>{" "}
        </div>
      )}
    </div>
  );
};

export default ManageProduct;
