package com.esoe2013group1.smartscooter;

public class AuthFailedException extends Exception{
    public AuthFailedException(){
        super("Auth failed.");
    }
}
