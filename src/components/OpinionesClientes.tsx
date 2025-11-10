import React, { useState } from 'react';
import './OpinionesClientes.css';

interface Opinion {
    nombre: string;
    comentario: string;
    estrellas: number;
    producto: string;
}

const OpinionesClientes: React.FC = () => {
    const opiniones: Opinion[] = [
        {
            nombre: "Camila Restrepo",
            comentario: "La Laptop Gamer superó mis expectativas. Corre todos los juegos en ultra sin problemas y la pantalla es espectacular.",
            estrellas: 5,
            producto: "Laptop Gamer"
        },
        {
            nombre: "Andrés López",
            comentario: "Los Auriculares Bluetooth tienen una calidad de sonido increíble. La batería dura muchísimo, perfecto para el trabajo remoto.",
            estrellas: 5,
            producto: "Auriculares Bluetooth"
        },
        {
            nombre: "Sofia Martínez",
            comentario: "El Escritorio Ergonómico cambió mi espacio de trabajo. Amplio, resistente y el diseño le da un toque profesional a mi oficina.",
            estrellas: 5,
            producto: "Escritorio Ergonómico"
        },
        {
            nombre: "Diego Hernández",
            comentario: "El Teclado Mecánico RGB es una joya. Los switches azules suenan perfectos y la iluminación personalizable es genial.",
            estrellas: 4,
            producto: "Teclado Mecánico RGB"
        },
        {
            nombre: "Valentina Castro",
            comentario: "Mi Smartwatch llegó rápido y funciona de maravilla. El monitoreo de salud es muy preciso y las notificaciones son súper útiles.",
            estrellas: 5,
            producto: "Smartwatch"
        },
        {
            nombre: "Mateo Ruiz",
            comentario: "Las Pesas son de excelente calidad. Material resistente y el peso está bien distribuido. Ideal para entrenar en casa.",
            estrellas: 4,
            producto: "Pesas"
        },
        {
            nombre: "Isabella Ramírez",
            comentario: "La Tablet es perfecta para estudiar y ver series. Buena resolución, batería duradera y muy rápida. Totalmente recomendada.",
            estrellas: 5,
            producto: "Tablet 10 Pulgadas"
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
                        <div className="producto-nombre">
                            {opiniones[indiceActual].producto}
                        </div>
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