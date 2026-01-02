import React from 'react';
import './CustomerDetail.css';

export const CustomerDetail: React.FC = () => {
  return (
    <div className="customer-detail-container">
      <div className="customer-detail-header">
        <h1 className="customer-detail-title">Customer Detail</h1>
      </div>
      <div className="customer-detail-content">
        <div className="customer-detail-info">
          <p className="customer-detail-info-item">Name: John Doe</p>
          <p className="customer-detail-info-item">Email: john.doe@example.com</p>
          <p className="customer-detail-info-item">Phone: 555-1234</p>
          <p className="customer-detail-info-item">Status: Active</p>
        </div>
        <div className="customer-detail-orders">
          <h2 className="customer-detail-orders-title">Order History</h2>
          <ul className="customer-detail-orders-list">
            <li className="customer-detail-orders-list-item">Order #1234</li>
            <li className="customer-detail-orders-list-item">Order #5678</li>
            <li className="customer-detail-orders-list-item">Order #9012</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
