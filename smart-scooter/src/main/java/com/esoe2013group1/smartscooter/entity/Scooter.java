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

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPlate() {
        return plate;
    }

    public void setPlate(String plate) {
        this.plate = plate;
    }

    public Integer getBattery_level() {
        return battery_level;
    }

    public void setBattery_level(Integer battery_level) {
        this.battery_level = battery_level;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void dropBatteryLevel(){
        battery_level -= 1;
    }
}
