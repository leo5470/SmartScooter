package com.esoe2013group1.smartscooter.entity;

import jakarta.persistence.*;

@Entity
public class LoginStatus {
    @Id
    @SequenceGenerator(
            name = "LoginStatusSeq",
            sequenceName = "LoginStatusSeq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "LoginStatusSeq"
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

    public LoginStatus(){
        isLogin = false;
        tok = null;
    }
}
