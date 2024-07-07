import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import Menu from "./Menu";
import NewItemForm from "./NewItemForm";
import OrderWindow from "./OrderWindow";
import Footer from "./Footer";

function App() {
  const [bill, setBill] = useState(0);
  const [order, setOrder] = useState([]);
  const [menu, setMenu] = useState([]);
  const [displayWholeApp, setDisplayWholeApp] = useState("true");

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
    setOrder((prevOrder) => {
      const updatedOrder = prevOrder.filter((item, i, arr) => {
        if (item.uniqueId === uniqueId && !arr.removed) {
          setBill((prevBill) => Math.max(prevBill - item.price, 0));
          arr.removed = true;
          return false;
        }
        return true;
      });
      return updatedOrder;
    });
  }

  return (
    <div>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Menu
              menu={menu}
              handleOrderClick={handleOrderClick}
              handleRemoveOrder={handleRemoveOrder}
            />
          }
        />
        <Route path="/new-item" element={<NewItemForm setMenu={setMenu} />} />
        <Route
          path="/order"
          element={<OrderWindow bill={bill} order={order} />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
