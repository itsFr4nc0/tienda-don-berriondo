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

    const [errors, setErrors] = useState({
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

    // Funciones de validación
    const validarEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validarNombre = (name: string): boolean => {
        return name.trim().length >= 3 && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name);
    };

    const validarPassword = (password: string): boolean => {
        return password.length >= 6;
    };

    const validarCodigoPostal = (code: string): boolean => {
        return /^\d{5,6}$/.test(code);
    };

    const validarFechaNacimiento = (date: string): boolean => {
        const fechaNac = new Date(date);
        const hoy = new Date();
        const edad = hoy.getFullYear() - fechaNac.getFullYear();
        return edad >= 0 && edad <= 120;
    };

    // Función para manejar los cambios en los campos de entrada y actualizar el estado 'formData'.
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Validación en tiempo real
        let error = "";

        switch (name) {
            case "name":
                if (value && !validarNombre(value)) {
                    error = "El nombre debe tener al menos 3 caracteres y solo letras";
                }
                break;
            case "email":
                if (value && !validarEmail(value)) {
                    error = "Correo electrónico inválido";
                }
                break;
            case "password":
                if (value && !validarPassword(value)) {
                    error = "La contraseña debe tener al menos 6 caracteres";
                }
                break;
            case "city":
                if (value && value.trim().length < 3) {
                    error = "La ciudad debe tener al menos 3 caracteres";
                }
                break;
            case "postalCode":
                if (value && !validarCodigoPostal(value)) {
                    error = "El código postal debe tener 5 o 6 dígitos";
                }
                break;
            case "address":
                if (value && value.trim().length < 5) {
                    error = "La dirección debe tener al menos 5 caracteres";
                }
                break;
            case "birthDate":
                if (value && !validarFechaNacimiento(value)) {
                    error = "Fecha de nacimiento inválida";
                }
                break;
        }

        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    // Función principal que maneja el envío del formulario de registro.
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validaciones completas antes de enviar
        const nuevosErrores = {
            name: "",
            email: "",
            password: "",
            city: "",
            postalCode: "",
            address: "",
            birthDate: "",
            gender: "",
        };

        let hayErrores = false;

        if (!formData.name.trim()) {
            nuevosErrores.name = "El nombre es obligatorio";
            hayErrores = true;
        } else if (!validarNombre(formData.name)) {
            nuevosErrores.name = "El nombre debe tener al menos 3 caracteres y solo letras";
            hayErrores = true;
        }

        if (!formData.email.trim()) {
            nuevosErrores.email = "El correo es obligatorio";
            hayErrores = true;
        } else if (!validarEmail(formData.email)) {
            nuevosErrores.email = "Correo electrónico inválido";
            hayErrores = true;
        }

        if (!formData.password) {
            nuevosErrores.password = "La contraseña es obligatoria";
            hayErrores = true;
        } else if (!validarPassword(formData.password)) {
            nuevosErrores.password = "La contraseña debe tener al menos 6 caracteres";
            hayErrores = true;
        }

        if (!formData.city.trim()) {
            nuevosErrores.city = "La ciudad es obligatoria";
            hayErrores = true;
        } else if (formData.city.trim().length < 3) {
            nuevosErrores.city = "La ciudad debe tener al menos 3 caracteres";
            hayErrores = true;
        }

        if (!formData.postalCode.trim()) {
            nuevosErrores.postalCode = "El código postal es obligatorio";
            hayErrores = true;
        } else if (!validarCodigoPostal(formData.postalCode)) {
            nuevosErrores.postalCode = "El código postal debe tener 5 o 6 dígitos";
            hayErrores = true;
        }

        if (!formData.address.trim()) {
            nuevosErrores.address = "La dirección es obligatoria";
            hayErrores = true;
        } else if (formData.address.trim().length < 5) {
            nuevosErrores.address = "La dirección debe tener al menos 5 caracteres";
            hayErrores = true;
        }

        if (!formData.birthDate) {
            nuevosErrores.birthDate = "La fecha de nacimiento es obligatoria";
            hayErrores = true;
        } else if (!validarFechaNacimiento(formData.birthDate)) {
            nuevosErrores.birthDate = "Fecha de nacimiento inválida";
            hayErrores = true;
        }

        if (!formData.gender) {
            nuevosErrores.gender = "Debes seleccionar un género";
            hayErrores = true;
        }

        setErrors(nuevosErrores);

        if (hayErrores) {
            toast.error("Por favor corrige los errores en el formulario", {
                position: "top-right",
                autoClose: 2500,
                theme: "colored",
            });
            return;
        }

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
        users.push({
          ...formData,
          role: "user", // por defecto todos son usuarios normales
        });
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
                        className={errors.name ? "input-error" : ""}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}

                    <label htmlFor="email">Correo electrónico:</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Correo electrónico"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? "input-error" : ""}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}

                    <label htmlFor="password">Contraseña:</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={handleChange}
                        className={errors.password ? "input-error" : ""}
                    />
                    {errors.password && <span className="error-message">{errors.password}</span>}

                    <label htmlFor="city">Ciudad:</label>
                    <input
                        id="city"
                        type="text"
                        name="city"
                        placeholder="Ciudad"
                        value={formData.city}
                        onChange={handleChange}
                        className={errors.city ? "input-error" : ""}
                    />
                    {errors.city && <span className="error-message">{errors.city}</span>}

                    <label htmlFor="postalCode">Código postal:</label>
                    <input
                        id="postalCode"
                        type="text"
                        name="postalCode"
                        placeholder="Código postal"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className={errors.postalCode ? "input-error" : ""}
                    />
                    {errors.postalCode && (
                        <span className="error-message">{errors.postalCode}</span>
                    )}

                    <label htmlFor="address">Dirección:</label>
                    <input
                        id="address"
                        type="text"
                        name="address"
                        placeholder="Dirección"
                        value={formData.address}
                        onChange={handleChange}
                        className={errors.address ? "input-error" : ""}
                    />
                    {errors.address && <span className="error-message">{errors.address}</span>}

                    <label htmlFor="birthDate">Fecha de nacimiento:</label>
                    <input
                        id="birthDate"
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                        className={errors.birthDate ? "input-error" : ""}
                    />
                    {errors.birthDate && (
                        <span className="error-message">{errors.birthDate}</span>
                    )}

                    <label htmlFor="gender">Género:</label>
                    <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className={errors.gender ? "input-error" : ""}
                    >
                        <option value="">Selecciona una opción</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                        <option value="otro">Otro</option>
                    </select>
                    {errors.gender && <span className="error-message">{errors.gender}</span>}

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