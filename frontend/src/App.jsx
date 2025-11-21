import { Routes, Route } from "react-router-dom";
import ProductDetailsPage from "@pages/site/ProductDetailsPage";
import CategoryPage from "@pages/site/category/CategoryPage";
import Cart from "@pages/site/cart/Cart";
import Checkout from "./pages/site/Checkout/Checkout";
import AdminLayout from "@/layouts/admin/AdminLayout";
import './css/style.css';
import UserManagement from "./pages/admin/userManagement/UserManagement";
import VNPayReturn from "./pages/site/vnpay/VNPayReturn";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route path="admin/users" element={<UserManagement />} />
      </Route>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/category" element={<CategoryPage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/product/:slug" element={<ProductDetailsPage />} />
      <Route path="/vnpay-return" element={<VNPayReturn />} />
    </Routes>
  );
}

export default App;
