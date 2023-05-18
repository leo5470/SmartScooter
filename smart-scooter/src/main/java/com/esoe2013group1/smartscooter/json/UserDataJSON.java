package com.esoe2013group1.smartscooter.json;

import com.esoe2013group1.smartscooter.UserData;

public class UserDataJSON extends JSON{
    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public UserData getUserData() {
        return userData;
    }

    public void setUserData(UserData userData) {
        this.userData = userData;
    }

    private boolean success;
    private String message;
    private UserData userData;

    public UserDataJSON(UserData userData){
        this.userData = userData;
        success = true;
        message = "";
    }

    public UserDataJSON(String message){
        userData = null;
        success = false;
        this.message = message;
    }

    public UserDataJSON(){}

}
