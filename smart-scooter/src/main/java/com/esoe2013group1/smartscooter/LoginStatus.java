package com.esoe2013group1.smartscooter;

import jakarta.persistence.*;

@Entity
public class LoginStatus {
    @Id
    @SequenceGenerator(
            name = "LoginStatusTable",
            sequenceName = "LoginStatusTable"
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "LoginStatusTable"
    )
    private Integer id;
    @Column(nullable = false)
    private boolean isLogin;
    @Column
    private String tok;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public boolean isLogin() {
        return isLogin;
    }

    public void setLogin(boolean login) {
        isLogin = login;
    }

    public String getTok() {
        return tok;
    }

    public void setTok(String token) {
        this.tok = token;
    }
}
