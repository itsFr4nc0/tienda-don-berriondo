// Importa las dependencias necesarias de React y bibliotecas externas.
import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Definición del componente principal de Inicio de Sesión.
export const Login: React.FC = () => {

  // Estado para almacenar el valor del correo electrónico introducido y contraseña por el usuario.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Función principal que se ejecuta al enviar el formulario.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 🔥 LLAMADA REAL AL BACKEND
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // ❌ ERROR DEL BACKEND
      if (!response.ok) {
        toast.error(data.message || "Correo o contraseña incorrectos", {
          position: "top-right",
          autoClose: 2000,
          theme: "colored",
        });
        return;
      }

      // ✅ LOGIN EXITOSO
      toast.success(`Bienvenido ${data.user.name}`, {
        position: "top-right",
        autoClose: 1500,
        theme: "colored",
      });

      // Guardar sesión (token + usuario)
      localStorage.setItem("token", data.token);
      localStorage.setItem("loggedUser", JSON.stringify(data.user));

      // Si es admin
      if (data.user.role === "admin") {
        toast.success(`Bienvenido Administrador ${data.user.name}`, {
          position: "top-right",
          autoClose: 1500,
          theme: "colored",
        });
      }

      // Redirección
      setTimeout(() => navigate("/"), 1500);

    } catch (error) {
      console.error(error);
      toast.error("Error al conectar con el servidor", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
    }
  };

  // Contenedor principal de la vista de inicio de sesión.
  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Iniciar Sesión</h2>

        {/* Formulario que utiliza 'handleSubmit' al enviarse. */}
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
    </div>
  );
};
