package com.esoe2013group1.smartscooter.entity;

import jakarta.persistence.*;

@Entity
public class Station {
    @Id
    @SequenceGenerator(
            name = "Stations",
            sequenceName = "Stations",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "Stations"
    )
    private Integer id;
    @Column(nullable = false)
    private double lat;
    @Column(nullable = false)
    private double lng;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public double getLat() {
        return lat;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public double getLng() {
        return lng;
    }

    public void setLng(double lng) {
        this.lng = lng;
    }

}
