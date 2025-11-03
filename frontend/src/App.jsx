import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetailsPage from "@pages/site/ProductDetailsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/product/:slug" element={<ProductDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
