package com.esoe2013group1.smartscooter.data;

import com.esoe2013group1.smartscooter.Location;
import com.esoe2013group1.smartscooter.entity.Scooter;

public class ScooterData {
    private Integer id;
    private String plate;
    private Integer battery_level;
    private Location location;
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

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void copyFromData(Scooter scooter){
        id = scooter.getId();
        plate = scooter.getPlate();
        battery_level = scooter.getBattery_level();
        location.setLat(scooter.getLat());
        location.setLng(scooter.getLng());
        status = scooter.getStatus();
    }

    public ScooterData(){}

    public ScooterData(Scooter scooter){
        location = new Location();
        copyFromData(scooter);
    }
}
