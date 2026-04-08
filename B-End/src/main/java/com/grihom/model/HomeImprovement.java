package com.grihom.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "home_improvements")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HomeImprovement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private Double minBudget;

    @Column(nullable = false)
    private Double maxBudget;

    @Column(nullable = false)
    private Integer roi; // Return on Investment percentage

    @Column(nullable = false)
    private String category; // e.g., kitchen, bedroom, bathroom, etc.

    @Column(columnDefinition = "TEXT")
    private String details;

    @Column(nullable = false)
    private Boolean isActive = true;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
