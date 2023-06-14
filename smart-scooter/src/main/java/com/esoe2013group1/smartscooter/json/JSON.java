package com.esoe2013group1.smartscooter.json;

import com.fasterxml.jackson.databind.ObjectMapper;

public class JSON {
    public String makeJson(ObjectMapper mapper) {
        try {
            return mapper.writeValueAsString(this);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return "translation to json failed.";
        }
    }
}
