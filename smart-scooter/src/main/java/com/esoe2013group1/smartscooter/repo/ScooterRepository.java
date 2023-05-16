package com.esoe2013group1.smartscooter.repo;

import com.esoe2013group1.smartscooter.entity.Scooter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScooterRepository
        extends JpaRepository<Scooter, Integer> {
}
