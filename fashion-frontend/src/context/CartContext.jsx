import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../api/api.js";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { authToken } = useAuth();

  const fetchCart = async () => {
    if (authToken) {
      try {
        const response = await api.get("/api/cart");
        setCart(response.data);
      } catch (error) {
        console.error("Lỗi tải giỏ hàng:", error);
        setCart([]);
      }
    } else {
      setCart([]);
    }
  }; // <-- HÀM fetchCart KẾT THÚC Ở ĐÂY

  // HÀM createOrder PHẢI NẰM NGOÀI, NGANG HÀNG VỚI fetchCart
  const createOrder = async () => {
    try {
      const response = await api.post("/api/orders/create");
      // Sau khi tạo đơn hàng thành công, backend đã tự xóa giỏ hàng,
      // chúng ta chỉ cần tải lại giỏ hàng (sẽ là một danh sách rỗng)
      await fetchCart();
      return response.data; // Trả về thông tin đơn hàng đã tạo
    } catch (error) {
      console.error("Lỗi khi tạo đơn hàng:", error);
      alert("Tạo đơn hàng thất bại, vui lòng thử lại.");
      return null;
    }
  };

  useEffect(() => {
    fetchCart();
  }, [authToken]);

  const addToCart = async (productId, quantity) => {
    try {
      await api.post("/api/cart/add", null, { params: { productId, quantity } });
      await fetchCart();
      alert("Sản phẩm đã được thêm vào giỏ!");
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      await api.put(`/api/cart/update/${itemId}`, null, { params: { quantity } });
      await fetchCart();
    } catch (error) {
      console.error("Lỗi khi cập nhật số lượng:", error);
    }
  };

  const removeItem = async (itemId) => {
    try {
      await api.delete(`/api/cart/item/${itemId}`);
      await fetchCart();
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  const clearCart = async () => {
    try {
      await api.delete("/api/cart/clear");
      setCart([]);
    } catch (error) {
      console.error("Lỗi khi xóa giỏ hàng:", error);
    }
  };

  const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const value = {
    cart,
    addToCart,
    clearCart,
    updateQuantity,
    removeItem,
    cartTotalItems,
    createOrder, // <-- THÊM createOrder VÀO ĐÂY
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
