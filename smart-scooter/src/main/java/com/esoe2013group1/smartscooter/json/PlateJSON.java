package com.esoe2013group1.smartscooter.json;

public class PlateJSON extends JSON{
    private boolean success;
    private String plate;
    private String message;

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getPlate() {
        return plate;
    }

    public void setPlate(String plate) {
        this.plate = plate;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public PlateJSON(String plate){
        success = true;
        message = "";
        this.plate = plate;
    }

    public PlateJSON(boolean success, String message){
        this.success = success;
        this.message = message;
        plate = "";
    }
}
