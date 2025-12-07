import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './CreateOpinionModal.css';

interface CreateOpinionModalProps {
    productId: number;
    productName: string;
    onClose: () => void;
    onSuccess: () => void;
}

export const CreateOpinionModal: React.FC<CreateOpinionModalProps> = ({
                                                                          productId,
                                                                          productName,
                                                                          onClose,
                                                                          onSuccess
                                                                      }) => {
    const [estrellas, setEstrellas] = useState(5);
    const [comentario, setComentario] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!comentario.trim()) {
            toast.error('Debes escribir un comentario');
            return;
        }

        setLoading(true);

        try {
            const loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');
            const token = loggedUser.token;

            const response = await fetch('http://localhost:4000/api/opinions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    productId,
                    comentario,
                    estrellas
                })
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('¡Opinión enviada exitosamente!');
                onSuccess();
                onClose();
            } else {
                toast.error(data.message || 'Error al enviar opinión');
            }
        } catch (error) {
            toast.error('Error al conectar con el servidor');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>

                <h2 className="modal-title">Opina sobre {productName}</h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Calificación:</label>
                        <div className="stars-selector">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    className={`star-btn ${star <= estrellas ? 'active' : ''}`}
                                    onClick={() => setEstrellas(star)}
                                >
                                    ⭐
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Tu comentario:</label>
                        <textarea
                            value={comentario}
                            onChange={(e) => setComentario(e.target.value)}
                            placeholder="Comparte tu experiencia con este producto..."
                            rows={5}
                            maxLength={500}
                            required
                        />
                        <small>{comentario.length}/500 caracteres</small>
                    </div>

                    <div className="modal-actions">
                        <button
                            type="button"
                            className="btn-cancel"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="btn-submit"
                            disabled={loading}
                        >
                            {loading ? 'Enviando...' : 'Enviar opinión'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};