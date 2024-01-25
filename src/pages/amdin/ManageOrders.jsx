import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.user);


  const [filterStatus, setFilterStatus] = useState("Pending");

  const handleAccept = async (orderId) => {
    try {
      const updatedOrders = orders.map((order) =>
        order._id === orderId ? { ...order, status: "Accepted" } : order
      );

      setOrders(updatedOrders);

      await axios.put(
        `${import.meta.env.VITE_API_URI}/api/orders/${orderId}`,
        {
          status: "Accepted",
        },
        {
          headers: { authorization: `Bearer ${user.token}` },
        }
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleDecline = async (orderId) => {
    try {
      const updatedOrders = orders.map((order) =>
        order._id === orderId ? { ...order, status: "Declined" } : order
      );

      setOrders(updatedOrders);

      await axios.put(
        `${import.meta.env.VITE_API_URI}/orders/${orderId}`,
        {
          status: "Declined",
        },
        {
          headers: { authorization: `Bearer ${user.token}` },
        }
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URI+"/orders", {
        headers: { authorization: `Bearer ${user.token}` },
      })
      .then((response) => {
        setOrders(response.data.orders);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  const filteredOrders = orders.filter((order) =>
    filterStatus === "All" ? true : order.status === filterStatus
  );

  return (
    <div className="bg-blue-100 min-h-[100vh] text-gray-700 p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Orders</h1>
      <div className="mb-4 flex items-center">
        <label className="mr-2 text-gray-700">Filter by Status:</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 bg-slate-100 cursor-pointer hover:bg-slate-50 rounded focus:outline-none focus:border-blue-500"
        >
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Declined">Declined</option>
          <option value="All">All</option>
        </select>
      </div>
      {filteredOrders?.length > 0 ? (
        <ul>
          {filteredOrders.map((order, index) => (
            <li key={index} className="mb-6 border-b border-white pb-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <strong>User:</strong>{" "}
                  <span className="font-medium text-sm uppercase">
                    {order.user}
                  </span>
                </div>
                <div className="space-x-2">
                  <span className="text-sm">Status:</span>
                  <span
                    className={`inline-block px-2 font-semibold py-1 ${
                      order.status === "Pending"
                        ? "bg-yellow-500"
                        : order.status === "Accepted"
                        ? "bg-green-500"
                        : "bg-red-500"
                    } rounded`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <strong>Items:</strong>
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center text-sm space-x-2"
                  >
                    <span className="text-gray-900">
                      {item.quantity} x {item.name} (<strong>Price:</strong>{" "}
                      {item.price} DH)
                    </span>
                  </div>
                ))}
              </div>

              <div
                className={`mt-4 transition-opacity duration-500 ease-in-out `}
              >
                {order.status === "Pending" && (
                  <>
                    <button
                      onClick={() => handleAccept(order._id)}
                      className="bg-green-500 text-white p-2 rounded-full mr-2 hover:bg-green-600 transition-opacity"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() => handleDecline(order._id)}
                      className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-opacity"
                    >
                      <FaTimes />
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-5">
          {" "}
          <p className="text-2xl font-semibold mb-4">
            No orders available.
          </p>{" "}
        </div>
      )}
    </div>
  );
};

export default ManageOrders;
