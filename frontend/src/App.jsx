import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, useContext } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import { Spin } from "antd";

import { UserContext } from "./contexts/UserContext";

import ProductDetailsPage from "@pages/site/ProductDetailsPage";
import CategoryPage from "@pages/site/category/CategoryPage";
import Cart from "@pages/site/cart/Cart";
import Checkout from "@/pages/site/Checkout/Checkout";
import Home from "@pages/site/home/Home";

import UserManagement from "./pages/admin/userManagement/UserManagement";
import VNPayReturn from "./pages/site/vnpay/VNPayReturn";

import Page403 from "@/pages/site/page403/Page403";
import Page500 from "@pages/page500/Page500";
import Page404 from "@pages/site/page404/Page404";

import AdminLayout from "@/layouts/admin/AdminLayout";
import PrivateRoute from "@/utils/PrivateRoute";
import SiteLayout from "@/layouts/site/SiteLayout";
import AccountLayout from "@/layouts/site/AccountLayout";

import AccountInfo from "@pages/site/account/accountInfo/AccountInfo";
import ChangePasswordPage from "@pages/site/account/changePassword/ChangePassword";
import Profile from "./pages/site/profile/Profile";

import "./css/style.css";

function App() {
  const { user } = useContext(UserContext);

  return (
    <>
      <Router>
        <Suspense
          fallback={
            <div className="pt-3 text-center">
              <Spin size="large" />
            </div>
          }
        >
          <Routes>
            {/* ADMIN */}
            <Route
              path="/admin/"
              element={
                <PrivateRoute roles={"ADMIN"}>
                  <AdminLayout />
                </PrivateRoute>
              }
            >
              <Route path="users" element={<UserManagement />} />
            </Route>

            {/* SITE */}
            <Route path="/" element={<SiteLayout />}>
              <Route index element={<Home />} />

              {/* ACCOUNT */}
              <Route
                path="account"
                element={
                  <PrivateRoute roles={"USER"}>
                    <AccountLayout />
                  </PrivateRoute>
                }
              >
                <Route path="profile" element={<Profile />} />
                <Route path="update-info" element={<AccountInfo />} />
                <Route
                  path="change-password"
                  element={<ChangePasswordPage user={user} />}
                />
              </Route>

              <Route path="category" element={<CategoryPage />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="product/:slug" element={<ProductDetailsPage />} />
            </Route>

            {/* OTHER PAGES */}
            <Route path="/vnpay-return" element={<VNPayReturn />} />
            <Route path="/page403" element={<Page403 />} />
            <Route path="/page500" element={<Page500 />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Suspense>
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
