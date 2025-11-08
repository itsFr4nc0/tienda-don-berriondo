import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Register: React.FC = () => {
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = users.some((u: any) => u.email === formData.email);

    if (userExists) {
      toast.warn("El correo ya está registrado", {
        position: "top-right",
        autoClose: 2500,
        theme: "colored",
      });
      return;
    }

    users.push(formData);
    localStorage.setItem("users", JSON.stringify(users));

    toast.success("Registro exitoso", {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });

    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Crear Cuenta</h2>

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

          <button type="submit">Registrarse</button>
        </form>

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
