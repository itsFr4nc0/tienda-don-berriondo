import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";
import type { Producto } from "../context/CartContext";
import "./ProductDetail.css";

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { agregarAlCarrito } = useCart();

    const [cantidad, setCantidad] = useState(1);
    const [producto, setProducto] = useState<Producto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // ============================
    // 🔥 TRAER EL PRODUCTO DEL BACK
    // ============================
    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const res = await fetch(`http://localhost:4000/api/products/${id}`);
                if (!res.ok) throw new Error("Producto no encontrado");

                const data = await res.json();
                setProducto(data);
            } catch (err) {
                setError("No se pudo cargar el producto");
            } finally {
                setLoading(false);
            }
        };

        fetchProducto();
    }, [id]);

    // ============================
    // ESTADOS TEMPORALES
    // ============================
    if (loading) {
        return (
            <div className="producto-no-encontrado">
                <h2>Cargando producto...</h2>
            </div>
        );
    }

    if (error || !producto) {
        return (
            <div className="producto-no-encontrado">
                <h2>Producto no encontrado</h2>
                <button onClick={() => navigate("/")}>Volver al inicio</button>
            </div>
        );
    }

    // ============================
    // FUNCIONES
    // ============================
    const handleAgregarCarrito = () => {
        for (let i = 0; i < cantidad; i++) {
            agregarAlCarrito(producto);
        }

        toast.success(
            `✅ ${cantidad}x ${producto.nombre} agregado(s) al carrito`,
            {
                position: "top-right",
                autoClose: 3000
            }
        );
    };

    const aumentarCantidad = () => setCantidad(prev => prev + 1);
    const disminuirCantidad = () => {
        if (cantidad > 1) setCantidad(prev => prev - 1);
    };

    // ============================
    // UI ORIGINAL — NO SE TOCA NADA
    // ============================
    return (
        <motion.div 
            className="product-detail-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div 
                className="product-detail-container"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <motion.button 
                    className="btn-volver" 
                    onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setTimeout(() => navigate("/"), 300);
                    }}
                    whileHover={{ scale: 1.05, x: -5 }}
                    whileTap={{ scale: 0.95 }}
                >
                    ← Volver a productos
                </motion.button>

                <motion.div 
                    className="product-detail-content"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >

                    <motion.div 
                        className="product-image-section"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <motion.img 
                            src={producto.imagen}
                            alt={producto.nombre}
                            className="product-main-image"
                            whileHover={{ scale: 1.05, rotate: 2 }}
                        />
                    </motion.div>

                    <motion.div 
                        className="product-info-section"
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >

                        <motion.span 
                            className="product-category-badge"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                        >
                            {producto.categoria}
                        </motion.span>

                        <motion.h1 
                            className="product-title"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                        >
                            {producto.nombre}
                        </motion.h1>
                        
                        <motion.p 
                            className="product-description-full"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                        >
                            {producto.descripcion}
                        </motion.p>

                        <motion.div 
                            className="product-price-section"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                        >
                            <span className="product-price-large">
                                ${producto.precio.toLocaleString("es-CO")}
                            </span>
                            <span className="product-price-note">COP</span>
                        </motion.div>

                        <motion.div 
                            className="quantity-selector"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                        >
                            <label>Cantidad:</label>
                            <div className="quantity-controls">
                                <motion.button 
                                    onClick={disminuirCantidad} 
                                    className="btn-quantity"
                                >
                                    −
                                </motion.button>

                                <motion.input
                                    type="number"
                                    min="1"
                                    value={cantidad}
                                    onChange={(e) => {
                                        const valor = parseInt(e.target.value);
                                        if (valor > 0 && !isNaN(valor)) setCantidad(valor);
                                    }}
                                    className="quantity-input"
                                />

                                <motion.button 
                                    onClick={aumentarCantidad} 
                                    className="btn-quantity"
                                >
                                    +
                                </motion.button>
                            </div>
                        </motion.div>

                        <motion.div 
                            className="product-actions"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                        >
                            <motion.button 
                                className="btn-add-to-cart-large"
                                onClick={handleAgregarCarrito}
                                whileHover={{ scale: 1.05 }}
                            >
                                🛒 Agregar al carrito
                            </motion.button>
                        </motion.div>

                        <motion.div 
                            className="product-extra-info"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                        >
                            {[
                                "Envío gratis en compras superiores a $100.000",
                                "Garantía de 30 días",
                                "Pago seguro"
                            ].map((text, index) => (
                                <motion.div 
                                    key={index}
                                    className="info-item"
                                >
                                    <span className="info-icon">✓</span>
                                    <span>{text}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default ProductDetail;
