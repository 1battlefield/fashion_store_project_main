import React from "react";
import { FiSearch, FiUser, FiShoppingCart, FiLogOut } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  // Lấy đúng biến cartTotalItems từ context
  const { cartTotalItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // Chuyển về trang chủ sau khi đăng xuất
  };

  return (
    <header className="bg-black text-white p-4 flex justify-between items-center sticky top-0 z-50">
      <nav className="hidden md:flex gap-6 text-sm font-semibold uppercase">
        <Link to="/" className="hover:text-gray-400">
          Sản phẩm
        </Link>
        {/* Thêm các link khác sau này */}
      </nav>

      <div className="text-2xl font-bold uppercase tracking-widest">
        <Link to="/">FASHION</Link>
      </div>

      <div className="flex items-center gap-6 text-xl">
        <FiSearch className="cursor-pointer hover:text-gray-400" />

        {user ? (
          // Nếu đã đăng nhập
          <div className="flex items-center gap-4 text-sm">
            <span>Chào, {user.email.split("@")[0]}</span>
            <FiLogOut onClick={handleLogout} className="cursor-pointer text-xl hover:text-red-500" title="Đăng xuất" />
          </div>
        ) : (
          // Nếu chưa đăng nhập
          <Link to="/login">
            <FiUser className="cursor-pointer hover:text-gray-400" title="Đăng nhập" />
          </Link>
        )}

        <div className="relative">
          <Link to="/cart">
            <FiShoppingCart className="cursor-pointer hover:text-gray-400" />

            {/* SỬA LẠI ĐIỀU KIỆN Ở ĐÂY */}
            {cartTotalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {/* VÀ SỬA LẠI GIÁ TRỊ HIỂN THỊ Ở ĐÂY */}
                {cartTotalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};
