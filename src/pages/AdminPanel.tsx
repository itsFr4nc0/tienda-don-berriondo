import React from "react";


export const AdminPanel: React.FC = () => {

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    window.location.reload();
  };

  return (
    <div className="admin-panel">
      <span className="admin-title">Panel Administrador</span>

      
      <button className="admin-btn">Moderar Comentarios</button>
      <button className="admin-btn">Añadir Producto</button>
      <button className="admin-btn">Editar producto</button>
      <button className="admin-btn">Eliminar Producto</button>

      <button className="admin-btn admin-btn-danger" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </div>
  );
};

