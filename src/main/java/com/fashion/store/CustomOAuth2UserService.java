// src/main/java/com/fashion/store/CustomOAuth2UserService.java
package com.fashion.store;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oauth2User = super.loadUser(userRequest);

        String email = oauth2User.getAttribute("email");
        String name = oauth2User.getAttribute("name");

        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setName(name);
            newUser.setProvider(AuthProvider.GOOGLE);
            newUser.setRole(Role.USER); // GÁN VAI TRÒ MẶC ĐỊNH
            userRepository.save(newUser);


            // Gửi email xác nhận/chào mừng
            int confirmationCode = ThreadLocalRandom.current().nextInt(100000, 1000000);
            String subject = "Chào mừng bạn đến với Fashion Store!";
            String body = "Chào " + name + ",\n\nCảm ơn bạn đã đăng ký tài khoản.\n" +
                          "Mã xác nhận của bạn là: " + confirmationCode + "\n\n" +
                          "Trân trọng,\nĐội ngũ Fashion Store.";
            emailService.sendConfirmationEmail(email, subject, body);
        }

        return oauth2User;
    }
}