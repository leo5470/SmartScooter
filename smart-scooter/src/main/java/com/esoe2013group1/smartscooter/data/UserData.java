package com.esoe2013group1.smartscooter.data;

import com.esoe2013group1.smartscooter.Location;
import com.esoe2013group1.smartscooter.entity.User;
import com.fasterxml.jackson.annotation.JsonProperty;

public class UserData {
    private Integer id;
    private String username;
    private Location location;
    private Integer coupons;

    @JsonProperty("credit_card")
    private String creditCard;

    private String email;

    @JsonProperty("telephone_number")
    private String tel;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Integer getCoupons() {
        return coupons;
    }

    public void setCoupons(Integer coupons) {
        this.coupons = coupons;
    }

    public String getCreditCard() {
        return creditCard;
    }

    public void setCreditCard(String creditCard) {
        this.creditCard = creditCard;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public void copyFromData(User user){
        id = user.getId();
        username = user.getUsername();
        location.setLat(user.getLat());
        location.setLng(user.getLng());
        coupons = user.getCoupons();
        creditCard = user.getCreditCard();
        email = user.getEmail();
        tel = user.getTel();
    }

    public UserData(SignupData signupData){
        username = signupData.getUsername();
        email = signupData.getEmail();
        location = new Location(true); // Random assign location for user.
    }

    public UserData(User user){
        location = new Location();
        copyFromData(user);
    }

    public UserData(){}
}
