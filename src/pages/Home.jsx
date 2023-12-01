import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Products from "../components/Products";
import { useDispatch, useSelector } from "react-redux";
import { setAll, setFiltred } from "../features/productSlice";
import axios from "axios";

function Home() {
  const productList = useSelector((state) => state.products.filtred);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(import.meta.env.VITE_API_URI + "/products");
        dispatch(setAll(result.data));
        dispatch(setFiltred(result.data));
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="flex justify-center">
      <aside className="hidden lg:block w-1/4 bg-gray-200 p-4 min-h-[100vh]">
        <Sidebar products={productList} />
      </aside>

      <main className="lg:w-3/4 w-full p-4">
        <h1 className="text-2xl font-semibold mb-4">Liste des produits</h1>
          <Products products={productList} />
      </main>
    </div>
  );
}

export default Home;
