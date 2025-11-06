import React from "react";
import "../assets/styles/global.css";

interface CartPanelProps {
  open: boolean;
  onClose: () => void;
}

export const CartPanel: React.FC<CartPanelProps> = ({ open, onClose }) => {
  return (
    <>
      <div className={`cart-panel ${open ? "open" : ""}`}>
        <div className="cart-header">
          <h2>Carrito de compras</h2>
          <button onClick={onClose} className="close-btn">
            ✕
          </button>
        </div>

        <div className="cart-content">
          {/* Aquí productos en el carrito */}
          <p>Tu carrito está vacío</p>
        </div>

        <button className="checkout-btn">Finalizar compra</button>
      </div>
      
      {open && <div className="overlay" onClick={onClose} />}
    </>
  );
};
