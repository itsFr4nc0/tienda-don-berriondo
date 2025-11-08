import React from "react";
import { useCart } from "../context/CartContext";
import "../assets/styles/global.css";

interface CartPanelProps {
  open: boolean;
  onClose: () => void;
}

export const CartPanel: React.FC<CartPanelProps> = ({ open, onClose }) => {
  const {
    items,
    eliminarDelCarrito,
    incrementarCantidad,
    decrementarCantidad,
    totalPrecio,
    vaciarCarrito,
  } = useCart();

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
            {items.length === 0 ? (
                <div className="cart-empty">
                  <p>Tu carrito está vacío</p>
                  <span style={{ fontSize: '3rem' }}>🛒</span>
                </div>
            ) : (
                <>
                  {items.map((item) => (
                      <div key={item.id} className="cart-item">
                        <img
                            src={item.imagen}
                            alt={item.nombre}
                            className="cart-item-imagen"
                        />
                        <div className="cart-item-info">
                          <h4>{item.nombre}</h4>
                          <p className="cart-item-precio">
                            ${item.precio.toLocaleString('es-CO')}
                          </p>
                          <div className="cart-item-cantidad">
                            <button
                                onClick={() => decrementarCantidad(item.id)}
                                className="cantidad-btn"
                            >
                              −
                            </button>
                            <span>{item.cantidad}</span>
                            <button
                                onClick={() => incrementarCantidad(item.id)}
                                className="cantidad-btn"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button
                            onClick={() => eliminarDelCarrito(item.id)}
                            className="eliminar-btn"
                            title="Eliminar producto"
                        >
                          🗑️
                        </button>
                      </div>
                  ))}

                  <button onClick={vaciarCarrito} className="vaciar-carrito-btn">
                    Vaciar carrito
                  </button>
                </>
            )}
          </div>

          {items.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total">
                  <span>Total:</span>
                  <span className="total-precio">
                ${totalPrecio.toLocaleString('es-CO')}
              </span>
                </div>
                <button className="checkout-btn">
                  Finalizar compra
                </button>
              </div>
          )}
        </div>

        {open && <div className="overlay" onClick={onClose} />}
      </>
  );
};