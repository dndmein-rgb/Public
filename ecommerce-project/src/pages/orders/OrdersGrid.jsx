
import React, { Fragment } from 'react';
import { Link } from 'react-router';
import OrderHeader from './OrderHeader';
import OrderDeatilsGrid from './OrderDeatilsGrid';

const OrdersGrid = ({ orders,loadCart }) => {
  return (
    <div className="orders-grid">
      {orders.map((order) => {
        return (
          <div key={order.id} className="order-container">
            <OrderHeader order={order} />

           <OrderDeatilsGrid order={order} loadCart={loadCart}/>
          </div>
        );
      })}
    </div>
  );
};

export default OrdersGrid;
