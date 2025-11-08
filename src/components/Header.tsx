import React, { useState, useEffect } from "react";
import "../assets/styles/global.css";
import { useNavigate } from "react-router-dom";
import { CartPanel } from "./CartPanel";

export const Header: React.FC = () => {
  const [openCart, setOpenCart] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  // Verifica si hay un usuario guardado en localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  
  const handleUserClick = () => {
    setShowMenu(!showMenu);
  };

  // Cerrar sesion
  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    setUser(null);
    setShowMenu(false);
    navigate("/login");
  };

  return (
    <>
      <header className="header">
        <h1 className="header-title">Mi Tienda</h1>

        <div className="header-icons">
          
          <img
            src="/icons/cart.svg"
            alt="Carrito"
            onClick={() => setOpenCart(!openCart)}
            className="icon clickable"
          />

          
          <div className="user-menu-container" style={{ position: "relative" }}>
            <img
              src="/icons/user.svg"
              alt="Usuario"
              className="icon clickable"
              onClick={handleUserClick}
            />

            {showMenu && (
              <div
                className="user-dropdown"
                style={{
                  position: "absolute",
                  right: 0,
                  top: "40px",
                  background: "white",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  padding: "10px",
                  minWidth: "150px",
                  zIndex: 100,
                }}
              >
                {user ? (
                  <>
                    <p style={{ margin: "5px 0", fontWeight: "500" }}>
                       Cuenta: {user.name}
                    </p>
                    <button
                      onClick={handleLogout}
                      style={{
                        width: "100%",
                        background: "#d9534f",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        padding: "5px 0",
                        cursor: "pointer",
                      }}
                    >
                      Cerrar sesión
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => navigate("/login")}
                    style={{
                      width: "100%",
                      background: "#007bff",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      padding: "5px 0",
                      cursor: "pointer",
                    }}
                  >
                    Iniciar sesión
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      <CartPanel open={openCart} onClose={() => setOpenCart(false)} />
    </>
  );
};
