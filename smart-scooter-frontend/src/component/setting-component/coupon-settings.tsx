import { useState } from "react";

export default function CouponSettings() {
    const [showModal, setShowModal] = useState(false);


    const toggleModal = () => {
        setShowModal(!showModal);
    };
    return (
        <div>
            <article>
                <hgroup>
                <h1>Coupon Settings</h1>
                <h2></h2>
                </hgroup>
            <select>
                <option value="time">Sort by Time</option>
                <option value="discount">Sort by Discount</option>
            </select>

            <div className="coupon-list">
                {/* Example coupon */}
                <div className="coupon-item">
                    <div className="coupon-details">
                        <h3>Coupon Title</h3>
                        <p>Discount: 10%</p>
                        <p>Due Date: 2023-06-30</p>
                    </div>
                    <button className="contrast" onClick={toggleModal}>
                        View Details
                    </button>
                </div>
            </div>
            </article>
        </div>
    )
}

