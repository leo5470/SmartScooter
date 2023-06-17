package com.esoe2013group1.smartscooter.data;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ReturnData {
    @JsonProperty("use_coupon")
    private boolean useCoupon;

    public boolean isUseCoupon() {
        return useCoupon;
    }

    public void setUseCoupon(boolean useCoupon) {
        this.useCoupon = useCoupon;
    }
}
