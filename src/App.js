const menuData = [
  {
    name: "52 M.O.A.B",
    description:
      "100% certified angus beef ¼ pound seasoned patty, house made burger sauce, american cheese, swiss cheese, bacon, lettuce, tomato, onion, pickles and a sesame seed bun.",
    price: 13,
    img: "/pics/Burger1.jpg",
  },
  {
    name: "M.O.A.B.",
    description:
      "100% certified angus beef ¼ pound seasoned patty, mayonnaise, mustard, lettuce, tomato, onion, pickles, and a sesame seed bun. (Add cheese for $0.50)",
    price: 13,
    img: "/pics/the52.jpg",
  },
  {
    name: "Western M.O.A.B.",
    description:
      "100% certified angus beef ¼ pound seasoned patty, onion rings, bacon, american cheese, lettuce, tomato, pickle, bbq sauce, mayonnaise,  and a brioche bun.",
    price: 13,
    img: "/pics/western.jpg",
  },
  {
    name: "The Angry Eddie",
    description:
      "100% certified angus beef ¼ pound seasoned patty, jalapenos, american cheese, burger sauce, spicy that guy sauce, lettuce, tomato, onion, and a sesame seed bun.",
    price: 13,
    img: "/pics/Angry.jpg",
  },
  {
    name: "Chicago Style Hot Dog",
    description:
      "Deep fried all beef hot dog, american cheese, lettuce, tomato, onion, pickles, and burger sauce on a buttered and toasted hoagie.",
    price: 13,
    img: "/pics/Chicagodog.jpg",
  },
  {
    name: "Philly Cheese Steak",
    description:
      "Grilled steak, swiss cheese, grilled bell peppers and onions, mayonnaise, bbq ranch sauce served on a haogie roll.",
    price: 13,
    img: "/pics/philly.jpg",
  },
  {
    name: "Steak & Mushroom",
    description:
      "Grilled steak, swiss cheese, grilled mushrooms and onions, mayonnaise, and bbq ranch sauce served on a hoagie roll.",
    price: 13,
    img: "/pics/steaknshroom.jpg",
  },
  {
    name: "Patty Melt",
    description:
      "100% certified angus beef ¼ pound seasoned patty, swiss cheese, grilled onions, burger sauce, and grilled sourdough",
    price: 13,
    img: "/pics/patty.jpg",
  },
];

function App() {
  return (
    <div>
      <Header />
      <Menu menu={menuData} />
      <Footer />
    </div>
  );

  function Header() {
    return <div>This is the header</div>;
  }

  function Menu({ menu }) {
    return (
      <div>
        <ul>
          {menu.map((dish) => (
            <MenuItem
              name={dish.name}
              description={dish.description}
              price={dish.price}
              img={dish.img}
              key={dish.name}
            />
          ))}
        </ul>
      </div>
    );
  }

  function MenuItem({ name, description, price, img }) {
    return (
      <div>
        <li>
          <h1>{name}</h1>
          <h2>{description}</h2>
          <img src={img} alt={name} />
          <h2>{price}</h2>
        </li>
      </div>
    );
  }

  function Footer() {
    return <div>This is the footer</div>;
  }
}

export default App;
