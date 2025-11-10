import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toast } from 'react-toastify';
import "../assets/styles/global.css";

interface CartPanelProps {
  open: boolean;
  onClose: () => void;
}

export const CartPanel: React.FC<CartPanelProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const {
    items,
    eliminarDelCarrito,
    incrementarCantidad,
    decrementarCantidad,
    totalPrecio,
    vaciarCarrito,
  } = useCart();

  // Función para manejar el pago
  const manejarPago = () => {
    console.log("🔍 Iniciando proceso de compra...");

    // Verificar si hay productos en el carrito
    if (items.length === 0) {
      console.log("❌ Carrito vacío");
      toast.warning('Tu carrito está vacío');
      return;
    }

    // Verificar si el usuario está logueado
    const usuarioLogueado = localStorage.getItem('loggedUser');
    console.log("👤 Usuario en localStorage:", usuarioLogueado);
    console.log("👤 ¿Está logueado?", usuarioLogueado !== null);

    if (!usuarioLogueado) {
      console.log("❌ Usuario NO logueado");
      toast.error('⚠️ Debes iniciar sesión para comprar', {
        position: "top-right",
        autoClose: 2500,
        theme: "colored",
      });

      // Cerrar el carrito y redirigir al login después de 1.5 segundos
      setTimeout(() => {
        onClose();
        navigate('/login');
      }, 1500);
      return;
    }

    // Si está logueado, procesar la compra
    console.log("✅ Usuario logueado, procesando compra...");
    console.log("✅ MOSTRANDO TOAST DE ÉXITO");

    toast.success('¡Compra realizada con éxito! 🎉', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });

    console.log("✅ Toast lanzado, vaciando carrito...");

    // Vaciar el carrito DESPUÉS de un pequeño delay
    setTimeout(() => {
      vaciarCarrito();
      console.log("✅ Carrito vaciado");
    }, 500);

    // Cerrar el carrito después de mostrar el mensaje
    setTimeout(() => {
      console.log("✅ Cerrando carrito");
      onClose();
    }, 3000);
  };

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
                <button
                    className="checkout-btn"
                    onClick={manejarPago}
                >
                  💳 Finalizar compra
                </button>
              </div>
          )}
        </div>

        {open && <div className="overlay" onClick={onClose} />}
      </>
  );
};