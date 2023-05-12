package com.esoe2013group1.smartscooter;

import java.util.Random;

public class Location {
    public static final double latMax = 25.068277;
    public static final double latMin = 25.026708;
    public static final double lngMax = 121.567045;
    public static final double lngMin = 121.511162;

    private double lat;
    private double lng;

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

    public Location(){
        Random r = new Random();
        lat = latMin + (latMax - latMin) * r.nextDouble();
        lng = lngMin + (lngMax - lngMin) * r.nextDouble();
    }
}
