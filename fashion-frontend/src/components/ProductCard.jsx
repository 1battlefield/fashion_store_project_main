import React from "react";
import { Link } from "react-router-dom"; // Import Link

const BACKEND_URL = "http://localhost:8080";

export const ProductCard = ({ id, imageUrl, name, price }) => {
  // Thêm `id` vào props
  const fullImageUrl = `${BACKEND_URL}${imageUrl}`;

  return (
    // Bọc toàn bộ component trong thẻ Link
    <Link to={`/products/${id}`} className="group cursor-pointer">
      <div className="overflow-hidden bg-gray-100 aspect-square">
        <img
          src={fullImageUrl}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="mt-4 text-center">
        <h3 className="font-semibold text-sm uppercase tracking-wider">{name}</h3>
        <p className="text-gray-600 mt-1">{price.toLocaleString("vi-VN")} VND</p>
      </div>
    </Link>
  );
};
