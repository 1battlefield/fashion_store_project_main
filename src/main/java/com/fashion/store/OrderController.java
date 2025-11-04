package com.fashion.store;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired private UserRepository userRepository;
    @Autowired private CartItemRepository cartItemRepository;
    @Autowired private OrderRepository orderRepository;
    @Autowired private OrderItemRepository orderItemRepository;

    @PostMapping("/create")
    @Transactional
    public ResponseEntity<Order> createOrder(@AuthenticationPrincipal UserDetails userDetails) {
        // 1. Lấy thông tin người dùng
        User user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow();

        // 2. Lấy giỏ hàng của người dùng
        List<CartItem> cartItems = cartItemRepository.findByUserId(user.getId());
        if (cartItems.isEmpty()) {
            return ResponseEntity.badRequest().build(); // Trả về lỗi nếu giỏ hàng trống
        }

        // 3. Tạo đơn hàng mới
        Order order = new Order();
        order.setUser(user);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus(OrderStatus.PENDING); // Trạng thái ban đầu là "Chờ xử lý"

        // 4. Tính tổng tiền
        long totalAmount = cartItems.stream()
            .mapToLong(item -> item.getProduct().getPrice() * item.getQuantity())
            .sum();
        order.setTotalAmount(totalAmount);

        // 5. Lưu đơn hàng để lấy ID
        Order savedOrder = orderRepository.save(order);

        // 6. Chuyển các sản phẩm trong giỏ hàng thành các mục trong đơn hàng
        List<OrderItem> orderItems = cartItems.stream().map(cartItem -> {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(savedOrder);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(cartItem.getProduct().getPrice()); // Lưu giá tại thời điểm mua
            return orderItem;
        }).collect(Collectors.toList());

        orderItemRepository.saveAll(orderItems);

        // 7. Xóa giỏ hàng của người dùng
        cartItemRepository.deleteByUserId(user.getId());

        return ResponseEntity.ok(savedOrder);
    }
}