package com.grihom.backend.repository;

import com.grihom.backend.model.Improvement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImprovementRepository extends JpaRepository<Improvement, Long> {
}
