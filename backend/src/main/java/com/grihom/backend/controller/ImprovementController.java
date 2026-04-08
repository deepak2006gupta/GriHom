package com.grihom.backend.controller;

import com.grihom.backend.model.Improvement;
import com.grihom.backend.repository.ImprovementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/improvements")
@RequiredArgsConstructor
@CrossOrigin
public class ImprovementController {

    private final ImprovementRepository repository;

    @GetMapping
    public List<Improvement> getAllImprovements() {
        return repository.findAll();
    }
}
