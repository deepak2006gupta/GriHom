package com.grihom.backend.controller;

import com.grihom.backend.model.User;
import com.grihom.backend.repository.ImprovementRepository;
import com.grihom.backend.repository.ReportRepository;
import com.grihom.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin
public class AdminController {

    private final UserRepository userRepository;
    private final ReportRepository reportRepository;
    private final ImprovementRepository improvementRepository;

    @GetMapping("/stats")
    public Map<String, Long> getAdminStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("totalReports", reportRepository.count());
        stats.put("totalImprovements", improvementRepository.count());
        return stats;
    }

    @GetMapping("/users")
    public List<User> getAdminUsers() {
        List<User> users = userRepository.findAll();
        // Hide passwords for safety
        return users.stream().map(u -> {
            u.setPassword(null);
            return u;
        }).collect(Collectors.toList());
    }

    @PutMapping("/users/{id}/role")
    public User updateUserRole(@PathVariable Long id, @RequestBody Map<String, Boolean> body) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        Boolean isAdmin = body.get("isAdmin");
        user.setRole(isAdmin ? "ROLE_ADMIN" : "ROLE_USER");
        user = userRepository.save(user);
        user.setPassword(null);
        return user;
    }

    @PutMapping("/users/{id}/status")
    public User updateUserStatus(@PathVariable Long id, @RequestBody Map<String, Boolean> body) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        Boolean isActive = body.get("isActive");
        user.setIsActive(isActive);
        user = userRepository.save(user);
        user.setPassword(null);
        return user;
    }

    @DeleteMapping("/users/{id}")
    public List<User> deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        return getAdminUsers();
    }
}
