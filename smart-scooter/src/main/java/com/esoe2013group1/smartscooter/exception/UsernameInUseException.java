package com.esoe2013group1.smartscooter.exception;

public class UsernameInUseException extends Exception{
    public UsernameInUseException(String username){
        super("Username '" + username + "' is already taken.");
    }
}
