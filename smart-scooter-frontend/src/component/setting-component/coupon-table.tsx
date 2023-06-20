import React from "react";
import "./setting-component-css/coupon.css";

export default function CouponTable() {
  return (
    <div className="coupon-wrapper">
      <div className="coupon-header">
        <h2 className="coupon-title">優惠券</h2>
        <span className="coupon-discount">充電專屬: 租車折扣10%</span>
        <span style={{ color: "black", fontWeight: "bold" }}>✅已使用優惠卷</span>
      </div>
    </div>
  );
}
