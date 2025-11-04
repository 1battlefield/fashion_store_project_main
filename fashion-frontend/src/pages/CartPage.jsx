import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";

export const CartPage = () => {
  // State để quản lý việc hiển thị modal
  const [showQrModal, setShowQrModal] = useState(false);

  // Lấy các hàm và dữ liệu cần thiết từ Context
  const { cart, updateQuantity, removeItem, createOrder } = useCart();
  const navigate = useNavigate(); // Hook để chuyển trang

  // Xử lý khi giỏ hàng trống
  if (!cart || cart.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold mb-4">Giỏ hàng của bạn đang trống</h1>
        <Link to="/" className="bg-black text-white py-2 px-6 uppercase font-bold hover:bg-gray-700 transition-colors">
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  // Tính tổng tiền giỏ hàng
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // --- CẤU HÌNH THÔNG TIN NGÂN HÀNG CỦA BẠN TẠI ĐÂY ---
  const MY_BANK_NAME = "VIETCOMBANK"; // Thay bằng mã BIN của ngân hàng bạn (ví dụ: TCB, VCB, ACB...)
  const MY_ACCOUNT_NO = "1034870787"; // Thay bằng số tài khoản của bạn
  const qrInfo = "Thanh toan don hang Fashion Store"; // Nội dung chuyển khoản

  // Tạo URL cho ảnh mã QR
  const qrCodeUrl = `https://img.vietqr.io/image/${MY_BANK_NAME}-${MY_ACCOUNT_NO}-compact.png?amount=${total}&addInfo=${encodeURIComponent(
    qrInfo
  )}`;

  // Hàm xử lý khi người dùng xác nhận đã thanh toán
  const handleConfirmPayment = async () => {
    const newOrder = await createOrder(); // Gọi hàm tạo đơn hàng từ context
    if (newOrder) {
      // Nếu tạo đơn hàng thành công, chuyển đến trang "Cảm ơn"
      navigate("/order-success");
    }
    // Nếu có lỗi, alert đã được hiển thị bên trong hàm createOrder
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Giỏ Hàng</h1>
      <div className="border-t border-b py-4">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between py-4 border-b last:border-b-0">
            <div className="flex items-center gap-4">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}${item.product.imageUrl}`}
                alt={item.product.name}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div>
                <p className="font-bold">{item.product.name}</p>
                <div className="flex items-center gap-4 mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="border w-7 h-7 rounded hover:bg-gray-100 transition-colors">
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="border w-7 h-7 rounded hover:bg-gray-100 transition-colors">
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <p className="font-bold min-w-[120px] text-right">
                {(item.product.price * item.quantity).toLocaleString("vi-VN")} VND
              </p>
              <button
                onClick={() => removeItem(item.id)}
                className="text-gray-500 hover:text-red-500 transition-colors"
                title="Xóa sản phẩm">
                <FiTrash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-between items-center">
        <p className="text-xl font-bold">Tổng cộng: {total.toLocaleString("vi-VN")} VND</p>
        <button
          onClick={() => setShowQrModal(true)}
          className="bg-black text-white py-3 px-8 uppercase font-bold hover:bg-gray-800 transition-colors">
          Thanh toán
        </button>
      </div>

      {/* Modal hiển thị mã QR */}
      {showQrModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setShowQrModal(false)}>
          <div
            className="bg-white p-8 rounded-lg text-center relative w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-2 right-4 text-gray-500 text-3xl font-bold hover:text-black">
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Quét mã VietQR để thanh toán</h2>
            <p>
              Tổng số tiền: <strong className="text-red-600">{total.toLocaleString("vi-VN")} VND</strong>
            </p>
            <img src={qrCodeUrl} alt="QR Code Thanh toán" className="mx-auto mt-4 w-64 h-64" />
            <div className="mt-4 text-left text-sm bg-gray-50 p-4 rounded">
              <p>
                <strong>Ngân hàng:</strong> {MY_BANK_NAME}
              </p>
              <p>
                <strong>Số tài khoản:</strong> {MY_ACCOUNT_NO}
              </p>
              <p>
                <strong>Nội dung:</strong> {qrInfo}
              </p>
            </div>
            <button
              onClick={handleConfirmPayment}
              className="mt-6 w-full bg-green-600 text-white py-3 uppercase font-bold hover:bg-green-700 transition-colors rounded-md">
              Tôi đã thanh toán & Hoàn tất đơn hàng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
