import React, { useState } from "react";
import { AddProductModal } from "../components/AddProductModal";

export const AdminPanel: React.FC = () => {

  const [showAddModal, setShowAddModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    window.location.reload();
  };

  return (
    <>
      <div className="admin-panel">
        <span className="admin-title">Panel Administrador</span>

        <button className="admin-btn">Moderar Comentarios</button>

        {/*BOTÓN ACTIVO */}
        <button
          className="admin-btn"
          onClick={() => setShowAddModal(true)}
        >
          Añadir Producto
        </button>

        <button className="admin-btn">Editar producto</button>
        <button className="admin-btn">Eliminar Producto</button>

        <button className="admin-btn admin-btn-danger" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>

      {/* MOSTRAR MODAL */}
      {showAddModal && (
        <AddProductModal close={() => setShowAddModal(false)} />
      )}
    </>
  );
};

