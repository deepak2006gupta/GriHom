package com.grihom.backend.controller;

import org.springframework.web.bind.annotation.*;

import com.grihom.backend.dto.AuthRequest;
import com.grihom.backend.dto.RegisterRequest;
import com.grihom.backend.model.User;
import com.grihom.backend.service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin
public class AuthController {

    private final AuthService service;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(request.getPassword())
                .build();
        return service.register(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody AuthRequest request) {
        return service.login(request.getEmail(), request.getPassword());
    }
}