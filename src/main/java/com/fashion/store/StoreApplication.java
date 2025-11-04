package com.fashion.store;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class StoreApplication {

    public static void main(String[] args) {
        SpringApplication.run(StoreApplication.class, args);
    }

    @Bean
CommandLineRunner commandLineRunner(ProductRepository productRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
    return args -> {
        // Tạo dữ liệu sản phẩm mẫu (giữ nguyên)
        // ...

        // TẠO TÀI KHOẢN ADMIN NẾU CHƯA TỒN TẠI
        if (userRepository.findByEmail("admin@fashion.com").isEmpty()) {
            User admin = new User();
            admin.setName("Admin User");
            admin.setEmail("admin@fashion.com");
            admin.setPassword(passwordEncoder.encode("admin123")); // Đặt mật khẩu an toàn hơn trong thực tế
            admin.setProvider(AuthProvider.LOCAL);
            admin.setRole(Role.ADMIN);
            userRepository.save(admin);
            System.out.println(">>> Đã tạo tài khoản admin mặc định: admin@fashion.com / admin123");
        }
    };
}
}