package com.esoe2013group1.smartscooter.entity;

import jakarta.persistence.*;

@Entity
public class Scooter {
    @Id
    @SequenceGenerator(
            name = "Scooters",
            sequenceName = "Scooters",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "Scooters"
    )
    private Integer id;
    @Column(nullable = false, length = 16)
    private String plate;
    @Column(nullable = false)
    private Integer battery_level;
    @Column(nullable = false)
    private double lat;
    @Column(nullable = false)
    private double lng;
    @Column(nullable = false, length = 16)
    private String status;
}
