import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("loggedUser", JSON.stringify(user));
      toast.success(`Bienvenido a la mejor tienda ${user.name}`, {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
      setTimeout(() => navigate("/"), 2000);
    } else {
      toast.error("Correo o contraseña incorrectos", {
        position: "top-right",
        autoClose: 2500,
        theme: "colored",
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Iniciar Sesión</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="loginEmail">Correo electrónico:</label>
          <input
            id="loginEmail"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="loginPassword">Contraseña:</label>
          <input
            id="loginPassword"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Entrar</button>
        </form>

        <p className="login-register-link">
          ¿No tienes cuenta? no se haga coger tristeza{" "}
          <Link to="/register" className="link">
            Regístrate aquí ome
          </Link>
        </p>
      </div>

      {/* Contenedor de notificaciones */}
      <ToastContainer />
    </div>
  );
};
