import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ChatbotButton } from "./components/ChatbotButton";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import "./assets/styles/global.css";
import OpinionesClientes from "./components/OpinionesClientes";
import Productos from "./components/TarjetasProductos.tsx";

// Definición del Componente Principal de la Aplicación.
const App: React.FC = () => {
    // Lógica de Estado y Navegación
    const location = useLocation();
// Determina si la página actual es Login o Register para ocultar el layout principal.
    const hideLayout =
        location.pathname === "/login" || location.pathname === "/register";
//Renderizado Condicional del Layout y Rutas
    return (
        <div className="app-container">
            {/* Renderiza el Header solo si no estamos en Login o Register. */}
            {!hideLayout && <Header />}
            {/* Configuración de las Rutas de la Aplicación */}

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>

            {!hideLayout && (
                <>
                    <Productos />
                    <OpinionesClientes />
                    <Footer />
                    <ChatbotButton />
                </>
            )}

            {/* Toast Container para las notificaciones */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    );
};

export default App;