import React from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";

// Layouts
import { MainLayout } from "./components/MainLayout";
import { AdminLayout } from "./pages/admin/AdminLayout";

// Main Pages
import { HomePage } from "./pages/HomePage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { CartPage } from "./pages/CartPage";
import { OrderSuccessPage } from "./pages/OrderSuccessPage";

// Admin Pages
import { AdminRoute } from "./components/AdminRoute";
import { DashboardPage } from "./pages/admin/DashboardPage";
import { ProductManagementPage } from "./pages/admin/ProductManagementPage";

function App() {
  return (
    <Routes>
      {/* --- NHÓM ROUTE CỦA KHÁCH HÀNG --- */}
      {/* Tất cả các route bên trong sẽ dùng chung MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
      </Route>

      {/* --- NHÓM ROUTE CỦA ADMIN --- */}
      {/* Tất cả các route bên trong sẽ được bảo vệ bởi AdminRoute */}
      <Route element={<AdminRoute />}>
        {/* Tất cả các route con của /admin sẽ dùng chung AdminLayout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="products" element={<ProductManagementPage />} />
          {/* <Route path="orders" element={<OrderManagementPage />} /> */}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
