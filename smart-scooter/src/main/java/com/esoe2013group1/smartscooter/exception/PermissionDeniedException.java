package com.esoe2013group1.smartscooter.exception;

public class PermissionDeniedException extends Exception{
    public PermissionDeniedException(){
        super("Permission denied.");
    }
}
