import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ChatbotButton } from "./components/ChatbotButton";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import ProductDetail from "./pages/ProductDetail";
import ProductDetailEdit from "./pages/ProductDetailEdit.tsx";
import "./assets/styles/global.css";

import OpinionesClientes from "./components/OpinionesClientes";
import Productos from "./components/TarjetasProductos";

import { AdminPanel } from "./pages/AdminPanel";

// COMPONENTE PRINCIPAL

const App: React.FC = () => {

  const location = useLocation();

  const loggedUser = JSON.parse(localStorage.getItem("loggedUser") || "null");

  const isAdmin = loggedUser?.role === "admin";
  const isLogged = !!loggedUser?.token;



  const hideLayout =
    location.pathname === "/login" || 
    location.pathname === "/register" ||
    location.pathname.startsWith("/producto/") ||
    location.pathname.startsWith("/admin/editar-producto/"); // ← AÑADIDO

    return (
        <div className="app-container">

            {/* PANEL ADMIN FIJO ARRIBA */}
            {isAdmin && <AdminPanel />}

            {!hideLayout && <Header />}

            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>

                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/producto/:id" element={<ProductDetail />} />
                    <Route path="/admin/editar-producto/:id" element={<ProductDetailEdit />} /> {/* ← NUEVA RUTA */}

                </Routes>
            </AnimatePresence>


            {!hideLayout && (
                <>
                    <Productos />
                    <OpinionesClientes />

                    <Footer />
                    <ChatbotButton />
                </>
            )}

            <ToastContainer />
        </div>
    );
};

export default App;