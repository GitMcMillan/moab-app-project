import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Header from "./Header";
import Menu from "./Menu";
import NewItemForm from "./NewItemForm";
import OrderWindow from "./OrderWindow";
import Footer from "./Footer";

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
    setOrder([...order, orderItem]);
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
}

export default App;
