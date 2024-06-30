import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { storeImage } from "../../../services/firebase";

const EditProduct = () => {
  const { slug } = useParams();
  const user = useSelector((state) => state.user);

  const [item, setItem] = useState({
    name: "",
    price: 0,
    category: "",
    image: "",
    imageFile: null
  });

  useEffect(() => {
    if (slug) {
      fetchItemBySlug(slug);
    }
  }, [slug]);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setItem((prevItem) => ({
        ...prevItem,
        imageFile: e.target.files[0]
      }));
    }
  };

  const fetchItemBySlug = async (slug) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URI}/products/slug/${slug}`,
        {
          headers: { authorization: `Bearer ${user.token}` }
        }
      );
      const existingItem = response.data;
      setItem(existingItem);
    } catch (error) {
      console.error("Error fetching item:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (item.imageFile) {
        item.image = await storeImage(item.imageFile);
      }

      if (slug) {
        await axios.put(
          `${import.meta.env.VITE_API_URI}/products/slug/${slug}`,
          item,
          {
            headers: { authorization: `Bearer ${user.token}` }
          }
        );
        toast.success("Product updated successfully");
      } else {
        await axios.post(`${import.meta.env.VITE_API_URI}/products`, item);
        toast.success("Product added successfully");
      }
      navigate("/manage-products");
    } catch (error) {
      console.error("Error adding/modifying item:", error);
      toast.error("Error adding/modifying item");
    }
  };

  return (
    <div className="container mx-auto mt-8 p-3">
      <h1 className="text-3xl font-semibold mb-4">
        {slug ? "Modify Item" : "Add New Item"}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={item.name}
            onChange={handleChange}
            className="p-2 border w-full border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Price:
          </label>
          <input
            type="number"
            name="price"
            value={item.price}
            onChange={handleChange}
            className="p-2 border w-full border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Category:
          </label>
          <input
            type="text"
            name="category"
            value={item.category}
            onChange={handleChange}
            className="p-2 border w-full border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Image:
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="p-2 border w-full border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-400 rounded-lg font-semibold text-white p-2"
        >
          {slug ? "Modify Item" : "Add Item"}
        </button>
        <button
          type="button"
          onClick={() => navigate("/manage-products")}
          className="bg-gray-500 hover:bg-gray-400 ml-3 rounded-lg font-semibold text-white p-2"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
