import { useState } from 'react';
import './settings.css';
import AccountSettings from './setting-component/account-settings';
import PaymentSettings from './setting-component/payment-settings';
import CouponSettings from './setting-component/coupon-settings';
import NotificationSettings from './setting-component/notification-settings';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('account');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="settings-container">
        <div className="settings-menu">
          <div
            className={`settings-menu-item ${activeTab === 'account' ? 'active' : ''}`}
            onClick={() => handleTabClick('account')}
          >
            Account Settings
          </div>
          <div
            className={`settings-menu-item ${activeTab === 'payment' ? 'active' : ''}`}
            onClick={() => handleTabClick('payment')}
          >
            Payment
          </div>
          <div
            className={`settings-menu-item ${activeTab === 'coupon' ? 'active' : ''}`}
            onClick={() => handleTabClick('coupon')}
          >
            Coupon
          </div>
          <div
            className={`settings-menu-item ${activeTab === 'notification' ? 'active' : ''}`}
            onClick={() => handleTabClick('notification')}
          >
            Notification
          </div>
        </div>

        <div className="settings-content">
          <div className={`account-settings ${activeTab === 'account' ? 'show' : ''}`}>
            <AccountSettings />
          </div>

          <div className={`payment-settings ${activeTab === 'payment' ? 'show' : ''}`}>
            <PaymentSettings />
          </div>

          <div className={`coupon-settings ${activeTab === 'coupon' ? 'show' : ''}`}>
            <h2>Coupon Settings</h2>
            <CouponSettings />

          </div>

          <div className={`notification-settings ${activeTab === 'notification' ? 'show' : ''}`}>
            <h2>Notification Settings</h2>
            <NotificationSettings />
          </div>
        </div>
      </div>
    </div>
  );
}
