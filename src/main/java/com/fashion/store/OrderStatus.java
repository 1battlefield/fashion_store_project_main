package com.fashion.store;

public enum OrderStatus {
    PENDING, // Đang chờ xử lý
    PAID,    // Đã thanh toán
    SHIPPING,// Đang giao hàng
    COMPLETED, // Hoàn thành
    CANCELLED // Đã hủy
}