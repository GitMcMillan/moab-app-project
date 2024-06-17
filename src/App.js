import React, { useState } from "react";

const menuData = [
  {
    id: 1,
    name: "52 M.O.A.B",
    description:
      "100% certified angus beef ¼ pound seasoned patty, house made burger sauce, american cheese, swiss cheese, bacon, lettuce, tomato, onion, pickles and a sesame seed bun.",
    price: 13,
    img: "/pics/Burger1.jpg",
  },
  {
    id: 2,
    name: "M.O.A.B.",
    description:
      "100% certified angus beef ¼ pound seasoned patty, mayonnaise, mustard, lettuce, tomato, onion, pickles, and a sesame seed bun. (Add cheese for $0.50)",
    price: 13,
    img: "/pics/moab.jpg",
  },
  {
    id: 3,
    name: "Western M.O.A.B.",
    description:
      "100% certified angus beef ¼ pound seasoned patty, onion rings, bacon, american cheese, lettuce, tomato, pickle, bbq sauce, mayonnaise, and a brioche bun.",
    price: 13,
    img: "/pics/western.jpg",
  },
  {
    id: 4,
    name: "The Angry Eddie",
    description:
      "100% certified angus beef ¼ pound seasoned patty, jalapenos, american cheese, burger sauce, spicy that guy sauce, lettuce, tomato, onion, and a sesame seed bun.",
    price: 13,
    img: "/pics/Angry.jpg",
  },
  {
    id: 5,
    name: "Chicago Style Hot Dog",
    description:
      "Deep fried all beef hot dog, american cheese, lettuce, tomato, onion, pickles, and burger sauce on a buttered and toasted hoagie.",
    price: 13,
    img: "/pics/Chicagodog.jpg",
  },
  {
    id: 6,
    name: "Philly Cheese Steak",
    description:
      "Grilled steak, swiss cheese, grilled bell peppers and onions, mayonnaise, bbq ranch sauce served on a haogie roll.",
    price: 13,
    img: "/pics/philly.jpg",
  },
  {
    id: 7,
    name: "Steak & Mushroom",
    description:
      "Grilled steak, swiss cheese, grilled mushrooms and onions, mayonnaise, and bbq ranch sauce served on a hoagie roll.",
    price: 13,
    img: "/pics/steaknshroom.jpg",
  },
  {
    id: 8,
    name: "Patty Melt",
    description:
      "100% certified angus beef ¼ pound seasoned patty, swiss cheese, grilled onions, burger sauce, and grilled sourdough",
    price: 13,
    img: "/pics/patty.jpg",
  },
];

function App() {
  const [bill, setBill] = useState(0);
  const [order, setOrder] = useState([]);

  function handleOrderClick(orderItem) {
    setOrder([...order, orderItem]);
    setBill((prevBill) => prevBill + orderItem.price);
  }

  function handleRemoveOrder(orderItem) {
    setOrder((prevOrder) =>
      prevOrder.filter((item) => item.id !== orderItem.id)
    );
    setBill((prevBill) => Math.max(prevBill - orderItem.price, 0));
  }

  return (
    <div>
      <Header />
      <Menu
        menu={menuData}
        handleOrderClick={handleOrderClick}
        handleRemoveOrder={handleRemoveOrder}
      />
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
              key={dish.id}
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
        <button type="button" onClick={() => handleRemoveOrder(item)}>
          - Remove from Order
        </button>
      </li>
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

  function OrderItem({ item }) {
    return (
      <div>
        <p>
          {item.name} - ${item.price}
        </p>
      </div>
    );
  }

  function Footer() {
    return <div className="footer">This is the footer</div>;
  }
}

export default App;

// import React from "react";
// import { useState } from "react";

// const menuData = [
//   {
//     id: 1,
//     name: "52 M.O.A.B",
//     description:
//       "100% certified angus beef ¼ pound seasoned patty, house made burger sauce, american cheese, swiss cheese, bacon, lettuce, tomato, onion, pickles and a sesame seed bun.",
//     price: 13,
//     img: "/pics/Burger1.jpg",
//   },
//   {
//     id: 2,
//     name: "M.O.A.B.",
//     description:
//       "100% certified angus beef ¼ pound seasoned patty, mayonnaise, mustard, lettuce, tomato, onion, pickles, and a sesame seed bun. (Add cheese for $0.50)",
//     price: 13,
//     img: "/pics/moab.jpg",
//   },
//   {
//     id: 3,
//     name: "Western M.O.A.B.",
//     description:
//       "100% certified angus beef ¼ pound seasoned patty, onion rings, bacon, american cheese, lettuce, tomato, pickle, bbq sauce, mayonnaise,  and a brioche bun.",
//     price: 13,
//     img: "/pics/western.jpg",
//   },
//   {
//     id: 4,
//     name: "The Angry Eddie",
//     description:
//       "100% certified angus beef ¼ pound seasoned patty, jalapenos, american cheese, burger sauce, spicy that guy sauce, lettuce, tomato, onion, and a sesame seed bun.",
//     price: 13,
//     img: "/pics/Angry.jpg",
//   },
//   {
//     id: 5,
//     name: "Chicago Style Hot Dog",
//     description:
//       "Deep fried all beef hot dog, american cheese, lettuce, tomato, onion, pickles, and burger sauce on a buttered and toasted hoagie.",
//     price: 13,
//     img: "/pics/Chicagodog.jpg",
//   },
//   {
//     id: 6,
//     name: "Philly Cheese Steak",
//     description:
//       "Grilled steak, swiss cheese, grilled bell peppers and onions, mayonnaise, bbq ranch sauce served on a haogie roll.",
//     price: 13,
//     img: "/pics/philly.jpg",
//   },
//   {
//     id: 7,
//     name: "Steak & Mushroom",
//     description:
//       "Grilled steak, swiss cheese, grilled mushrooms and onions, mayonnaise, and bbq ranch sauce served on a hoagie roll.",
//     price: 13,
//     img: "/pics/steaknshroom.jpg",
//   },
//   {
//     id: 8,
//     name: "Patty Melt",
//     description:
//       "100% certified angus beef ¼ pound seasoned patty, swiss cheese, grilled onions, burger sauce, and grilled sourdough",
//     price: 13,
//     img: "/pics/patty.jpg",
//   },
// ];

// function App() {
//   const [bill, setBill] = useState(0);
//   const [order, setOrder] = useState([]);

//   function handleOrderClick(orderItem) {
//     console.log("Added:", orderItem);
//     setOrder([...order, orderItem]);
//     // setBill((prevBill) => prevBill + orderItem.price);
//   }

//   function HandleRemoveOrder(orderItem) {
//     // setOrder((prevOrder) => {
//     //   const updatedOrder = prevOrder.filter((item) => {
//     //     if (item.id === dish.id ? { ...item } : null) {
//     //       setBill((prevBill) => Math.max(prevBill - dish.price, 0));
//     //     }
//     //   });
//     // });
//   }

//   return (
//     <div>
//       <Header />
//       <Menu
//         menu={menuData}
//         bill={bill}
//         setBill={setBill}
//         HandleOrder={handleOrderClick}
//         HandleRemoveOrder={HandleRemoveOrder}
//       />
//       <OrderWindow bill={bill} order={order} />
//       <OrderItem />
//       <Footer />
//     </div>
//   );

//   function Header() {
//     return (
//       <div className="header">
//         <img src="/pics/Marquee.jpg" alt="marquee" />
//         <h1>Meal On A Bun</h1>
//       </div>
//     );
//   }

//   function Menu({ menu, bill, setBill, HandleOrder, HandleRemoveOrder }) {
//     return (
//       <div>
//         <ul className="dishes">
//           {menu.map((dish) => (
//             <MenuItem
//               name={dish.name}
//               description={dish.description}
//               price={dish.price}
//               img={dish.img}
//               key={dish.name}
//               bill={bill}
//               setBill={setBill}
//               HandleOrder={HandleOrder}
//               HandleRemoveOrder={HandleRemoveOrder}
//             />
//           ))}
//         </ul>
//       </div>
//     );
//   }

//   function MenuItem({
//     name,
//     description,
//     price,
//     img,
//     bill,
//     setBill,
//     HandleOrder,
//     HandleRemoveOrder,
//   }) {
//     return (
//       <li>
//         <h1>{name}</h1>
//         <h2 className="description">{description}</h2>
//         <img src={img} alt={name} className="dish-img" />
//         <h2>{price}</h2>
//         <button type="text" onClick={() => HandleOrder(name)}>
//           +
//         </button>
//         Add to Order
//         <p>
//           <button type="text" onClick={() => HandleRemoveOrder(price)}>
//             -
//           </button>
//           Remove from Order
//         </p>
//       </li>
//     );
//   }

//   function OrderWindow({ bill, order }) {
//     const newOrder = order.map((item) => {
//       return <OrderItem key={item.id} item={item} />;
//     });
//     console.log(newOrder);

//     return (
//       <form className="order-window">
//         <h1>Your Order</h1>
//         {newOrder}
//         <h2>${bill}.00</h2>
//       </form>
//     );
//   }

//   function OrderItem({ price, item }) {
//     return (
//       <div>
//         <p>test {price}</p>
//       </div>
//     );
//   }

//   function Footer() {
//     return <div className="footer">This is the footer</div>;
//   }
// }

// export default App;
