import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import type { Producto } from "../context/CartContext";

interface DeleteProductModalProps {
    close: () => void;
}

export const DeleteProductModal: React.FC<DeleteProductModalProps> = ({ close }) => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [cargando, setCargando] = useState(true);
    const [deleting, setDeleting] = useState<number | null>(null);
    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch("http://localhost:4000/api/products");
            const data = await res.json();
            setProductos(data);
        } catch (error) {
            toast.error("Error al cargar productos");
            console.error(error);
        } finally {
            setCargando(false);
        }
    };

    const handleDelete = async (id: number, nombre: string) => {
        const confirmDelete = window.confirm(
            `¿Estás seguro de eliminar "${nombre}"?\n\nEsta acción no se puede deshacer.`
        );

        if (!confirmDelete) return;

        setDeleting(id);

        const loggedUser = JSON.parse(localStorage.getItem("loggedUser") || "null");
        const token = loggedUser?.token;

        if (!token) {
            toast.error("No hay sesión activa");
            setDeleting(null);
            return;
        }

        try {
            const res = await fetch(`http://localhost:4000/api/products/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Error al eliminar producto");
                return;
            }

            toast.success(`✅ "${nombre}" eliminado correctamente`);
            setProductos(productos.filter(p => p.id !== id));

        } catch (error) {
            toast.error("Error en el servidor");
            console.error(error);
        } finally {
            setDeleting(null);
        }
    };

    const productosFiltrados = productos.filter(
        (p) =>
            p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            p.id.toString().includes(busqueda) ||
            (p.categoria?.toLowerCase() || "").includes(busqueda.toLowerCase())
    );

    return (
        <AnimatePresence>
            <motion.div
                className="modal-overlay"
                onClick={close}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="modal-content"
                    onClick={(e) => e.stopPropagation()}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    style={{ maxHeight: "80vh", overflowY: "auto" }}
                >
                    <h2 style={{ marginBottom: "1.5rem", color: "#2c3e50" }}>
                        Seleccionar Producto para Eliminar
                    </h2>

                    <input
                        type="text"
                        placeholder="🔍 Buscar por nombre, ID o categoría..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "12px",
                            marginBottom: "20px",
                            border: "2px solid #ddd",
                            borderRadius: "8px",
                            fontSize: "16px",
                            outline: "none",
                            transition: "border-color 0.3s",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "#e74c3c")}
                        onBlur={(e) => (e.target.style.borderColor = "#ddd")}
                    />

                    {cargando ? (
                        <p style={{ textAlign: "center", color: "#7f8c8d" }}>
                            Cargando productos...
                        </p>
                    ) : productosFiltrados.length === 0 ? (
                        <p style={{ textAlign: "center", color: "#e74c3c" }}>
                            No se encontraron productos
                        </p>
                    ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            {productosFiltrados.map((producto) => (
                                <motion.div
                                    key={producto.id}
                                    whileHover={{ scale: 1.02, backgroundColor: "#fff5f5" }}
                                    whileTap={{ scale: 0.98 }}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "15px",
                                        padding: "15px",
                                        border: "2px solid #e0e0e0",
                                        borderRadius: "10px",
                                        transition: "all 0.2s",
                                        position: "relative",
                                    }}
                                >
                                    <img
                                        src={producto.imagen}
                                        alt={producto.nombre}
                                        style={{
                                            width: "60px",
                                            height: "60px",
                                            objectFit: "cover",
                                            borderRadius: "8px",
                                            border: "2px solid #ddd",
                                        }}
                                    />
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ margin: 0, color: "#2c3e50", fontSize: "16px" }}>
                                            {producto.nombre}
                                        </h4>
                                        <p style={{ margin: "5px 0", color: "#7f8c8d", fontSize: "14px" }}>
                                            ID: {producto.id} | {producto.categoria}
                                        </p>
                                        <p style={{ margin: 0, fontWeight: "bold", color: "#27ae60" }}>
                                            ${producto.precio.toLocaleString("es-CO")}
                                        </p>
                                    </div>
                                    <motion.button
                                        onClick={() => handleDelete(producto.id, producto.nombre)}
                                        disabled={deleting === producto.id}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        style={{
                                            padding: "10px 20px",
                                            backgroundColor: deleting === producto.id ? "#95a5a6" : "#e74c3c",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "8px",
                                            fontSize: "14px",
                                            fontWeight: "bold",
                                            cursor: deleting === producto.id ? "not-allowed" : "pointer",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {deleting === producto.id ? "Eliminando..." : "🗑️ Eliminar"}
                                    </motion.button>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    <motion.button
                        onClick={close}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            marginTop: "20px",
                            padding: "12px 30px",
                            backgroundColor: "#95a5a6",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "16px",
                            fontWeight: "bold",
                            cursor: "pointer",
                            width: "100%",
                        }}
                    >
                        Cancelar
                    </motion.button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};