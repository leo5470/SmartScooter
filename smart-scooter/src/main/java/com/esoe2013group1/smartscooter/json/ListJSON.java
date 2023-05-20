package com.esoe2013group1.smartscooter.json;

import com.esoe2013group1.smartscooter.entity.Scooter;

import java.util.List;

public class ListJSON<E> extends JSON{
    private boolean success;
    private List<E> data;
    private String message;

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public List<E> getData() {
        return data;
    }

    public void setData(List<E> data) {
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public ListJSON(List<E> list){
        data = list;
        success = true;
        message = "";
    }

    public ListJSON(String message){
        data = null;
        success = false;
        this.message = message;
    }

    public ListJSON(){}
}
