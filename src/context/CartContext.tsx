import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// Interfaz para el producto
export interface Producto {
    id: number;
    nombre: string;
    precio: number; // precio como número (ej: 3200000)
    imagen: string;
    descripcion?: string;
    categoria?: string;
}

// Interfaz para el item del carrito (producto + cantidad)
export interface ItemCarrito extends Producto {
    cantidad: number;
}

// Interfaz para el contexto
interface CartContextType {
    items: ItemCarrito[];
    agregarAlCarrito: (producto: Producto) => void;
    eliminarDelCarrito: (id: number) => void;
    incrementarCantidad: (id: number) => void;
    decrementarCantidad: (id: number) => void;
    vaciarCarrito: () => void;
    totalItems: number;
    totalPrecio: number;
}

// Crear el contexto
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider del carrito
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<ItemCarrito[]>([]);

    // Agregar producto al carrito
    const agregarAlCarrito = (producto: Producto) => {
        setItems((prevItems) => {
            const itemExistente = prevItems.find((item) => item.id === producto.id);

            if (itemExistente) {
                // Si ya existe, incrementar cantidad
                return prevItems.map((item) =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            } else {
                // Si no existe, agregarlo con cantidad 1
                return [...prevItems, { ...producto, cantidad: 1 }];
            }
        });
    };

    // Eliminar producto del carrito
    const eliminarDelCarrito = (id: number) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    // Incrementar cantidad
    const incrementarCantidad = (id: number) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
            )
        );
    };

    // Decrementar cantidad
    const decrementarCantidad = (id: number) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id && item.cantidad > 1
                    ? { ...item, cantidad: item.cantidad - 1 }
                    : item
            )
        );
    };

    // Vaciar carrito
    const vaciarCarrito = () => {
        setItems([]);
    };

    // Calcular total de items
    const totalItems = items.reduce((sum, item) => sum + item.cantidad, 0);

    // Calcular precio total
    const totalPrecio = items.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                agregarAlCarrito,
                eliminarDelCarrito,
                incrementarCantidad,
                decrementarCantidad,
                vaciarCarrito,
                totalItems,
                totalPrecio,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// Hook personalizado para usar el carrito
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart debe usarse dentro de un CartProvider');
    }
    return context;
};
