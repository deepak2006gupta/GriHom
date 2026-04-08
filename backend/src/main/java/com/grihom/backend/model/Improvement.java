package com.grihom.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "improvements")
public class Improvement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    
    @Column(length = 1000)
    private String description;
    
    private String cost;
    private String effort;
    private String roi;
    private Integer impact;
    private String duration;
    private String room;
    
    private String tags; // JSON string or comma-separated
    
    private Boolean indianSpecific;
    private String budgetRange;
    
    @Column(length = 500)
    private String imageUrl;
    
    private String source; // "default" or "admin"
}
