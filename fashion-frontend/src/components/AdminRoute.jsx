import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const AdminRoute = () => {
  const { authToken } = useAuth();

  if (!authToken) {
    // Nếu không có token, đá về trang đăng nhập
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = jwtDecode(authToken);
    // Kiểm tra xem token có vai trò là "ADMIN" không
    if (decodedToken.role === "ADMIN") {
      // Nếu là admin, cho phép truy cập các route con
      return <Outlet />;
    } else {
      // Nếu không phải admin, đá về trang chủ
      return <Navigate to="/" />;
    }
  } catch (error) {
    console.error("Invalid token:", error);
    // Nếu token không hợp lệ, đá về trang đăng nhập
    return <Navigate to="/login" />;
  }
};
