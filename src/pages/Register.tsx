import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";

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
    console.log("Datos de registro:", formData);
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
    </div>
  );
};
