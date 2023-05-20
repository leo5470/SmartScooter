package com.esoe2013group1.smartscooter.exception;

public class OperationException extends Exception{
    public OperationException(String status){
        super(status + " is not compatible with the designated operation.");
    }
}
