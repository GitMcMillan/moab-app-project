import React from "react";

function MenuItem({ item, handleOrderClick, handleRemoveOrder }) {
  return (
    <li>
      <h1>{item.name}</h1>
      <h2 className="description">{item.description}</h2>
      <img src={item.img} alt={item.name} className="dish-img" />
      <h2>${item.price}</h2>
      <button type="button" onClick={() => handleOrderClick(item)}>
        + Add to Order
      </button>
      <button type="button" onClick={() => handleRemoveOrder(item.uniqueId)}>
        - Remove from Order
      </button>
    </li>
  );
}

export default MenuItem;
