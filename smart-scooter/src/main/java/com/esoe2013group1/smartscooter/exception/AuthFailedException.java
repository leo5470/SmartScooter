package com.esoe2013group1.smartscooter.exception;

public class AuthFailedException extends Exception{
    public AuthFailedException(){
        super("Authentication failed. Please check your password and try again.");
    }
}
