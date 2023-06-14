package com.esoe2013group1.smartscooter.exception;

import com.esoe2013group1.smartscooter.entity.Scooter;
import com.esoe2013group1.smartscooter.entity.Station;

public class OutOfReachException extends Exception{
    public OutOfReachException(Station station){
        super("User is out of reach from charging station.");
        System.out.println("User out of reach from station #" + station.getId());
    }

    public OutOfReachException(Scooter scooter){
        super("User is out of reach from scooter");
        System.out.println("User out of reach from scooter #" + scooter.getId());
    }
}
