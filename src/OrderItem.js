import React from "react";

function OrderItem({ item }) {
  return (
    <div>
      <p>
        <h2>
          {item.name} - ${item.price}
        </h2>
      </p>
    </div>
  );
}

export default OrderItem;
