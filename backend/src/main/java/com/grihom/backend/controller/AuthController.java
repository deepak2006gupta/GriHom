package com.grihom.backend.controller;

import org.springframework.web.bind.annotation.*;

import com.grihom.backend.dto.AuthResponse;
import com.grihom.backend.dto.AuthRequest;
import com.grihom.backend.dto.RegisterRequest;
import com.grihom.backend.model.User;
import com.grihom.backend.service.AuthService;

import lombok.RequiredArgsConstructor;
import jakarta.validation.Valid;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin
public class AuthController {

    private final AuthService service;

    @PostMapping("/register")
    public AuthResponse register(@Valid @RequestBody RegisterRequest request) {
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(request.getPassword())
                .build();
        return service.register(user);
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody AuthRequest request, HttpServletRequest servletRequest) {
        return service.login(
                request.getEmail(),
                request.getPassword(),
                request.getCaptchaToken(),
                servletRequest.getRemoteAddr()
        );
    }
}