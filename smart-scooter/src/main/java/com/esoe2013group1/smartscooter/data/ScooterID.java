package com.esoe2013group1.smartscooter.data;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ScooterID {

    @JsonProperty("scooter_id")
    private Integer id;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
