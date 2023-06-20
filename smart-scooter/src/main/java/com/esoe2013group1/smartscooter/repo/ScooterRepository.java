package com.esoe2013group1.smartscooter.repo;

import com.esoe2013group1.smartscooter.entity.Scooter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScooterRepository
        extends JpaRepository<Scooter, Integer> {
    List<Scooter> findAllByLatBetweenAndLngBetween(double minLat, double maxLat, double minLng, double maxLng);
    List<Scooter> findAllByLatBetweenAndLngBetweenAndStatus(double minLat, double maxLat, double minLng, double maxLng, String status);

    List<Scooter> findAllByStatus(String status);
}
