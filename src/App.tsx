import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ChatbotButton } from "./components/ChatbotButton";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import "./assets/styles/global.css";

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
          <Footer />
          <ChatbotButton />
        </>
      )}
    </div>
  );
};

export default App;
