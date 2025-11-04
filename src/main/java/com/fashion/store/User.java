// src/main/java/com/fashion/store/User.java
package com.fashion.store;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;
    private String name;

    @Enumerated(EnumType.STRING)
    private AuthProvider provider;
    
    @Enumerated(EnumType.STRING)
    private Role role; 
}

enum AuthProvider {
    LOCAL, GOOGLE
}