import { Routes, Route } from "react-router-dom";
import ProductDetailsPage from "@pages/site/ProductDetailsPage";
import CategoryPage from "@pages/site/category/CategoryPage";
import Home from "@pages/site/home/Home";
import Cart from "@pages/site/cart/Cart";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category" element={<CategoryPage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/product/:slug" element={<ProductDetailsPage />} />
    </Routes>
  );
}

export default App;
