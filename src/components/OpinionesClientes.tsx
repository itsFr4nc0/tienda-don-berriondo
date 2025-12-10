import React, { useState, useEffect } from 'react';
import './OpinionesClientes.css';

interface Opinion {
    id: string;
    nombre: string;
    comentario: string;
    estrellas: number;
    producto?: string;
    productId: number;
    fecha: string;
}

interface Product {
    id: number;
    nombre: string;
}

const OpinionesClientes: React.FC = () => {
    const [opiniones, setOpiniones] = useState<Opinion[]>([]);
    const [productos, setProductos] = useState<Product[]>([]);
    const [indiceActual, setIndiceActual] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [opinionesRes, productosRes] = await Promise.all([
                fetch('http://localhost:4000/api/opinions'),
                fetch('http://localhost:4000/api/products')
            ]);

            if (opinionesRes.ok && productosRes.ok) {
                const opinionesData = await opinionesRes.json();
                const productosData = await productosRes.json();

                setOpiniones(opinionesData);
                setProductos(productosData);
            }
        } catch (error) {
            console.error('Error al cargar datos:', error);
        } finally {
            setLoading(false);
        }
    };

    const getProductName = (productId: number): string => {
        const product = productos.find(p => p.id === productId);
        return product?.nombre || 'Producto';
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

    if (loading) {
        return (
            <div className="opiniones-banda">
                <h2 className="opiniones-titulo">Cargando opiniones...</h2>
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
                            {getProductName(opiniones[indiceActual].productId)}
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