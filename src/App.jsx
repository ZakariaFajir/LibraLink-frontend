import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./pages/authentification/Signin";
import Signup from "./pages/authentification/Signup";
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

export default function App() {
  return (
    <Router>
      <ToastContainer limit={1}/>
      <Header />
      <Routes>
        <Route path="/product/:slug" element={<ProductOverview />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/confirm-order" element={<OrderConfirmation />} />
        <Route path="/order-history" element={<OrderHistoryPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forgot-password/code-confirmation" element={<CodeConfirmation />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/*" element={<NotFound />} />

      </Routes>
    </Router>
  );
}
