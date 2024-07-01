import React from "react";

function Footer() {
  const hour = new Date().getHours();
  const openHour = 10;
  const closeHour = 23;
  const isOpen = hour >= openHour && hour <= closeHour;

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

export default Footer;
