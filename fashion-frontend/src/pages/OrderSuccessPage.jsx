import React from "react";
import { Link } from "react-router-dom";

export const OrderSuccessPage = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-3xl font-bold mb-4 text-green-600">Đặt hàng thành công!</h1>
      <p className="text-gray-700 mb-8">Cảm ơn bạn đã mua sắm. Đơn hàng của bạn đang được xử lý.</p>
      <Link to="/" className="bg-black text-white py-2 px-6 uppercase font-bold">
        Tiếp tục mua sắm
      </Link>
    </div>
  );
};
