package com.grihom.repository;

import com.grihom.model.HomeImprovement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface HomeImprovementRepository extends JpaRepository<HomeImprovement, Long> {
    List<HomeImprovement> findByCategory(String category);
    List<HomeImprovement> findByIsActiveTrue();
    List<HomeImprovement> findByCategoryAndIsActiveTrueOrderByRoiDesc(String category);
}
