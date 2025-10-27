import React from 'react';
import './OpinionesClientes.css';

interface Opinion {
    nombre: string;
    comentario: string;
    estrellas: number;
}

const OpinionesClientes: React.FC = () => {
    const opiniones: Opinion[] = [
        {
            nombre: "María González",
            comentario: "Excelente calidad de café, el mejor de Medellín. Muy recomendado!",
            estrellas: 5
        },
        {
            nombre: "Carlos Ramírez",
            comentario: "El servicio es increíble y el café está fresco siempre.",
            estrellas: 5
        },
        {
            nombre: "Ana Martínez",
            comentario: "Me encanta la variedad de productos y los precios son justos.",
            estrellas: 4
        },
        {
            nombre: "Juan Pérez",
            comentario: "Compro aquí desde hace años, nunca me han fallado.",
            estrellas: 5
        }
    ];

    const renderEstrellas = (cantidad: number) => {
        return '⭐'.repeat(cantidad);
    };

    return (
        <div className="opiniones-banda">
            <div className="opiniones-container">
                {opiniones.map((opinion, index) => (
                    <div key={index} className="opinion-card">
                        <div className="estrellas">{renderEstrellas(opinion.estrellas)}</div>
                        <p className="comentario">"{opinion.comentario}"</p>
                        <p className="nombre">- {opinion.nombre}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OpinionesClientes;