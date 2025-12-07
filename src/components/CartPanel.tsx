import React, { useState } from "react";
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

    const usuarioLogueadoString = localStorage.getItem('loggedUser');
    const usuarioLogueado = usuarioLogueadoString ? JSON.parse(usuarioLogueadoString) : null;
    const [procesandoCompra, setProcesandoCompra] = useState(false);

    const manejarPago = async () => {
        if (procesandoCompra) return;
        setProcesandoCompra(true);

        if (items.length === 0) {
            toast.warning("Tu carrito está vacío");
            setProcesandoCompra(false);
            return;
        }

        if (!usuarioLogueado || !usuarioLogueado.token) {
            toast.error("⚠️ Debes iniciar sesión para comprar", {
                position: "top-right",
                autoClose: 2500,
                theme: "colored",
            });

            setTimeout(() => {
                onClose();
                navigate("/login");
            }, 1500);
            setProcesandoCompra(false);
            return;
        }

        try {
            // 1. REGISTRAR LA COMPRA (checkout) con items del carrito
            const checkoutRes = await fetch(
                "http://localhost:4000/api/cart/checkout",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${usuarioLogueado.token}`
                    },
                    body: JSON.stringify({
                        items: items.map(item => ({
                            id: item.id,
                            nombre: item.nombre,
                            precio: item.precio,
                            cantidad: item.cantidad
                        }))
                    })
                }
            );

            if (!checkoutRes.ok) {
                const errorData = await checkoutRes.json();
                throw new Error(errorData.message || "Error en checkout");
            }

            // 2. ACTUALIZAR STOCK
            const payload = {
                items: items.map((item) => ({
                    id: item.id,
                    cantidad: item.cantidad,
                })),
            };

            const stockRes = await fetch(
                "http://localhost:4000/api/products/update-stock",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            if (!stockRes.ok) {
                throw new Error("Error al actualizar stock");
            }

            toast.success("¡Compra realizada con éxito! 🎉", {
                position: "top-right",
                autoClose: 3000,
                theme: "colored",
            });

            // Vaciar carrito
            setTimeout(() => {
                vaciarCarrito();
            }, 500);

            // Recargar página
            setTimeout(() => {
                window.location.reload();
            }, 3000);

            // Cerrar panel
            setTimeout(() => {
                onClose();
            }, 3000);
        } catch (error) {
            console.error("❌ Error al finalizar compra:", error);
            toast.error(error instanceof Error ? error.message : "Error procesando la compra");
            setProcesandoCompra(false);
        }
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
                            <span style={{ fontSize: "3rem" }}>🛒</span>
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
                                            ${item.precio.toLocaleString("es-CO")}
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

                {usuarioLogueado && (
                    <div className="user-info-section">
                        <h3>📋 Datos del usuario</h3>
                        <div className="user-info-details">
                            <p>
                                <strong>👤 Nombre:</strong> {usuarioLogueado.name}
                            </p>
                            <p>
                                <strong>📧 Correo:</strong> {usuarioLogueado.email}
                            </p>
                            <p>
                                <strong>📍 Dirección:</strong>{" "}
                                {usuarioLogueado.address || "No registrada"}
                            </p>
                        </div>
                    </div>
                )}

                {items.length > 0 && (
                    <div className="cart-footer">
                        <div className="cart-total">
                            <span>Total:</span>
                            <span className="total-precio">
                ${totalPrecio.toLocaleString("es-CO")}
              </span>
                        </div>
                        <button
                            className="checkout-btn"
                            onClick={manejarPago}
                            disabled={procesandoCompra}
                            style={{ opacity: procesandoCompra ? 0.6 : 1 }}
                        >
                            {procesandoCompra ? "Procesando..." : "💳 Finalizar compra"}
                        </button>
                    </div>
                )}
            </div>

            {open && <div className="overlay" onClick={onClose} />}
        </>
    );
};