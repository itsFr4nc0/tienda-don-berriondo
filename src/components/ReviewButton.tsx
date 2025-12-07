import React, { useState, useEffect } from 'react';
import { CreateOpinionModal } from './CreateOpinionModal';
import { toast } from 'react-toastify';
import './ReviewButton.css';

interface ReviewButtonProps {
    productId: number;
    productName: string;
}

export const ReviewButton: React.FC<ReviewButtonProps> = ({ productId, productName }) => {
    const [canReview, setCanReview] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [reviewStatus, setReviewStatus] = useState({
        hasPurchased: false,
        alreadyReviewed: false
    });

    useEffect(() => {
        checkReviewStatus();
    }, [productId]);

    const checkReviewStatus = async () => {
        const loggedUser = JSON.parse(localStorage.getItem('loggedUser') || 'null');

        if (!loggedUser || !loggedUser.token) {
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:4000/api/opinions/can-review/${productId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${loggedUser.token}`
                    }
                }
            );

            if (response.ok) {
                const data = await response.json();
                setCanReview(data.canReview);
                setReviewStatus({
                    hasPurchased: data.hasPurchased,
                    alreadyReviewed: data.alreadyReviewed
                });
            }
        } catch (error) {
            console.error('Error verificando estado de opinión:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClick = () => {
        const loggedUser = JSON.parse(localStorage.getItem('loggedUser') || 'null');

        if (!loggedUser) {
            toast.info('Debes iniciar sesión para opinar');
            return;
        }

        if (!reviewStatus.hasPurchased) {
            toast.warning('Debes comprar este producto para poder opinar');
            return;
        }

        if (reviewStatus.alreadyReviewed) {
            toast.info('Ya has enviado una opinión sobre este producto');
            return;
        }

        setShowModal(true);
    };

    if (loading) return null;

    return (
        <>
            <button
                className={`review-btn ${canReview ? 'can-review' : 'cannot-review'}`}
                onClick={handleClick}
            >
                {canReview ? '⭐ Deja tu opinión' : '💬 Opinar sobre este producto'}
            </button>

            {showModal && (
                <CreateOpinionModal
                    productId={productId}
                    productName={productName}
                    onClose={() => setShowModal(false)}
                    onSuccess={checkReviewStatus}
                />
            )}
        </>
    );
};