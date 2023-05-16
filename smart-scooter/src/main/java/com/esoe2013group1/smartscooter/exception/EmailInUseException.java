package com.esoe2013group1.smartscooter.exception;

public class EmailInUseException extends Exception{
    public EmailInUseException(String email){
        super("Email '" + email + "' is already taken");
    }
}
