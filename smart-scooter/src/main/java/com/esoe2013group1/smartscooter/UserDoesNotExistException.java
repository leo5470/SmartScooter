package com.esoe2013group1.smartscooter;

public class UserDoesNotExistException extends Exception{
    public UserDoesNotExistException(String username){

        super(username + " user does not exist.");
    }
}
