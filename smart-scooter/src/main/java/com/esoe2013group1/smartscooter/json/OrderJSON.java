package com.esoe2013group1.smartscooter.json;

import com.esoe2013group1.smartscooter.entity.OrderStatus;
import jakarta.persistence.criteria.Order;
import org.aspectj.weaver.ast.Or;

public class OrderJSON extends JSON{
    private boolean success;
    private String message;
    private OrderStatus data;

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

    public OrderStatus getData() {
        return data;
    }

    public void setData(OrderStatus data) {
        this.data = data;
    }

    public OrderJSON(OrderStatus orderStatus){
        data = orderStatus;
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
