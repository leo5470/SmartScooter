package com.esoe2013group1.smartscooter.exception;

public class TokenDoesNotExistException extends Exception{
    public TokenDoesNotExistException(){
        super("Session does not exist.");
    }
}
