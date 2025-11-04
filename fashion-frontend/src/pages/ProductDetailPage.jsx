import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // axios bây giờ đã tự biết baseURL, chỉ cần truyền phần còn lại của URL
    axios
      .get(`/api/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (user) {
      addToCart(product.id, 1);
    } else {
      alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ!");
      navigate("/login");
    }
  };

  if (!product) {
    return <div className="text-center p-12">Loading...</div>;
  }

  // Lấy địa chỉ backend từ biến môi trường để hiển thị ảnh
  const imageUrl = `${import.meta.env.VITE_BACKEND_URL}${product.imageUrl}`;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {/* Sử dụng đường dẫn ảnh đầy đủ */}
          <img src={imageUrl} alt={product.name} className="w-full rounded-lg" />
        </div>
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-wider">{product.name}</h1>
          <p className="text-2xl text-gray-700 my-4">{product.price.toLocaleString("vi-VN")} VND</p>
          <p className="text-gray-600">
            Đây là phần mô tả sản phẩm. Bạn có thể thêm trường description vào entity Product trong backend để hiển thị
            ở đây.
          </p>
          <button
            onClick={handleAddToCart}
            className="mt-8 w-full bg-black text-white py-3 uppercase font-bold hover:bg-gray-800 transition-colors">
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
  );
};
