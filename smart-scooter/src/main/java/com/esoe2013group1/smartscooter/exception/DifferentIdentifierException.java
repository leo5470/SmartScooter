package com.esoe2013group1.smartscooter.exception;

public class DifferentIdentifierException extends Exception{
    public DifferentIdentifierException(Integer get, Integer org){
        super("Get different identifiers: Expected " + org + ", got " + get);
    }
}
