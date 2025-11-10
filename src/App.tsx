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

const App: React.FC = () => {
    const location = useLocation();

    const hideLayout =
        location.pathname === "/login" || location.pathname === "/register";

    return (
        <div className="app-container">
            {!hideLayout && <Header />}

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