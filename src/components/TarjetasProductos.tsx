import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import type { Producto } from "../context/CartContext";
import "./TarjetasProductos.css";

const productos: Producto[] = [
    {
        id: 1,
        nombre: "Laptop Gamer",
        categoria: "Tecnología",
        descripcion: "Alto rendimiento para juegos.",
        precio: 3200000,
        imagen: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400"
    },
    {
        id: 2,
        nombre: "Auriculares Bluetooth",
        categoria: "Accesorios personales",
        descripcion: "Sonido envolvente y batería de larga duración.",
        precio: 320000,
        imagen: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
    },
    {
        id: 3,
        nombre: "Smartwatch",
        categoria: "Tecnología",
        descripcion: "Monitor de salud y notificaciones inteligentes.",
        precio: 1550000,
        imagen: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400"
    },
    {
        id: 4,
        nombre: "Escritorio Ergonómico",
        categoria: "Hogar",
        descripcion: "Espacio amplio y diseño moderno.",
        precio: 850000,
        imagen: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400"
    },
    {
        id: 5,
        nombre: "Cuadernos",
        categoria: "Papelería",
        descripcion: "Papel de alta calidad para tus notas.",
        precio: 25000,
        imagen: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400"
    },
    {
        id: 6,
        nombre: "Balón de Fútbol",
        categoria: "Deporte",
        descripcion: "Material resistente y óptimo rebote.",
        precio: 120000,
        imagen: "https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=400"
    },
    {
        id: 7,
        nombre: "Tablet 10 Pulgadas",
        categoria: "Tecnología",
        descripcion: "Ideal para trabajo y entretenimiento.",
        precio: 980000,
        imagen: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400"
    },
    {
        id: 8,
        nombre: "Lámpara de Mesa LED",
        categoria: "Hogar",
        descripcion: "Iluminación ajustable y bajo consumo.",
        precio: 125000,
        imagen: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400"
    },
    {
        id: 9,
        nombre: "Bolígrafos ",
        categoria: "Papelería",
        descripcion: "set de 15 Boligrafos negros, azules y rojos.",
        precio: 20000,
        imagen:  "https://plus.unsplash.com/premium_photo-1760662482274-b90c8050fd69?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687"
    },
    {
        id: 10,
        nombre: "Mochila Deportiva",
        categoria: "Deporte",
        descripcion: "Resistente al agua con múltiples compartimentos.",
        precio: 120000,
        imagen: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400"
    },
    {
        id: 11,
        nombre: "Reloj Fitness",
        categoria: "Accesorios personales",
        descripcion: "Monitoreo de actividad y sueño.",
        precio: 800000,
        imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
    },
    {
        id: 12,
        nombre: "Mouse Inalámbrico",
        categoria: "Tecnología",
        descripcion: "Ergonómico con batería de 6 meses.",
        precio: 95000,
        imagen: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400"
    },
    {
        id: 13,
        nombre: "Cojines Decorativos",
        categoria: "Hogar",
        descripcion: "Set de 5 cojines.",
        precio: 150000,
        imagen: "https://images.unsplash.com/photo-1617326021886-53d6be1d7154?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1171"
    },
    {
        id: 14,
        nombre: "Set Marcadores",
        categoria: "Papelería",
        descripcion: "15 Marcadores de punta fina y colores vivos.",
        precio: 55000,
        imagen: "https://images.unsplash.com/photo-1587117266184-2fbb10ccc05e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
    },
    {
        id: 15,
        nombre: "Pesas",
        categoria: "Deporte",
        descripcion: "Set de 2 pesas de 10 kg.",
        precio: 150000,
        imagen: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400"
    },
    {
        id: 16,
        nombre: "Gafas de Sol",
        categoria: "Accesorios personales",
        descripcion: "Protección UV400 con diseño moderno.",
        precio: 220000,
        imagen: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400"
    },
    {
        id: 17,
        nombre: "Teclado Mecánico RGB",
        categoria: "Tecnología",
        descripcion: "Switches azules con iluminación personalizable.",
        precio: 320000,
        imagen: "https://images.unsplash.com/photo-1669884209488-1332b73f122b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 18,
        nombre: "Alfombra Moderna",
        categoria: "Hogar",
        descripcion: "Suave textura de 2x3 metros.",
        precio: 380000,
        imagen: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400"
    },
    {
        id: 19,
        nombre: "Calculadora Científica",
        categoria: "Papelería",
        descripcion: "240 funciones para matemáticas avanzadas.",
        precio: 85000,
        imagen: "https://images.unsplash.com/photo-1574607383077-47ddc2dc51c4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1936"
    },
    {
        id: 20,
        nombre: "Yoga Mat",
        categoria: "Deporte",
        descripcion: "Antideslizante con grosor de 6mm.",
        precio: 145000,
        imagen: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400"
    }
];

const categorias = ["Todas", "Hogar", "Papelería", "Tecnología", "Accesorios personales", "Deporte"];

const Productos: React.FC = () => {
    const { agregarAlCarrito } = useCart();
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");

    const productosFiltrados = categoriaSeleccionada === "Todas"
        ? productos
        : productos.filter(p => p.categoria === categoriaSeleccionada);

    const handleAgregarCarrito = (producto: Producto) => {
        agregarAlCarrito(producto);
        console.log(`✅ ${producto.nombre} agregado al carrito`);
    };

    return (
        <div className="pagina-productos">
            {/* Filtros */}
            <div className="filtros-contenedor">
                <h2 className="filtros-titulo">Filtrar por categoría</h2>
                <div className="filtros-botones">
                    {categorias.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategoriaSeleccionada(cat)}
                            className={`boton-categoria ${categoriaSeleccionada === cat ? 'activo' : ''}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Productos */}
            <div className="productos-contenedor">
                {productosFiltrados.map((producto) => (
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
        </div>
    );
};

export default Productos;