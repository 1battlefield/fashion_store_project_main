package com.fashion.store;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import jakarta.transaction.Transactional;
import java.util.Optional;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartItemRepository cartItemRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRepository productRepository;

    // API để lấy giỏ hàng của người dùng đang đăng nhập
    @GetMapping
    public ResponseEntity<List<CartItem>> getCartItems(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow();
        return ResponseEntity.ok(cartItemRepository.findByUserId(user.getId()));
    }

    // API để thêm sản phẩm vào giỏ
    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@AuthenticationPrincipal UserDetails userDetails, @RequestParam Long productId, @RequestParam int quantity) {
    User user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow();
    Product product = productRepository.findById(productId).orElseThrow();

    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng của user này chưa
    Optional<CartItem> existingItemOpt = cartItemRepository.findByUserIdAndProductId(user.getId(), product.getId());

    if (existingItemOpt.isPresent()) {
        // Nếu đã tồn tại, cập nhật số lượng
        CartItem existingItem = existingItemOpt.get();
        existingItem.setQuantity(existingItem.getQuantity() + quantity);
        cartItemRepository.save(existingItem);
    } else {
        // Nếu chưa tồn tại, tạo mới
        CartItem cartItem = new CartItem();
        cartItem.setUser(user);
        cartItem.setProduct(product);
        cartItem.setQuantity(quantity);
        cartItemRepository.save(cartItem);
    }

    return ResponseEntity.ok("Giỏ hàng đã được cập nhật");
}

    // API để xóa toàn bộ giỏ hàng
    @DeleteMapping("/clear")
    @Transactional
    public ResponseEntity<?> clearCart(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow();
        cartItemRepository.deleteByUserId(user.getId());
        return ResponseEntity.ok("Giỏ hàng đã được xóa");
    }
     @PutMapping("/update/{itemId}")
    public ResponseEntity<?> updateCartItemQuantity(@PathVariable Long itemId, @RequestParam int quantity) {
        CartItem cartItem = cartItemRepository.findById(itemId).orElseThrow();
        if (quantity <= 0) {
            cartItemRepository.delete(cartItem);
        } else {
            cartItem.setQuantity(quantity);
            cartItemRepository.save(cartItem);
        }
        return ResponseEntity.ok().build();
    }

    // API ĐỂ XÓA MỘT SẢN PHẨM KHỎI GIỎ HÀNG
    @DeleteMapping("/item/{itemId}")
    public ResponseEntity<?> removeCartItem(@PathVariable Long itemId) {
        cartItemRepository.deleteById(itemId);
        return ResponseEntity.ok().build();
    }
}