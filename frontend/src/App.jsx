import { Routes, Route } from "react-router-dom";
import ProductDetailsPage from "@pages/site/ProductDetailsPage";
import CategoryPage from "@pages/site/category/CategoryPage";
import Home from "@pages/site/home/Home";
import AdminLayout from "@/layouts/admin/AdminLayout";
import './css/style.css';
import UserManagement from "./pages/admin/userManagement/UserManagement";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route path="admin/users" element={<UserManagement />} />
      </Route>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/category" element={<CategoryPage />} />
      <Route path="/product/:slug" element={<ProductDetailsPage />} />
    </Routes>
  );
}

export default App;
