import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Header from "./Header";
import Menu from "./Menu";

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

  function NewItemForm() {
    const [dishName, setDishName] = useState("");
    const [price, setPrice] = useState(13);
    const [description, setDescription] = useState("A Delicious Creation");

    function handleSubmit(e) {
      e.preventDefault();
      const newItem = {
        id: uuidv4(),
        name: dishName,
        description: description,
        price: price,
        img: "https://roadfood.com/wp-content/uploads/2022/03/Hodad-double-cheeseburger.jpg",
      };
      fetch("http://127.0.0.1:3000/menuData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      })
        .then((response) => {
          if (!response.ok) {
            return response.text().then((text) => {
              throw new Error(text);
            });
          }
          return response.json();
        })
        .then((data) => {
          setMenu((prevMenu) => [...prevMenu, data]);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }

    return (
      <div className="newitemForm">
        <h2>Make Your Own Dish!</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={dishName}
              onChange={(e) => setDishName(e.target.value)}
            />
          </label>

          <label>
            Description:
            <input
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label>
            Price:
            <input
              type="text"
              name="price"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
            />
          </label>
          <p>
            <button>Submit</button>
          </p>
        </form>
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
