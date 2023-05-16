package com.esoe2013group1.smartscooter.json;

import com.esoe2013group1.smartscooter.UserData;

public class UserDataJSON extends JSON{
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
}
