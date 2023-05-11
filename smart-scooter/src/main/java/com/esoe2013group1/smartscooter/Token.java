package com.esoe2013group1.smartscooter;

import java.util.UUID;

public class Token{
    private String token;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public static String generateToken(){
        UUID uuid = UUID.randomUUID();
        return uuid.toString().replace("-", "");
    }
}
