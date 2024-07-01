import React from "react";
import MenuItem from "./MenuItem";

function Menu({ menu, handleOrderClick, handleRemoveOrder }) {
  return (
    <div>
      <ul className="dishes">
        {menu.map((dish) => (
          <MenuItem
            key={dish.name}
            item={dish}
            handleOrderClick={handleOrderClick}
            handleRemoveOrder={handleRemoveOrder}
          />
        ))}
      </ul>
    </div>
  );
}

export default Menu;
