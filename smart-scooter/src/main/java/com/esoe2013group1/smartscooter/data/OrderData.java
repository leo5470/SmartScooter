package com.esoe2013group1.smartscooter.data;

import com.esoe2013group1.smartscooter.Location;
import com.esoe2013group1.smartscooter.entity.OrderStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class OrderData {
    private Integer id;

    @JsonProperty("user_id")
    private Integer userID;

    @JsonProperty("scooter_id")
    private Integer scooterID;

    private List<Location> history;

    @JsonProperty("total_distance")
    private Double distance = 0.0;

    private Integer price;

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

    public List<Location> getHistory() {
        return history;
    }

    public void setHistory(List<Location> history) {
        this.history = history;
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

    public void copyFromData(OrderStatus orderStatus){
        id = orderStatus.getId();
        userID = orderStatus.getUserID();
        scooterID = orderStatus.getScooterID();
        distance = orderStatus.getDistance();
        price = orderStatus.getPrice();
        active = orderStatus.getActive();
        rentTime = orderStatus.getRentTime();
        returnTime = orderStatus.getReturnTime();
        totalTime = orderStatus.getTotalTime();
        chargeTimes = orderStatus.getChargeTimes();
        useCoupon = orderStatus.isUseCoupon();

        int historyLen = orderStatus.getLatHistory().size();
        for(int i = 0; i < historyLen; i++){
            boolean add = history.add(new Location(
                    orderStatus.getLatHistory().get(i), orderStatus.getLngHistory().get(i)));
        }
    }

    public OrderData(){}

    public OrderData(OrderStatus orderStatus){
        history = new ArrayList<>();
        copyFromData(orderStatus);
    }
}
