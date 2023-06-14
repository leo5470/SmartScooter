package com.esoe2013group1.smartscooter.exception;

public class ScooterUnavailableException extends Exception{
    public ScooterUnavailableException(String status){
        super("Scooter unavailable. Status: " + status);
    }
}
