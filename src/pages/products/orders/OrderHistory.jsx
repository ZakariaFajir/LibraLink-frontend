import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showInfoToast } from "../../../../utils";
import Loading from "../../../components/Loading";

const OrderHistoryPage = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URI}/order-history/${user.username}`,
          {
            headers: { authorization: `Bearer ${user.token}` },
          }
        );
        setOrderHistory(response.data.orderHistory);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (!user) {
      showInfoToast("Try to login first");
      navigate("/login");
    } else {
      fetchOrderHistory();
    }
  }, [user, navigate]);

  const getStatusBackgroundColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100';
      case 'Accepted':
        return 'bg-green-100';
      case 'Declined':
        return 'bg-red-100';
      default:
        return '';
    }
  };

  return (
    <div className="bg-blue-100 min-h-[100vh] pt-8">
      <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">
        Historique des commandes de {user?.username}
      </h1>

      {loading ? (
        <Loading />
      ) : error ? (
        <span className="text-red-600 mt-12 font-bold text-lg">{`Error: ${error}`}</span>
      ) : orderHistory?.length > 0 ? (
        <ul className="space-y-4">
          {orderHistory.map((order, index) => (
            <li
              key={index}
              className={`p-4 rounded-md shadow-md ${getStatusBackgroundColor(
                order.status
              )}`}
            >
              <h2 className="text-xl font-semibold mb-2">
                Commande #{index + 1}
              </h2>
              <p className="text-gray-700">Status: {order.status}</p>
              <p className="text-gray-700">Total: {order.total}$</p>
              <ul className="mt-2">
                {order.items?.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex justify-between">
                    <span>{item.name}</span>
                    <span>
                      {item.quantity} x {item.price}$
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">Aucune commande trouvée.</p>
      )}
    </div>
    </div>
    
  );
};

export default OrderHistoryPage;
