import React from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ChatbotButton } from "./components/ChatbotButton";
import { Home } from "./pages/Home";
import "./assets/styles/global.css";

const App: React.FC = () => {
  return (
    <>
      <div className="app-container">
        <Header />
        <Home />
        <Footer />
        <ChatbotButton />
      </div>
    </>
  );
};

export default App;
