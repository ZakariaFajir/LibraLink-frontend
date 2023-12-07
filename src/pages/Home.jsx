import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Products from "../components/Products";
import { useDispatch, useSelector } from "react-redux";
import { setAll, setFiltred } from "../features/productSlice";
import axios from "axios";
import Loading from "../components/Loading";

function Home() {
  const productList = useSelector((state) => state.products.filtred);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await axios.get(
          import.meta.env.VITE_API_URI + "/products"
        );
        dispatch(setAll(result.data));
        dispatch(setFiltred(result.data));
      } catch (err) {
        dispatch(fetchFailed());
        setError(err.message);
      }
      finally {
        setLoading(false)
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="flex justify-center">
      {loading ? (
        <div className="h-[100vh] flex items-center">
          <Loading />
        </div>
      ) : error ? (
        <span className="text-red-600 mt-12 font-bold text-lg">{`Error: ${error}`}</span>
        ) : (
        <>
          <aside className="hidden lg:block w-1/4 bg-gray-200 p-4 min-h-[100vh]">
            <Sidebar products={productList} />
          </aside>
          <main className="lg:w-3/4 w-full p-4">
            <h1 className="text-2xl font-semibold mb-4">Liste des produits</h1>
            <Products products={productList} />
          </main>
        </>
      )}
    </div>
  );
}

export default Home;
