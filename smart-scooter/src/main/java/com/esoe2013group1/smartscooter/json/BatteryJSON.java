package com.esoe2013group1.smartscooter.json;

public class BatteryJSON extends JSON{
    private boolean success;
    private String message;
    private Integer battery_level;

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Integer getBattery_level() {
        return battery_level;
    }

    public void setBattery_level(Integer battery_level) {
        this.battery_level = battery_level;
    }

    public BatteryJSON(Integer battery_level) {
        this.battery_level = battery_level;
        message = "";
        success = true;
    }

    public BatteryJSON(String message) {
        this.message = message;
        battery_level = null;
        success = false;
    }
}
