package com.esoe2013group1.smartscooter.json;

public class ReturnJSON extends JSON{
    private Integer price;
    private boolean success;
    private String message;

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
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

    public ReturnJSON(Integer price){
        this.price = price;
        success = true;
        message = "";
    }

    public ReturnJSON(String message){
        price = null;
        success = false;
        this.message = message;
    }
}
