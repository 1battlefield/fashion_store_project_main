import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FiGrid } from "react-icons/fi"; // Icon cho dashboard

export const AdminBar = () => {
  const { user } = useAuth();

  // Logic quan trọng nhất:
  // Nếu người dùng chưa đăng nhập, hoặc có đăng nhập nhưng vai trò không phải 'ADMIN'
  // thì component này sẽ không hiển thị gì cả (trả về null).
  if (!user || user.role !== "ADMIN") {
    return null;
  }

  // Nếu là admin, hiển thị thanh công cụ
  return (
    <div className="fixed bottom-0 left-0 w-full bg-yellow-400 text-black p-3 shadow-lg z-50 flex justify-center items-center">
      <div className="flex items-center gap-4">
        <FiGrid />
        <span className="font-bold">Bạn đang ở chế độ Admin.</span>
        <Link
          to="/admin"
          className="ml-4 bg-black text-white py-1 px-4 rounded-md hover:bg-gray-800 transition-colors text-sm">
          Quay lại Trang Quản trị
        </Link>
      </div>
    </div>
  );
};
