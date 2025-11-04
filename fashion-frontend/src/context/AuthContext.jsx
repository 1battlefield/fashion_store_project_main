import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../api/api.js";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (authToken) {
      try {
        const decodedToken = jwtDecode(authToken);
        // Lưu lại thông tin user từ token
        setUser({ email: decodedToken.sub, role: decodedToken.role });
      } catch (error) {
        // Nếu token lỗi, xóa nó đi
        console.error("Token không hợp lệ:", error);
        localStorage.removeItem("token");
        setAuthToken(null);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [authToken]);

  // SỬA LẠI HÀM LOGIN
  const login = async (email, password) => {
    try {
      const response = await api.post("/api/auth/login", { email, password });
      const token = response.data.jwt;
      localStorage.setItem("token", token);
      setAuthToken(token); // Cập nhật state, useEffect ở trên sẽ tự động chạy và set user

      // Trả về thông tin user đã được giải mã
      const decodedToken = jwtDecode(token);
      return decodedToken;
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      return null; // Trả về null nếu đăng nhập thất bại
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    setUser(null);
  };

  const value = {
    user,
    authToken,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
