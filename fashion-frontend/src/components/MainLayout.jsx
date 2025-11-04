import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { AdminBar } from "./AdminBar";

export const MainLayout = () => {
  return (
    <div className="bg-white text-gray-800">
      <Header />
      <main>
        {/* Outlet là nơi các trang con như HomePage, ProductDetailPage... sẽ được hiển thị */}
        <Outlet />
      </main>
      <footer className="bg-black text-white text-center p-8 mt-12">
        <p>&copy; 2025 Fashion Store. All Rights Reserved.</p>
      </footer>
      <AdminBar />
    </div>
  );
};
