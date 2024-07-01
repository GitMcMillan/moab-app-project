import React from "react";
import { useState } from "react";

function NewItemForm({ setMenu, uuidv4 }) {
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

export default NewItemForm;
