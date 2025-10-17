import React from "react";
import "../assets/styles/global.css";

export const Header: React.FC = () => {
  return (
    <header className="header">
      <h1 className="header-title">Mi Tienda</h1>
      <div className="header-icons">
        <img src="/icons/cart.svg" alt="Carrito" />
        <img src="/icons/user.svg" alt="Usuario" />
      </div>
    </header>
  );
};
