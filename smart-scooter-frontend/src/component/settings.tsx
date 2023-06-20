import { useState } from 'react';
import './settings.css';
import AccountSettings from './setting-component/account-settings';
import PaymentSettings from './setting-component/payment-settings';
import CouponSettings from './setting-component/coupon-settings';
import RentHistory from './setting-component/rent-history';
import { atom_data } from '../lib/store';
import { useAtom } from 'jotai';

export default function Settings() {
  const [data,] = useAtom(atom_data)
  const [activeTab, setActiveTab] = useState('account');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="settings-container">
        <div className="settings-menu">

          <div className="profile-pic">
            <img className="profile-pic-img" src="data:image/jpeg;base64,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" alt="user pic" />
          </div>

          <div
            className={`settings-menu-item ${activeTab === 'account' ? 'active' : ''}`}
            onClick={() => handleTabClick('account')}
          >
            <strong>Account</strong>
          </div>
          {data.is_admin === false ?
            <>
              <div
                className={`settings-menu-item ${activeTab === 'payment' ? 'active' : ''}`}
                onClick={() => handleTabClick('payment')}
              >
                <strong>Payment</strong>
              </div>
              <div
                className={`settings-menu-item ${activeTab === 'coupon' ? 'active' : ''}`}
                onClick={() => handleTabClick('coupon')}
              >
                <strong>Coupon</strong>
              </div>
              <div
                className={`settings-menu-item ${activeTab === 'renthistory' ? 'active' : ''}`}
                onClick={() => handleTabClick('renthistory')}
              >
                <strong>Rent History</strong>
              </div>

            </> : <>
            </>}

        </div>

        <div className="settings-content">

          <div className={`account-settings ${activeTab === 'account' ? 'show' : ''}`}>
            <AccountSettings />
          </div>

          <div className={`payment-settings ${activeTab === 'payment' ? 'show' : ''}`}>
            <PaymentSettings />
          </div>

          <div className={`coupon-settings ${activeTab === 'coupon' ? 'show' : ''}`}>
            <CouponSettings />

          </div>

          <div className={`renhistory-settings ${activeTab === 'renthistory' ? 'show' : ''}`}>
            <RentHistory />
          </div>
        </div>
      </div>
    </div>
  );
}
