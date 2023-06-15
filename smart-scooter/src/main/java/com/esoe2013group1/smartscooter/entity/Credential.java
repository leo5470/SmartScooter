package com.esoe2013group1.smartscooter.entity;

import com.esoe2013group1.smartscooter.requestbodydata.SignupData;
import jakarta.persistence.*;

@Entity
public class Credential {
    @Id
    @SequenceGenerator(
            name = "Credentials",
            sequenceName = "Credentials",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "Credentials"
    )
    private Integer id;
    @Column(nullable = false)
    private String username;
    @Column(nullable=false)
    private String password;
    @Column(nullable = false)
    private Boolean admin;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean getAdmin() {
        return admin;
    }

    public void setAdmin(Boolean admin) {
        this.admin = admin;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Credential(){}

    public Credential(SignupData data){
        username = data.getUsername();
        password = data.getPassword();
        admin = false;
    }
}
