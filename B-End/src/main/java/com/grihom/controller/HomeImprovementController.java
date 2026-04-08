package com.grihom.controller;

import com.grihom.model.HomeImprovement;
import com.grihom.service.HomeImprovementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/improvements")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "https://deepak-206.github.io/GriHom"})
public class HomeImprovementController {

    private final HomeImprovementService homeImprovementService;

    @GetMapping
    public ResponseEntity<List<HomeImprovement>> getAllImprovements() {
        List<HomeImprovement> improvements = homeImprovementService.getAllImprovements();
        return ResponseEntity.ok(improvements);
    }

    @GetMapping("/{id}")
    public ResponseEntity<HomeImprovement> getImprovementById(@PathVariable Long id) {
        HomeImprovement improvement = homeImprovementService.getImprovementById(id);
        return ResponseEntity.ok(improvement);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<HomeImprovement>> getByCategory(@PathVariable String category) {
        List<HomeImprovement> improvements = homeImprovementService.getImprovementsByCategory(category);
        return ResponseEntity.ok(improvements);
    }

    @PostMapping
    public ResponseEntity<HomeImprovement> createImprovement(@RequestBody HomeImprovement improvement) {
        HomeImprovement created = homeImprovementService.createImprovement(improvement);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<HomeImprovement> updateImprovement(
            @PathVariable Long id,
            @RequestBody HomeImprovement improvement) {
        HomeImprovement updated = homeImprovementService.updateImprovement(id, improvement);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteImprovement(@PathVariable Long id) {
        homeImprovementService.deleteImprovement(id);
        return ResponseEntity.ok("Improvement deleted successfully");
    }
}
