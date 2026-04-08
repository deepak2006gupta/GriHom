package com.grihom.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.grihom.backend.model.User;
import com.grihom.backend.dto.AuthResponse;
import com.grihom.backend.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository repo;
    private final PasswordEncoder encoder;
    private final JwtService jwtService;
    private final CaptchaVerificationService captchaVerificationService;

    public AuthResponse register(User user) {

        // 🚨 Prevent duplicate users
        if (repo.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        user.setPassword(encoder.encode(user.getPassword()));
        user.setRole("ROLE_USER");
        user.setIsActive(true);

        repo.save(user);

        String token = jwtService.generateToken(user.getEmail());
        
        return AuthResponse.builder()
                .token(token)
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .isAdmin("ROLE_ADMIN".equals(user.getRole()))
                .build();
    }

    public AuthResponse login(String email, String password, String captchaToken, String clientIp) {

        captchaVerificationService.verifyOrThrow(captchaToken, clientIp);

        User user = repo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!encoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        
        if (user.getIsActive() != null && !user.getIsActive()) {
            throw new RuntimeException("Your account is inactive. Please contact an administrator.");
        }

        String token = jwtService.generateToken(user.getEmail());
        
        return AuthResponse.builder()
                .token(token)
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .isAdmin("ROLE_ADMIN".equals(user.getRole()))
                .build();
    }
}