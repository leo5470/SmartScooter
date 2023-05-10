package com.esoe2013group1.smartscooter;

import jakarta.persistence.*;

@Entity
public class Credential {
    @Id
    @SequenceGenerator(
            name = "Credentials",
            sequenceName = "Credentials"
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
}
