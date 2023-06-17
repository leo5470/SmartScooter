package com.esoe2013group1.smartscooter.entity;

import com.esoe2013group1.smartscooter.data.UserData;
import com.esoe2013group1.smartscooter.exception.DifferentIdentifierException;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity(name = "UserInfo")
public class User {
    @Id
    @SequenceGenerator(
            name = "UserInfoSeq",
            sequenceName = "UserInfoSeq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "UserInfoSeq"
    )
    private Integer id;

    @Column(nullable = false)
    private String username;

    private Double lat;

    private Double lng;

    private Integer coupons = 0;

    @JsonProperty("credit_card")
    private String creditCard;


    @Column(nullable = false)
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

    public Double getLat() {
        return lat;
    }

    public void setLat(Double lat) {
        this.lat = lat;
    }

    public Double getLng() {
        return lng;
    }

    public void setLng(Double lng) {
        this.lng = lng;
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

    public void copyFromData(UserData userData) throws DifferentIdentifierException {
        if (userData.getId() != null && !userData.getId().equals(id)) {
            throw new DifferentIdentifierException(userData.getId(), id);
        }
        username = userData.getUsername();
        if(userData.getLocation() != null) {
            lat = userData.getLocation().getLat();
            lng = userData.getLocation().getLng();
        }
        coupons = userData.getCoupons();
        creditCard = userData.getCreditCard();
        email = userData.getEmail();
        tel = userData.getTel();
    }

    public void addCoupon(){
        coupons += 1;
    }

    public void useCoupon(){
        coupons -= 1;
    }

    public User(UserData userData){
        try{
            copyFromData(userData);
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
    }

    public User(){}
}
