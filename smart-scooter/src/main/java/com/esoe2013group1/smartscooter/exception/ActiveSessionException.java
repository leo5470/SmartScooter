package com.esoe2013group1.smartscooter.exception;

public class ActiveSessionException extends Exception{
    public ActiveSessionException(String username){
        super(username + "user already has another session running");
    }

}
