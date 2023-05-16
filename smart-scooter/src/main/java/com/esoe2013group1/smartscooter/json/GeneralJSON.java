package com.esoe2013group1.smartscooter.json;

public class GeneralJSON extends JSON{
    private boolean success;
    private String message;

    public GeneralJSON(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

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
}
