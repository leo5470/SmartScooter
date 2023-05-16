package com.esoe2013group1.smartscooter;

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

    public UserData(SignupData signupData){
        username = signupData.getUsername();
        email = signupData.getEmail();
    }
}
