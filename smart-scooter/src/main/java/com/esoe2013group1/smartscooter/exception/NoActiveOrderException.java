package com.esoe2013group1.smartscooter.exception;

public class NoActiveOrderException extends Exception{
    public NoActiveOrderException(){
        super("No active order for the designated user.");
    }
}
