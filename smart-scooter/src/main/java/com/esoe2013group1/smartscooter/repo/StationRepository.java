package com.esoe2013group1.smartscooter.repo;

import com.esoe2013group1.smartscooter.entity.Station;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StationRepository extends JpaRepository<Station, Integer> {
    public List<Station> findAllByLatBetweenAndLngBetween(double minLat, double maxLat, double minLng, double maxLng);
}
