// Importa las dependencias necesarias de React y bibliotecas externas.
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Definición del componente principal de Registro.
export const Register: React.FC = () => {
  // Almacena todos los campos de entrada necesarios para el registro del usuario.
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
    postalCode: "",
    address: "",
    birthDate: "",
    gender: "",
  });

  const navigate = useNavigate();
// Función para manejar los cambios en los campos de entrada y actualizar el estado 'formData'.
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
// Función principal que maneja el envío del formulario de registro.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para obtener usuarios existentes del LocalStorage. 
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    // Verifica si ya existe un usuario con el mismo email para evitar duplicados.
    const userExists = users.some((u: any) => u.email === formData.email);
// Si el correo ya existe, muestra una advertencia y detiene el proceso.
    if (userExists) {
      toast.warn("El correo ya está registrado", {
        position: "top-right",
        autoClose: 2500,
        theme: "colored",
      });
      return;
    }
// Si el usuario es nuevo, lo agrega al array de usuarios.
    users.push(formData);
    localStorage.setItem("users", JSON.stringify(users));
// Muestra una notificación de éxito.
    toast.success("Registro exitoso", {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });
// Redirige al usuario a la página de login después de un breve retraso.
    setTimeout(() => navigate("/login"), 2000);
  };
// Contenedor principal de la vista de registro.
  return (
    
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Crear Cuenta</h2>
        {/* Formulario que utiliza 'handleSubmit' al enviarse. */}
        <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Nombre completo:</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Nombre completo"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Correo electrónico:</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Contraseña:</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label htmlFor="city">Ciudad:</label>
          <input
            id="city"
            type="text"
            name="city"
            placeholder="Ciudad"
            value={formData.city}
            onChange={handleChange}
            required
          />

          <label htmlFor="postalCode">Código postal:</label>
          <input
            id="postalCode"
            type="text"
            name="postalCode"
            placeholder="Código postal"
            value={formData.postalCode}
            onChange={handleChange}
            required
          />

          <label htmlFor="address">Dirección:</label>
          <input
            id="address"
            type="text"
            name="address"
            placeholder="Dirección"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <label htmlFor="birthDate">Fecha de nacimiento:</label>
          <input
            id="birthDate"
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
          />

          <label htmlFor="gender">Género:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una opción</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
            <option value="otro">Otro</option>
          </select>
          {/* Botón de envío del formulario. */}
          <button type="submit">Registrarse</button>
        </form>
        {/* Enlace de navegación para usuarios que ya tienen cuenta. */}
        <p className="register-login-link">
          Ombe atembado ¿Ya tiene cuenta?{" "}
          <Link to="/login" className="link">
            Inicia sesión aquí y empiece a comprar papa
          </Link>
        </p>
      </div>

      {/* Contenedor de notificaciones */}
      <ToastContainer />
    </div>
  );
};
