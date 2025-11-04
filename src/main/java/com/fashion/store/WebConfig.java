package com.fashion.store;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**") // Chỉ áp dụng cho các đường dẫn bắt đầu bằng /api/
                        .allowedOrigins("http://localhost:5173") // Cho phép request từ địa chỉ này
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS"); // Cho phép các phương thức này
            }
        };
    }
}