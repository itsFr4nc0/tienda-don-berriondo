import React from "react";
import "./TarjetasProductos.css";

type Producto = {
    id: number;
    nombre: string;
    categoria: string;
    descripcion: string;
    precio: string;
    imagen: string;
};

const productos: Producto[] = [
    {
        id: 1,
        nombre: "Laptop Gamer",
        categoria: "Tecnología",
        descripcion: "Alto rendimiento para juegos y diseño.",
        precio: "$3.200.000",
        imagen: "public/productos/laptop.webp"
    },
    {
        id: 2,
        nombre: "Auriculares Bluetooth",
        categoria: "Accesorios",
        descripcion: "Sonido envolvente y batería de larga duración.",
        precio: "$320.000",
        imagen: "public/productos/audifonos.jpg"
    },
    {
        id: 3,
        nombre: "Smartwatch",
        categoria: "Tecnología",
        descripcion: "Monitor de salud y notificaciones inteligentes.",
        precio: "$550.000",
        imagen: "public/productos/smartwatch.webp"
    },
    {
        id: 4,
        nombre: "Smartwatch",
        categoria: "Tecnología",
        descripcion: "Monitor de salud y notificaciones inteligentes.",
        precio: "$550.000",
        imagen: "public/productos/smartwatch.webp"
    },
    {
        id: 5,
        nombre: "Smartwatch",
        categoria: "Tecnología",
        descripcion: "Monitor de salud y notificaciones inteligentes.",
        precio: "$550.000",
        imagen: "public/productos/smartwatch.webp"
    },
    {
        id: 6,
        nombre: "Smartwatch",
        categoria: "Tecnología",
        descripcion: "Monitor de salud y notificaciones inteligentes.",
        precio: "$550.000",
        imagen: "public/productos/smartwatch.webp"
    }
];

const Productos: React.FC = () => {
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
                        <p className="producto-precio">{producto.precio}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Productos;
