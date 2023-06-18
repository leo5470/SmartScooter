package com.esoe2013group1.smartscooter.json;

import com.esoe2013group1.smartscooter.data.OrderData;

public class OrderJSON extends JSON{
    private boolean success;
    private String message;
    private OrderData data;

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

    public OrderData getData() {
        return data;
    }

    public void setData(OrderData data) {
        this.data = data;
    }

    public OrderJSON(OrderData orderData){
        data = orderData;
        success = true;
        message = "";
    }
    public OrderJSON(String message){
        data = null;
        success = false;
        this.message = message;
    }

    public OrderJSON(){}
}
