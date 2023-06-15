package com.esoe2013group1.smartscooter.requestbodydata;

import com.fasterxml.jackson.annotation.JsonProperty;

public class StationID {
    @JsonProperty("station_id")
    private Integer id;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
