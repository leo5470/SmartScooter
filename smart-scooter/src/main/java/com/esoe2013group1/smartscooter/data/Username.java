package com.esoe2013group1.smartscooter.data;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Username {
    @JsonProperty("username")
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
