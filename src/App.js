import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

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
      newOrder.splice(orderItemIndex, 1); // Remove the specific item
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
      <NewItemForm />
      <OrderWindow bill={bill} order={order} />
      <Footer />
    </div>
  );

  function Header() {
    return (
      <div className="header">
        <img src="/pics/Marquee.jpg" alt="marquee" />
        <h1>Meal On A Bun</h1>
      </div>
    );
  }

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

  function MenuItem({ item, handleOrderClick, handleRemoveOrder }) {
    return (
      <li>
        <h1>{item.name}</h1>
        <h2 className="description">{item.description}</h2>
        <img src={item.img} alt={item.name} className="dish-img" />
        <h2>{item.price}</h2>
        <button type="button" onClick={() => handleOrderClick(item)}>
          + Add to Order
        </button>
        <button type="button" onClick={() => handleRemoveOrder(item.uniqueId)}>
          - Remove from Order
        </button>
      </li>
    );
  }

  function OrderItem({ item }) {
    return (
      <div>
        <p>
          {item.name} - ${item.price}
        </p>
      </div>
    );
  }

  function NewItemForm() {
    const [dishName, setDishName] = useState("");
    const [price, setPrice] = useState(13);
    const [description, setDescritpion] = useState("A Delicious Creation");

    function handleSubmit(e) {
      e.preventDefault();
      const newItem = {
        name: dishName,
        description: description,
        price: price,
      };
      fetch("http://127.0.0.1:3000/menuData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      })
        .then((r) => r.json())
        .then((data) => console.log(data));
    }

    function handleSubmitClick(e) {
      setDishName(e.target.value);
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
              onChange={handleSubmitClick}
            />
          </label>

          <label>
            Description:
            <input
              type="text"
              name="description"
              value={description}
              disabled
            />
          </label>
          <label>
            Price:
            <input type="text" name="price" value={price} disabled />
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
          <OrderItem key={item.id} item={item} />
        ))}
        <h2>${bill}.00</h2>
      </form>
    );
  }

  function Footer() {
    return <div className="footer">This is the footer</div>;
  }
}

export default App;
