package com.grihom.service;

import com.grihom.model.HomeImprovement;
import com.grihom.repository.HomeImprovementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class HomeImprovementService {

    private final HomeImprovementRepository homeImprovementRepository;

    public List<HomeImprovement> getAllImprovements() {
        return homeImprovementRepository.findByIsActiveTrue();
    }

    public HomeImprovement getImprovementById(Long id) {
        return homeImprovementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Improvement not found"));
    }

    public List<HomeImprovement> getImprovementsByCategory(String category) {
        return homeImprovementRepository.findByCategoryAndIsActiveTrueOrderByRoiDesc(category);
    }

    public HomeImprovement createImprovement(HomeImprovement improvement) {
        return homeImprovementRepository.save(improvement);
    }

    public HomeImprovement updateImprovement(Long id, HomeImprovement updatedImprovement) {
        HomeImprovement improvement = getImprovementById(id);
        improvement.setTitle(updatedImprovement.getTitle());
        improvement.setDescription(updatedImprovement.getDescription());
        improvement.setMinBudget(updatedImprovement.getMinBudget());
        improvement.setMaxBudget(updatedImprovement.getMaxBudget());
        improvement.setRoi(updatedImprovement.getRoi());
        improvement.setCategory(updatedImprovement.getCategory());
        improvement.setDetails(updatedImprovement.getDetails());
        improvement.setIsActive(updatedImprovement.getIsActive());
        return homeImprovementRepository.save(improvement);
    }

    public void deleteImprovement(Long id) {
        HomeImprovement improvement = getImprovementById(id);
        improvement.setIsActive(false);
        homeImprovementRepository.save(improvement);
    }
}
