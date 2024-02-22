import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Products from "../components/Products";
import { useDispatch, useSelector } from "react-redux";
import { setAll, setFiltred } from "../features/productSlice";
import axios from "axios";
import Loading from "../components/Loading";
import { useLocation, useNavigate } from "react-router-dom";

function Home() {
  const productList = useSelector((state) => state.products.filtred);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;
  const [totalProductsCount, setTotalProductsCount] = useState(0);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearch = queryParams.get("query") || "";
  const initialCategory = queryParams.get("category") || "";
  const navigate = useNavigate();

  const [filtringTools, setFiltringTools] = useState({
    search: initialSearch,
    category: initialCategory,
  });
  const handleSearchClick = () => {
    const query = filtringTools.search
      ? `query=${encodeURIComponent(filtringTools.search)}`
      : "";
    const category = filtringTools.category
      ? `category=${encodeURIComponent(filtringTools.category)}`
      : "";

    if (query || category) {
      const newUrl = `${[query, category].filter(Boolean).join("&")}`;
      navigate({
        pathname: location.pathname,
        search: newUrl,
      });
    }
    else {
      navigate({
        pathname: location.pathname,
        search: '',
      });
    }
  };

  const generatePageNumbers = (totalPages, currentPage) => {
    const maxPageNumbers = 5;
    const halfMaxPageNumbers = Math.floor(maxPageNumbers / 2);

    if (totalPages <= maxPageNumbers) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= halfMaxPageNumbers) {
      return Array.from({ length: maxPageNumbers }, (_, index) => index + 1);
    }

    if (currentPage >= totalPages - halfMaxPageNumbers) {
      return Array.from(
        { length: maxPageNumbers },
        (_, index) => totalPages - maxPageNumbers + index + 1
      );
    }

    return Array.from(
      { length: maxPageNumbers },
      (_, index) => currentPage - halfMaxPageNumbers + index
    );
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await axios.get(
        import.meta.env.VITE_API_URI + "/products",
        {
          params: {
            limit: productsPerPage,
            offset: (currentPage - 1) * productsPerPage,
            search: queryParams.get("query") || "",
            category: queryParams.get("category") || "",
          },
        }
      );

      setTotalProductsCount(result.data.totalProductsCount);
      dispatch(setAll(result.data.products));
      dispatch(setFiltred(result.data.products));
    } catch (err) {
      if (err.response.status === 404) {
        setTotalProductsCount(0);
        dispatch(setAll([]));
        dispatch(setFiltred([]));
      } else setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch, currentPage, location.search]);

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
            <Sidebar
              handleSearchClick={handleSearchClick}
              filtringTools={filtringTools}
              setFiltringTools={setFiltringTools}
            />
          </aside>
          {productList.length === 0 ? (
            <>
              <div className="lg:w-3/4 w-full p-4">
                <p className="text-2xl font-semibold mb-4">
                  No products available.
                </p>
              </div>
            </>
          ) : (
            <>
              <main className="lg:w-3/4 w-full p-4">
                <h1 className="text-2xl font-semibold mb-4">
                  Liste des produits
                </h1>
                <Products products={productList} />

                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="mr-2 px-4 py-2 bg-gray-300"
                  >
                    Précédent
                  </button>

                  {generatePageNumbers(
                    Math.ceil(totalProductsCount / productsPerPage),
                    currentPage
                  ).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      disabled={currentPage === page}
                      className={`mx-1 px-3 py-1 ${
                        currentPage === page
                          ? "bg-gray-500 text-white"
                          : "bg-gray-300"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={
                      currentPage ===
                      Math.ceil(totalProductsCount / productsPerPage)
                    }
                    className="ml-2 px-4 py-2 bg-gray-300"
                  >
                    Suivant
                  </button>
                </div>
              </main>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
