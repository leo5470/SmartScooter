package com.esoe2013group1.smartscooter.json;

import com.fasterxml.jackson.databind.ObjectMapper;

public class LoginJSON extends JSON {
    private boolean Success;
    private String token;
    private String message;

    public LoginJSON(boolean success, String token, String message) {
        Success = success;
        this.token = token;
        this.message = message;
    }

    public boolean isSuccess() {
        return Success;
    }

    public void setSuccess(boolean success) {
        Success = success;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
