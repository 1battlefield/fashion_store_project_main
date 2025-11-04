package com.fashion.store;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {

    @GetMapping("/login")
    public String login() {
        return "login"; // Trả về tên của file HTML (không có .html)
    }

    @GetMapping("/home")
    public String home() {
        return "home"; // Trả về tên của file HTML (không có .html)
    }
}