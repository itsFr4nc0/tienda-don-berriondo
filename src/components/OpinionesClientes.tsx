import React, { useState, useEffect } from 'react';
import './OpinionesClientes.css';

interface Opinion {
    id: string;
    nombre: string;
    comentario: string;
    estrellas: number;
    producto: string;
    fecha: string;
}

const OpinionesClientes: React.FC = () => {
    const [opiniones, setOpiniones] = useState<Opinion[]>([]);
    const [indiceActual, setIndiceActual] = useState(0);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        fetchOpinions();
    }, []);

    const fetchOpinions = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/opinions');
            if (response.ok) {
                const data = await response.json();
                setOpiniones(data);
            }
        } catch (error) {
            console.error('Error al cargar opiniones:', error);
        } finally {
            setCargando(false);
        }
    };

    const anteriorOpinion = () => {
        setIndiceActual((prevIndice) =>
            prevIndice === 0 ? opiniones.length - 1 : prevIndice - 1
        );
    };

    const siguienteOpinion = () => {
        setIndiceActual((prevIndice) =>
            prevIndice === opiniones.length - 1 ? 0 : prevIndice + 1
        );
    };

    const renderEstrellas = (cantidad: number) => {
        return '⭐'.repeat(cantidad);
    };

    if (cargando) {
        return (
            <div className="opiniones-banda">
                <h2 className="opiniones-titulo">Cargando...</h2>
            </div>
        );
    }

    if (opiniones.length === 0) {
        return (
            <div className="opiniones-banda">
                <h2 className="opiniones-titulo">
                    Sé el primero en dejar tu opinión
                </h2>
            </div>
        );
    }

    return (
        <div className="opiniones-banda">
            <h2 className="opiniones-titulo">
                Lo que comentan nuestros compradores avispados
            </h2>

            <div className="opiniones-wrapper">
                <button
                    className="flecha flecha-izquierda"
                    onClick={anteriorOpinion}
                    aria-label="Opinión anterior"
                >
                    ‹
                </button>

                <div className="opiniones-container">
                    <div className="opinion-card" key={indiceActual}>
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

                <button
                    className="flecha flecha-derecha"
                    onClick={siguienteOpinion}
                    aria-label="Opinión siguiente"
                >
                    ›
                </button>
            </div>

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
