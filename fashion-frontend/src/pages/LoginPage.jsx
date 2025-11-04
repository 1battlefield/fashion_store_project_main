import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  // SỬA LẠI HÀM NÀY
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const decodedToken = await login(email, password);

    if (decodedToken) {
      // Đăng nhập thành công, kiểm tra role
      if (decodedToken.role === "ADMIN") {
        // Nếu là ADMIN, chuyển đến trang admin
        navigate("/admin");
      } else {
        // Nếu là USER, chuyển đến trang chủ
        navigate("/");
      }
    } else {
      // Đăng nhập thất bại
      setError("Email hoặc mật khẩu không chính xác.");
    }
  };

  return (
    <div className="flex justify-center items-center py-12">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Đăng Nhập</h2>
        {error && <p className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Mật khẩu</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>
        <button type="submit" className="bg-black text-white font-bold py-2 px-4 rounded w-full hover:bg-gray-800">
          Đăng Nhập
        </button>
        <p className="text-center text-sm mt-4">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Đăng ký ngay
          </Link>
        </p>
      </form>
    </div>
  );
};
