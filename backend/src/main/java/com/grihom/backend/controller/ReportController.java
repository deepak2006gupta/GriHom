package com.grihom.backend.controller;

import com.grihom.backend.model.Report;
import com.grihom.backend.model.User;
import com.grihom.backend.repository.ReportRepository;
import com.grihom.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
@CrossOrigin
public class ReportController {

    private final ReportRepository reportRepository;
    private final UserRepository userRepository;

    private User getAuthenticatedUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @GetMapping
    public List<Report> getUserReports() {
        User user = getAuthenticatedUser();
        return reportRepository.findByUserIdOrderByTimestampDesc(user.getId());
    }

    @PostMapping
    public Report createReport(@RequestBody Report reportData) {
        User user = getAuthenticatedUser();
        
        Report report = Report.builder()
                .user(user)
                .title(reportData.getTitle())
                .propertyData(reportData.getPropertyData()) // Assuming JSON string passed
                .valorScore(reportData.getValorScore())
                .recommendations(reportData.getRecommendations()) // Assuming JSON string passed
                .timestamp(LocalDateTime.now())
                .build();
                
        return reportRepository.save(report);
    }

    @DeleteMapping("/{id}")
    public void deleteReport(@PathVariable Long id) {
        User user = getAuthenticatedUser();
        Report report = reportRepository.findById(id).orElseThrow(() -> new RuntimeException("Report not found"));
        
        if (!report.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }
        
        reportRepository.delete(report);
    }
}
