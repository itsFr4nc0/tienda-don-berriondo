import React from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ChatbotButton } from "./components/ChatbotButton";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import "./assets/styles/global.css";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <Footer />
      <ChatbotButton />
    </div>
  );
};

export default App;
