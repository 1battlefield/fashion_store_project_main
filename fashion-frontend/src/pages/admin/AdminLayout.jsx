import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi"; // 1. Import thêm icon mới

export const AdminLayout = () => {
  return (
    <div className="flex">
      <aside className="w-64 bg-gray-800 text-white p-4 min-h-screen">
        <h2 className="font-bold text-xl mb-8">Admin Panel</h2>
        <nav className="flex flex-col gap-4">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) => (isActive ? "bg-gray-700 p-2 rounded" : "p-2 rounded hover:bg-gray-700")}>
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/products"
            className={({ isActive }) => (isActive ? "bg-gray-700 p-2 rounded" : "p-2 rounded hover:bg-gray-700")}>
            Quản lý Sản phẩm
          </NavLink>
          <NavLink
            to="/admin/orders"
            className={({ isActive }) => (isActive ? "bg-gray-700 p-2 rounded" : "p-2 rounded hover:bg-gray-700")}>
            Quản lý Đơn hàng
          </NavLink>

          {/* --- THÊM VÀO ĐÂY --- */}
          <hr className="my-4 border-gray-600" />
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded hover:bg-gray-700 flex items-center justify-between">
            <span>Xem Trang Web</span>
            <FiExternalLink />
          </a>
          {/* -------------------- */}
        </nav>
      </aside>
      <main className="flex-1 p-8 bg-gray-100">
        <Outlet /> {/* Đây là nơi nội dung của các trang con sẽ hiển thị */}
      </main>
    </div>
  );
};
