package com.esoe2013group1.smartscooter.data;

import com.esoe2013group1.smartscooter.Location;
import com.esoe2013group1.smartscooter.entity.Station;

public class StationData {
    private Integer id;
    private Location location;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public void copyFromData(Station station){
        id = station.getId();
        location.setLng(station.getLng());
        location.setLat(station.getLat());
    }

    public StationData(){}

    public StationData(Station station){
        location = new Location();
        copyFromData(station);
    }
}
