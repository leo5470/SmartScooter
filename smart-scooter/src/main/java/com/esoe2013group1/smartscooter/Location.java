package com.esoe2013group1.smartscooter;

import com.fasterxml.jackson.annotation.JsonProperty;

import org.gavaghan.geodesy.Ellipsoid;
import org.gavaghan.geodesy.GeodeticCalculator;
import org.gavaghan.geodesy.GeodeticCurve;
import org.gavaghan.geodesy.GlobalCoordinates;

import java.util.Random;

public class Location {
    public static final double latMax = 25.068277;
    public static final double latMin = 25.026708;
    public static final double lngMax = 121.567045;
    public static final double lngMin = 121.511162;

    public enum Direction{
        EAST(0),
        NORTH(90),
        WEST(180),
        SOUTH(270),
        ;

        private int degrees;
        Direction(int degrees) {
            this.degrees = degrees;
        }

        public int getDegrees() {
            return degrees;
        }

        public void setDegrees(int degrees) {
            this.degrees = degrees;
        }
    }

    @JsonProperty("lat")
    private Double lat;

    @JsonProperty("lng")
    private Double lng;

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

    public Location(){}

    public Location(double lat, double lng){
        this.lat = lat;
        this.lng = lng;
    }

    public Location(boolean random){
        if(random) {
            Random r = new Random();
            lat = latMin + (latMax - latMin) * r.nextDouble();
            lng = lngMin + (lngMax - lngMin) * r.nextDouble();
        }
    }

    public static double calcDistanceForTwoPoints(Location from, Location dest){
        GeodeticCalculator geoCalc = new GeodeticCalculator();
        Ellipsoid ref = Ellipsoid.WGS84;

        GlobalCoordinates fromCoordinate = new GlobalCoordinates(from.getLat(), from.getLng());
        GlobalCoordinates destCoordinate = new GlobalCoordinates(dest.getLat(), dest.getLng());

        GeodeticCurve geoCurve = geoCalc.calculateGeodeticCurve(ref, fromCoordinate, destCoordinate);
        return geoCurve.getEllipsoidalDistance();
    }

    public static Location getCoordinate(Location base, Direction direction, double distance){
        int degrees = direction.getDegrees();

        GeodeticCalculator geoCalc = new GeodeticCalculator();
        Ellipsoid ref = Ellipsoid.WGS84;

        GlobalCoordinates basePoint = new GlobalCoordinates(base.getLat(), base.getLng());
        GlobalCoordinates endPoint = geoCalc.calculateEndingGlobalCoordinates(ref, basePoint, degrees, distance);

        Location result;
        result = new Location(endPoint.getLatitude(), endPoint.getLongitude());

        return result;

    }

}
