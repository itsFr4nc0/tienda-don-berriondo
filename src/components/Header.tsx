import React, { useState } from "react";
import "../assets/styles/global.css";
import { Link } from "react-router-dom";
import { CartPanel } from "./CartPanel";

export const Header: React.FC = () => {
  const [openCart, setOpenCart] = useState(false);

  return (
    <>
      <header className="header">
        <h1 className="header-title">Mi Tienda</h1>
        <div className="header-icons">
          <img
            src="/icons/cart.svg"
            alt="Carrito"
            onClick={() => setOpenCart(!openCart)}
          />
          <Link to="/login">
            <img src="/icons/user.svg" alt="Usuario" />
          </Link>
        </div>
      </header>

      <CartPanel open={openCart} onClose={() => setOpenCart(false)} />
    </>
  );
};
