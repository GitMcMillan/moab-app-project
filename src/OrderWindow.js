import React from "react";
import OrderItem from "./OrderItem";

function OrderWindow({ bill, order }) {
  return (
    <form className="order-window">
      <h1>Your Order</h1>
      {order.map((item) => (
        <OrderItem key={item.name} item={item} />
      ))}
      <h2>${bill}.00</h2>
    </form>
  );
}

export default OrderWindow;
