import React, { useState } from 'react';
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

    // Estado para controlar qué opinión se muestra
    const [indiceActual, setIndiceActual] = useState(0);

    // Función para ir a la opinión anterior
    const anteriorOpinion = () => {
        setIndiceActual((prevIndice) =>
            prevIndice === 0 ? opiniones.length - 1 : prevIndice - 1
        );
    };

    // Función para ir a la siguiente opinión
    const siguienteOpinion = () => {
        setIndiceActual((prevIndice) =>
            prevIndice === opiniones.length - 1 ? 0 : prevIndice + 1
        );
    };

    const renderEstrellas = (cantidad: number) => {
        return '⭐'.repeat(cantidad);
    };

    return (
        <div className="opiniones-banda">
            <h2 className="opiniones-titulo">
                 Lo que comentan nuestros compradores avispados
            </h2>
            <div className="opiniones-wrapper">
                {/* Flecha izquierda */}
                <button
                    className="flecha flecha-izquierda"
                    onClick={anteriorOpinion}
                    aria-label="Opinión anterior"
                >
                    ‹
                </button>

                {/* Contenedor de opiniones */}
                <div className="opiniones-container">
                    <div
                        className="opinion-card"
                        key={indiceActual}
                    >
                        <div className="estrellas">
                            {renderEstrellas(opiniones[indiceActual].estrellas)}
                        </div>
                        <p className="comentario">
                            "{opiniones[indiceActual].comentario}"
                        </p>
                        <p className="nombre">
                            - {opiniones[indiceActual].nombre}
                        </p>
                    </div>
                </div>

                {/* Flecha derecha */}
                <button
                    className="flecha flecha-derecha"
                    onClick={siguienteOpinion}
                    aria-label="Opinión siguiente"
                >
                    ›
                </button>
            </div>

            {/* Indicadores de puntos */}
            <div className="indicadores">
                {opiniones.map((_, index) => (
                    <button
                        key={index}
                        className={`indicador ${index === indiceActual ? 'activo' : ''}`}
                        onClick={() => setIndiceActual(index)}
                        aria-label={`Ir a opinión ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default OpinionesClientes;