import { useState } from 'react';
import './Settings.css';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('account');
  const [showModal, setShowModal] = useState(false);


  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Category</a>
          </li>
          <li>Page</li>
        </ul>
      </nav>

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
          <h2>Account Settings</h2>
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" />

            <label htmlFor="email">Email Address:</label>
            <input type="email" id="email" />

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" />

            <label htmlFor="phone">Phone Number:</label>
            <input type="text" id="phone" />

            <button>Save Changes</button>
          </div>
        </div>

        <div className={`payment-settings ${activeTab === 'payment' ? 'show' : ''}`}>
          <h2>Payment Settings</h2>
          <div>
            <h3>Add New Credit Card</h3>
            <label htmlFor="cardNumber">Card Number:</label>
            <input type="text" id="cardNumber" />

            <label htmlFor="dueDate">Due Date:</label>
            <input type="text" id="dueDate" />

            <label htmlFor="secureCode">Secure Code:</label>
            <input type="text" id="secureCode" />

            <button>Add Card</button>

            <h3>Default Payment Method</h3>
            <p>Current default card: ************1234</p>
            <button>Set as Default</button>
          </div>
        </div>

        <div className={`coupon-settings ${activeTab === 'coupon' ? 'show' : ''}`}>
          <h2>Coupon Settings</h2>
          <div>
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
          </div>

          {/* Modal */}
          {showModal && (
            <dialog id="modal-example">
              <article>
                <a
                  href="#close"
                  aria-label="Close"
                  className="close"
                  onClick={toggleModal}
                ></a>
                <h3>Coupon Details</h3>
                <p>
                  Cras sit amet maximus risus. Pellentesque sodales odio sit amet augue
                  finibus pellentesque. Nullam finibus risus non semper euismod.
                </p>
                <footer>
                  <a
                    href="#cancel"
                    role="button"
                    className="secondary"
                    onClick={toggleModal}
                  >
                    Close
                  </a>
                  <a href="#confirm" role="button" onClick={toggleModal}>
                    Confirm
                  </a>
                </footer>
              </article>
            </dialog>
          )}

        </div>

        <div className={`notification-settings ${activeTab === 'notification' ? 'show' : ''}`}>
          <h2>Notification Settings</h2>
          <div>
            <div className="notification-list">
              {/* Example notification */}
              <div className="notification-item">
                <div className="notification-details">
                  <h3>Notification Title</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <p>Received on: 2023-05-01</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
