import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <img src="/pics/Marquee.jpg" alt="marquee" />
      <h1>Meal On A Bun</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Menu</Link>
          </li>
          <li>
            <Link to="/new-item">New Item</Link>
          </li>
          <li>
            <Link to="/order">Order</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
