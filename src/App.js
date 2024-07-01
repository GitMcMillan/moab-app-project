import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Header from "./Header";
import Menu from "./Menu";
import NewItemForm from "./NewItemForm";

function App() {
  const [bill, setBill] = useState(0);
  const [order, setOrder] = useState([]);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/menuData")
      .then((r) => r.json())
      .then((data) => setMenu(data));
  }, []);

  function handleOrderClick(orderItem) {
    const orderItemId = { ...orderItem, uniqueID: uuidv4() };
    setOrder([...order, orderItemId]);
    setBill((prevBill) => prevBill + orderItem.price);
  }

  function handleRemoveOrder(uniqueId) {
    const orderItemIndex = order.findIndex(
      (item) => item.uniqueId === uniqueId
    );
    if (orderItemIndex !== -1) {
      const orderItem = order[orderItemIndex];
      const newOrder = [...order];
      newOrder.splice(orderItemIndex, 1);
      setOrder(newOrder);
      setBill((prevBill) => Math.max(prevBill - orderItem.price, 0));
    }
  }

  return (
    <div>
      <Header />
      <Menu
        menu={menu}
        handleOrderClick={handleOrderClick}
        handleRemoveOrder={handleRemoveOrder}
      />
      <NewItemForm setMenu={setMenu} />
      <OrderWindow bill={bill} order={order} />
      <Footer />
    </div>
  );

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

  function Footer() {
    const hour = new Date().getHours();
    const openHour = 10;
    const closeHour = 23;
    const isOpen = hour >= openHour && hour <= closeHour;

    return (
      <footer className="footer">
        {isOpen ? (
          <Hours closeHour={closeHour} openHour={openHour} />
        ) : (
          <p>
            We're happy to welcome you between {openHour}:00 and {closeHour}:00
          </p>
        )}
      </footer>
    );
  }
}

function convertHours(hour) {
  const ampm = hour >= 12 ? "PM" : "AM";
  const adjustedHour = hour % 12 || 12;
  return `${adjustedHour} ${ampm}`;
}

function Hours({ closeHour, openHour }) {
  return (
    <div className="hours">
      <p>
        We're open from {convertHours(openHour)} to {convertHours(closeHour)}.
        Come visit us or order online.
      </p>
    </div>
  );
}

export default App;
