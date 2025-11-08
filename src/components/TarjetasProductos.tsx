import React from "react";
import { useCart } from "../context/CartContext";
import type { Producto } from "../context/CartContext";
import "./TarjetasProductos.css";

const productos: Producto[] = [
    {
        id: 1,
        nombre: "Laptop Gamer",
        categoria: "Tecnología",
        descripcion: "Alto rendimiento para juegos y diseño.",
        precio: 3200000,
        imagen: "/productos/laptop.webp"
    },
    {
        id: 2,
        nombre: "Auriculares Bluetooth",
        categoria: "Accesorios",
        descripcion: "Sonido envolvente y batería de larga duración.",
        precio: 320000,
        imagen: "/productos/audifonos.jpg"
    },
    {
        id: 3,
        nombre: "Smartwatch",
        categoria: "Tecnología",
        descripcion: "Monitor de salud y notificaciones inteligentes.",
        precio: 550000,
        imagen: "/productos/smartwatch.webp"
    },
    {
        id: 4,
        nombre: "Smartwatch 2",
        categoria: "Tecnología",
        descripcion: "Monitor de salud y notificaciones inteligentes.",
        precio: 550000,
        imagen: "/productos/smartwatch.webp"
    },
    {
        id: 5,
        nombre: "Smartwatch 3",
        categoria: "Tecnología",
        descripcion: "Monitor de salud y notificaciones inteligentes.",
        precio: 550000,
        imagen: "/productos/smartwatch.webp"
    },
    {
        id: 6,
        nombre: "Smartwatch 4",
        categoria: "Tecnología",
        descripcion: "Monitor de salud y notificaciones inteligentes.",
        precio: 550000,
        imagen: "/productos/smartwatch.webp"
    }
];

const Productos: React.FC = () => {
    const { agregarAlCarrito } = useCart();

    const handleAgregarCarrito = (producto: Producto) => {
        agregarAlCarrito(producto);
        // Opcional: podrías agregar una notificación aquí
        console.log(`✅ ${producto.nombre} agregado al carrito`);
    };

    return (
        <div className="productos-contenedor">
            {productos.map((producto) => (
                <div key={producto.id} className="tarjeta-producto">
                    <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="producto-imagen"
                    />
                    <div className="producto-contenido">
                        <h3 className="producto-nombre">{producto.nombre}</h3>
                        <p className="producto-categoria">{producto.categoria}</p>
                        <p className="producto-descripcion">{producto.descripcion}</p>
                        <p className="producto-precio">
                            ${producto.precio.toLocaleString('es-CO')}
                        </p>
                        <button
                            className="btn-agregar-carrito"
                            onClick={() => handleAgregarCarrito(producto)}
                        >
                            🛒 Agregar al carrito
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Productos;