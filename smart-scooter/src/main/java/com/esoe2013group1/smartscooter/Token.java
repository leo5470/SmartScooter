package com.esoe2013group1.smartscooter;

import java.util.UUID;

public class Token{

    public static String generateToken(){
        UUID uuid = UUID.randomUUID();
        return uuid.toString();
    }
}
