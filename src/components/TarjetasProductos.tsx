import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import type { Producto } from "../context/CartContext";
import "./TarjetasProductos.css";

const categorias = ["Todas", "Hogar", "Papelería", "Tecnología", "Accesorios personales", "Deporte"];

const Productos: React.FC = () => {
    const { agregarAlCarrito } = useCart();
    const navigate = useNavigate();
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");

    // 🔥 Nuevo: estado para productos desde el backend
    const [productos, setProductos] = useState<Producto[]>([]);
    const [cargando, setCargando] = useState(true);

    // 🔥 Nuevo: obtener productos del backend
    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const res = await fetch("http://localhost:4000/api/products");
                const data = await res.json();
                setProductos(data);
            } catch (error) {
                console.error("Error cargando productos", error);
            } finally {
                setCargando(false);
            }
        };

        fetchProductos();
    }, []);

    const productosFiltrados =
        categoriaSeleccionada === "Todas"
            ? productos
            : productos.filter((p) => p.categoria === categoriaSeleccionada);

    const handleAgregarCarrito = (e: React.MouseEvent, producto: Producto) => {
        e.stopPropagation();
        agregarAlCarrito(producto);
    };

    const handleVerDetalle = (id: number) => {
        navigate(`/producto/${id}`);
    };

    if (cargando) {
        return <h2 className="texto-carga">Cargando productos...</h2>;
    }

    return (
        <div className="pagina-productos">
            <div className="filtros-contenedor">
                <h2 className="filtros-titulo">Filtrar por categoría</h2>
                <div className="filtros-botones">
                    {categorias.map((cat) => (
                        <motion.button
                            key={cat}
                            onClick={() => setCategoriaSeleccionada(cat)}
                            className={`boton-categoria ${categoriaSeleccionada === cat ? "activo" : ""}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {cat}
                        </motion.button>
                    ))}
                </div>
            </div>

            <motion.div
                className="productos-contenedor"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {productosFiltrados.map((producto, index) => (
                    <motion.div
                        key={producto.id}
                        className="tarjeta-producto"
                        onClick={() => handleVerDetalle(producto.id)}
                        style={{ cursor: "pointer" }}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: index * 0.05,
                        }}
                        whileHover={{
                            scale: 1.03,
                            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                            y: -5,
                        }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <motion.img
                            src={producto.imagen}
                            alt={producto.nombre}
                            className="producto-imagen"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                        />
                        <div className="producto-contenido">
                            <h3 className="producto-nombre">{producto.nombre}</h3>
                            <p className="producto-categoria">{producto.categoria}</p>
                            <p className="producto-descripcion">{producto.descripcion}</p>
                            <p className="producto-precio">
                                ${producto.precio.toLocaleString("es-CO")}
                            </p>
                            <motion.button
                                className="btn-agregar-carrito"
                                onClick={(e) => handleAgregarCarrito(e, producto)}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                🛒 Agregar al carrito
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default Productos;
