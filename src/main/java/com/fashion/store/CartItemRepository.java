package com.fashion.store;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

// Giao diện này sẽ tự động cung cấp các phương thức cơ bản như save(), findById(), findAll()...
public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    // Tự động tạo câu lệnh query để tìm tất cả các item trong giỏ hàng của một user
    List<CartItem> findByUserId(Long userId);

    // Tự động tạo câu lệnh query để xóa tất cả các item trong giỏ hàng của một user
    void deleteByUserId(Long userId);

    Optional<CartItem> findByUserIdAndProductId(Long userId, Long productId);
}