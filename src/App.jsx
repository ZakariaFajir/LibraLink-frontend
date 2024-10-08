import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signin from "./pages/authentification/Signin";
import Header from "./components/Header";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Cart from "./pages/products/Cart";
import ProductOverview from "./pages/products/Product";
import NotFound from "./pages/NotFound";
import OrderConfirmation from "./pages/products/orders/OrderConfirmation";
import OrderHistoryPage from "./pages/products/orders/OrderHistory";
import ForgotPassword from "./pages/authentification/password/ForgotPassword";
import CodeConfirmation from "./pages/authentification/password/CodeConfirmation";
import ResetPassword from "./pages/authentification/password/ResetPassword";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ManageOrders from "./pages/amdin/ManageOrders";
import ManageProduct from "./pages/amdin/ManageProducts";
import EditProduct from "./pages/amdin/EditProduct";
import { useSelector } from "react-redux";

export default function App() {
  const user = useSelector((state) => state.user);

  const isAdmin = () => {
    return user && user.isAdmin;
  };

  const PrivateRoute = ({ element }) => {
    return isAdmin() ? (
      element
    ) : (
      <Navigate to="/login" replace />
    );
  };
  return (
    <Router>
      <ToastContainer limit={1} autoClose={1500} />
      <Header />
      <div className="pt-16">
        <Routes>
          <Route path="/product/:slug" element={<ProductOverview />} />
          {/* home element should be displayed for auth */}
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" replace />} />
          <Route path="/" element={ <PrivateRoute element={<Home />} /> } />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/confirm-order" element={<OrderConfirmation />} />
          <Route path="/order-history" element={<OrderHistoryPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/manage-orders"
            element={<PrivateRoute element={<ManageOrders />} />}
          />
          <Route
            path="/manage-products"
            element={<PrivateRoute element={<ManageProduct />} />}
          />
          <Route
            path="/manage-products/add"
            element={<PrivateRoute element={<EditProduct />} />}
          />
          <Route
            path="/manage-products/:slug"
            element={<PrivateRoute element={<EditProduct />} />}
          />

          <Route
            path="/forgot-password/code-confirmation"
            element={<CodeConfirmation />}
          />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}
