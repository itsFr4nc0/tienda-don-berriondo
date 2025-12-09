import React, { useState } from "react";
import { AddProductModal } from "../components/AddProductModal";
import { EditProductModal } from "../components/EditProductModal";
import { DeleteProductModal } from "../components/DeleteProductModal";

export const AdminPanel: React.FC = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("loggedUser");
        window.location.reload();
    };

    return (
        <>
            <div className="admin-panel">
                <span className="admin-title">Panel Administrador</span>

                <button className="admin-btn">Moderar Comentarios</button>

                <button
                    className="admin-btn"
                    onClick={() => setShowAddModal(true)}
                >
                    Añadir Producto
                </button>

                <button
                    className="admin-btn"
                    onClick={() => setShowEditModal(true)}
                >
                    Editar producto
                </button>

                <button
                    className="admin-btn"
                    onClick={() => setShowDeleteModal(true)}
                >
                    Eliminar Producto
                </button>

                <button className="admin-btn admin-btn-danger" onClick={handleLogout}>
                    Cerrar sesión
                </button>
            </div>

            {/* MODAL AÑADIR */}
            {showAddModal && (
                <AddProductModal close={() => setShowAddModal(false)} />
            )}

            {/* MODAL EDITAR */}
            {showEditModal && (
                <EditProductModal close={() => setShowEditModal(false)} />
            )}

            {/* MODAL ELIMINAR */}
            {showDeleteModal && (
                <DeleteProductModal close={() => setShowDeleteModal(false)} />
            )}
        </>
    );
};