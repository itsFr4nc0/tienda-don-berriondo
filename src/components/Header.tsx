import React from "react";
import "../assets/styles/global.css";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  return (
    <header className="header">
      <h1 className="header-title">Mi Tienda</h1>
      <div className="header-icons">
        <img src="/icons/cart.svg" alt="Carrito" />
        <Link to="/login">
          <img src="/icons/user.svg" alt="Usuario" />
        </Link>
      </div>
    </header>
  );
};
