package com.fashion.store;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus; // <<< BẠN ĐÃ THIẾU DÒNG NÀY
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {
        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Lỗi: Email đã được sử dụng!");
        }

        User user = new User();
        user.setName(registerRequest.getName());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setProvider(AuthProvider.LOCAL);
        user.setRole(Role.USER);

        userRepository.save(user);

        return ResponseEntity.ok("Đăng ký tài khoản thành công!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody LoginRequest loginRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );
        } catch (Exception e) {
            // Ném ra lỗi 401 Unauthorized thay vì 500 Internal Server Error
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email hoặc mật khẩu không đúng");
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getEmail());
        
        // Lấy thông tin User đầy đủ để có được role
        final User user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow();
        
        // Truyền thêm role vào hàm generateToken
        final String jwt = jwtUtil.generateToken(userDetails, user.getRole());

        return ResponseEntity.ok(new JwtResponse(jwt));
    }
}