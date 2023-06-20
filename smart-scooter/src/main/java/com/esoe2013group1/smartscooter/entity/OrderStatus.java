package com.esoe2013group1.smartscooter.entity;

import com.esoe2013group1.smartscooter.Location;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@SuppressWarnings("SpellCheckingInspection")
@Entity
public class OrderStatus {
    @Id
    @SequenceGenerator(
            name = "OrderSeq",
            sequenceName = "OrderSeq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "OrderSeq"
    )
    private Integer id;

    @Column(nullable = false)
    @JsonProperty("user_id")
    private Integer userID;

    @Column(nullable = false)
    @JsonProperty("scooter_id")
    private Integer scooterID;

    @ElementCollection
    private List<Double> latHistory;

    @ElementCollection
    private List<Double> lngHistory;

    @JsonProperty("total_distance")
    private Double distance = 0.0;

    private Integer price;

    @Column(nullable = false)
    private Boolean active;

    @JsonProperty("rent_time")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime rentTime;

    @JsonProperty("return_time")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime returnTime;

    @JsonProperty("total_time")
    private Integer totalTime;

    @JsonProperty("charge_times")
    private Integer chargeTimes;

    @JsonProperty("use_coupon")
    private boolean useCoupon;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserID() {
        return userID;
    }

    public void setUserID(Integer userID) {
        this.userID = userID;
    }

    public Integer getScooterID() {
        return scooterID;
    }

    public void setScooterID(Integer scooterID) {
        this.scooterID = scooterID;
    }

    public Double getDistance() {
        return distance;
    }

    public void setDistance(Double distance) {
        this.distance = distance;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public LocalDateTime getRentTime() {
        return rentTime;
    }

    public void setRentTime(LocalDateTime rentTime) {
        this.rentTime = rentTime;
    }

    public LocalDateTime getReturnTime() {
        return returnTime;
    }

    public void setReturnTime(LocalDateTime returnTime) {
        this.returnTime = returnTime;
    }

    public Integer getTotalTime() {
        return totalTime;
    }

    public void setTotalTime(Integer totalTime) {
        this.totalTime = totalTime;
    }

    public List<Double> getLatHistory() {
        return latHistory;
    }

    public void setLatHistory(List<Double> latHistory) {
        this.latHistory = latHistory;
    }

    public List<Double> getLngHistory() {
        return lngHistory;
    }

    public void setLngHistory(List<Double> lngHistory) {
        this.lngHistory = lngHistory;
    }

    public Integer getChargeTimes() {
        return chargeTimes;
    }

    public void setChargeTimes(Integer chargeTimes) {
        this.chargeTimes = chargeTimes;
    }

    public boolean isUseCoupon() {
        return useCoupon;
    }

    public void setUseCoupon(boolean useCoupon) {
        this.useCoupon = useCoupon;
    }

    public void calcTotalTime(){
        LocalDateTime start = rentTime;
        LocalDateTime end = returnTime;
        Duration duration = Duration.between(start, end);
        totalTime = Math.toIntExact(duration.getSeconds());
    }

    @SuppressWarnings("ReassignedVariable")
    public int settle(boolean coupon){
        double priceDouble = 25 + distance * 2.5; // $25 basic fee + $2.5 per kilometer
        if(coupon){
            priceDouble *= 0.9; // 10% off if user uses coupon
        }
        price = Math.toIntExact(Math.round(priceDouble));
        return price;
    }

    public boolean batteryDrop(){
        double distanceInMeters = distance * 1000;
        return distanceInMeters % 20 == 0; // 1% per 20 meters
    }

    public void calcDistance() {
        int historyLen = latHistory.size();
        double prevLat = latHistory.get(historyLen - 2);
        double prevLng = lngHistory.get(historyLen - 2);
        double afterLat = latHistory.get(historyLen - 1);
        double afterLng = lngHistory.get(historyLen - 1);

        distance += Location.calcDistanceForTwoPoints(prevLat, prevLng, afterLat, afterLng);
    }

    public void addLocation(Location location){
        latHistory.add(location.getLat());
        lngHistory.add(location.getLng());
    }

    public void addChargeTimes(){
        chargeTimes += 1;
    }

    public Location getLastLocation(){
        int last = latHistory.size() - 1;
        Location location = new Location();
        location.setLng(lngHistory.get(last));
        location.setLat(latHistory.get(last));
        return location;
    }

    public OrderStatus(){}

    public OrderStatus(Integer userID, Integer scooterID, Location initLoc, LocalDateTime rentTime){
        this.userID = userID;
        this.scooterID = scooterID;
        this.rentTime = rentTime;
        active = true;
        useCoupon = false;
        chargeTimes = 0;

        latHistory = new ArrayList<>();
        lngHistory = new ArrayList<>();

        latHistory.add(initLoc.getLat());
        lngHistory.add(initLoc.getLng());
    }
}
