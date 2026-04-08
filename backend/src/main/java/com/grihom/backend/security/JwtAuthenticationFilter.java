package com.grihom.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

import com.grihom.backend.service.JwtService;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        // 🔍 Get Authorization header
        String authHeader = request.getHeader("Authorization");

        // ❌ No token → continue without authentication
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // ✅ Extract token
        String token = authHeader.substring(7);

        try {
            // ✅ Extract email from token
            String email = jwtService.extractEmail(token);

        if (email != null && jwtService.isTokenValid(token)
                && SecurityContextHolder.getContext().getAuthentication() == null){
                // 👉 Set authentication (no roles for now)
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                email,
                                null,
                                List.of()
                        );

                SecurityContextHolder.getContext().setAuthentication(authToken);
            }

        } catch (Exception e) {
            // ❌ Invalid token → ignore and continue
        }

        filterChain.doFilter(request, response);
    }
}