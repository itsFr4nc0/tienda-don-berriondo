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

import "./assets/styles/global.css";

import OpinionesClientes from "./components/OpinionesClientes";
import Productos from "./components/TarjetasProductos";

import { AdminPanel } from "./pages/AdminPanel";

// -------------------------
// CREAR ADMIN POR DEFECTO
// -------------------------
const defaultAdmin = {
  name: "Don Berriondo",
  email: "admin@papa.com",
  password: "123456@don",
  city: "Medellín",
  postalCode: "050001",
  address: "America",
  birthDate: "1492-10-12",
  gender: "otro",
  role: "admin"
};

const savedUsers = JSON.parse(localStorage.getItem("users") || "[]");

if (savedUsers.length === 0) {
  savedUsers.push(defaultAdmin);
  localStorage.setItem("users", JSON.stringify(savedUsers));
}

// -------------------------
// COMPONENTE PRINCIPAL
// -------------------------
const App: React.FC = () => {

  const location = useLocation();

  const loggedUser = JSON.parse(localStorage.getItem("loggedUser") || "null");
  const isAdmin = loggedUser?.role === "admin";

  const hideLayout =
    location.pathname === "/login" || 
    location.pathname === "/register" ||
    location.pathname.startsWith("/producto/");

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
