package com.esoe2013group1.smartscooter.exception;

public class ActiveOrderException extends Exception{
    public ActiveOrderException(){
        super("User already has another session in use.");
    }
}
