package com.grihom.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.grihom.backend.model.User;
import com.grihom.backend.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository repo;
    private final PasswordEncoder encoder;
    private final JwtService jwtService;

    public String register(User user) {

        // 🚨 Prevent duplicate users
        if (repo.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        user.setPassword(encoder.encode(user.getPassword()));
        user.setRole("ROLE_USER");

        repo.save(user);

        return jwtService.generateToken(user.getEmail());
    }

    public String login(String email, String password) {

        User user = repo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!encoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        return jwtService.generateToken(user.getEmail());
    }
}